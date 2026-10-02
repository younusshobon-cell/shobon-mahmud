const fs = require("fs"),
  path = require("path"),
  vm = require("vm"),
  assert = require("assert/strict");
const root = process.cwd(),
  ts = require(root + "/node_modules/typescript");
let cookie;
function load(file, stub = {}) {
  const output = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const mod = { exports: {} };
  const req = (p) => {
    if (Object.hasOwn(stub, p)) return stub[p];
    if (p === "server-only") return {};
    if (p.endsWith(".json"))
      return JSON.parse(
        fs.readFileSync(
          p.startsWith("@/")
            ? path.join(root, p.slice(2))
            : path.resolve(path.dirname(file), p),
        ),
      );
    return require(p);
  };
  vm.runInThisContext(
    "(function(require,module,exports,process,Buffer){" + output + "\n})",
  )(req, mod, mod.exports, process, Buffer);
  return mod.exports;
}
(async () => {
  process.env.ADMIN_PASSWORD = "temporary-local-admin-password";
  process.env.ADMIN_SESSION_SECRET =
    "test-session-secret-with-at-least-32-characters";
  const auth = load(root + "/lib/admin/auth.ts", {
    "next/headers": {
      cookies: async () => ({
        get: () => (cookie ? { value: cookie } : undefined),
      }),
    },
  });
  assert.equal(auth.authConfigured(), true);
  const previousPassword = process.env.ADMIN_PASSWORD;
  process.env.ADMIN_PASSWORD = "dummy-pass1";
  assert.equal(auth.authConfigured(), true);
  assert.equal(await auth.verifyPassword("dummy-pass1"), true);
  process.env.ADMIN_PASSWORD = "dummy-pass";
  assert.equal(auth.authConfigured(), false);
  assert.equal(auth.authConfigurationErrors().length, 1);
  assert.ok(auth.authConfigurationErrors()[0].startsWith("ADMIN_PASSWORD"));
  process.env.ADMIN_PASSWORD = previousPassword;
  const previousSecret = process.env.ADMIN_SESSION_SECRET;
  process.env.ADMIN_SESSION_SECRET = "too-short";
  assert.equal(auth.authConfigurationErrors().length, 1);
  assert.ok(auth.authConfigurationErrors()[0].startsWith("ADMIN_SESSION_SECRET"));
  assert.ok(!JSON.stringify(auth.authConfigurationErrors()).includes("too-short"));
  process.env.ADMIN_SESSION_SECRET = previousSecret;
  assert.equal(await auth.verifyPassword("wrong"), false);
  assert.equal(await auth.verifyPassword(process.env.ADMIN_PASSWORD), true);
  const session = auth.issueSession();
  assert.equal(auth.verifySession(session), true);
  assert.equal(auth.verifySession(session + "x"), false);
  process.env.ADMIN_PASSWORD += "new";
  assert.equal(auth.verifySession(session), false);
  process.env.ADMIN_PASSWORD = "temporary-local-admin-password";
  cookie = session;
  assert.equal(await auth.authenticated(), true);
  assert.equal(
    auth.sameOrigin(
      new Request("https://site.test/api/admin/content", {
        headers: { origin: "https://attacker.test" },
      }),
    ),
    false,
  );
  const validate = load(root + "/lib/admin/validation.ts").validateContent,
    manifest = JSON.parse(fs.readFileSync("content/manifest.json"));
  for (const entry of manifest) {
    assert.equal(
      validate(entry.id, JSON.parse(fs.readFileSync(entry.path))),
      null,
      entry.id,
    );
  }
  const posts = JSON.parse(fs.readFileSync("content/blog-rawPosts.json"));
  assert.match(
    validate("blog-rawPosts", [{ ...posts[0], sections: "bad" }]),
    /list/,
  );
  assert.match(validate("blog-rawPosts", [posts[0], posts[0]]), /unique slug/);
  assert.match(
    validate("blog-rawPosts", [{ ...posts[0], slug: "../admin" }]),
    /lowercase/,
  );
  assert.match(
    validate("blog-rawPosts", [{ ...posts[0], date: "2026-02-31" }]),
    /YYYY/,
  );
  assert.match(
    validate("blog-rawPosts", [{ ...posts[0], image: "javascript:alert(1)" }]),
    /HTTP/,
  );
  assert.equal(validate("__proto__", {}), "Unknown content group.");
  process.env.ADMIN_GITHUB_TOKEN = "test-token-not-real";
  let written;
  global.fetch = async (url, options) => {
    if (options.method === "PUT") {
      written = { url, body: JSON.parse(options.body) };
      return Response.json({
        content: { sha: "b".repeat(40) },
        commit: {
          sha: "c".repeat(40),
          html_url: "https://github.com/test/commit",
        },
      });
    }
    return Response.json({
      sha: "a".repeat(40),
      content: Buffer.from(JSON.stringify(posts)).toString("base64"),
    });
  };
  const github = load(root + "/lib/admin/github.ts");
  const doc = await github.readContent("blog-rawPosts");
  assert.equal(doc.sha, "a".repeat(40));
  posts[0].title = "A new article title";
  const result = await github.publishContent("blog-rawPosts", posts, doc.sha);
  assert.equal(result.sha, "b".repeat(40));
  assert.match(
    written.url,
    /shobon-mahmud-seo\/shobon-seo\/content\/blog-rawPosts.json$/,
  );
  assert.equal(written.body.sha, doc.sha);
  assert.equal(written.body.branch, "main");
  assert.equal(
    JSON.parse(Buffer.from(written.body.content, "base64").toString())[0].title,
    "A new article title",
  );
  await assert.rejects(
    () => github.uploadMedia("../../route.ts", Buffer.from("x")),
    /Unsupported/,
  );
  assert.throws(() => github.contentEntry("unknown"), /Unknown/);
  global.fetch = async () => Response.json({}, { status: 409 });
  await assert.rejects(
    () => github.publishContent("blog-rawPosts", posts, doc.sha),
    /Content changed/,
  );
  console.log(
    "PASS: " +
      manifest.length +
      " content groups validate; auth, tamper/rotation, CSRF, malformed content, duplicate slugs, invalid dates, image URLs, GitHub persistence, conflicts and path restrictions.",
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
