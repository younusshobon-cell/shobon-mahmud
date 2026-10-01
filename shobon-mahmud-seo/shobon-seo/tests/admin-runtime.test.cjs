const { spawn } = require("child_process");
const assert = require("assert/strict");
const host = "http://127.0.0.1:3200",
  password = "temporary-local-admin-password";
const child = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    "3200",
  ],
  {
    env: {
      ...process.env,
      ADMIN_PASSWORD: password,
      ADMIN_SESSION_SECRET: "test-session-secret-with-at-least-32-characters",
    },
    stdio: ["ignore", "pipe", "pipe"],
  },
);
let output = "";
child.stdout.on("data", (x) => (output += x));
child.stderr.on("data", (x) => (output += x));
(async () => {
  try {
    let up = false;
    for (let i = 0; i < 40; i++) {
      try {
        await fetch(host + "/api/admin/session");
        up = true;
        break;
      } catch {
        await new Promise((r) => setTimeout(r, 100));
      }
    }
    assert.ok(up, "server must listen");
    let response = await fetch(host + "/admin");
    let text = await response.text();
    assert.equal(response.status, 200);
    assert.ok(text.includes("Welcome back."));
    assert.ok(!text.includes(password));
    assert.ok(response.headers.get("x-robots-tag").includes("noindex"));
    assert.equal(
      (await fetch(host + "/api/admin/content?id=blog-rawPosts")).status,
      401,
    );
    assert.equal((await fetch(host + "/api/admin/media")).status, 401);
    assert.equal(
      (
        await fetch(host + "/api/admin/content", {
          method: "PUT",
          headers: { origin: host, "content-type": "application/json" },
          body: "{}",
        })
      ).status,
      401,
    );
    assert.equal(
      (
        await fetch(host + "/api/admin/session", {
          method: "POST",
          headers: {
            origin: "https://attacker.test",
            "content-type": "application/json",
          },
          body: JSON.stringify({ password }),
        })
      ).status,
      403,
    );
    assert.equal(
      (
        await fetch(host + "/api/admin/session", {
          method: "POST",
          headers: { origin: host, "content-type": "application/json" },
          body: JSON.stringify({ password: "wrong" }),
        })
      ).status,
      401,
    );
    response = await fetch(host + "/api/admin/session", {
      method: "POST",
      headers: { origin: host, "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });
    assert.equal(response.status, 200);
    const cookie = response.headers.get("set-cookie");
    assert.ok(cookie.includes("HttpOnly"));
    assert.ok(cookie.includes("Secure"));
    assert.ok(cookie.includes("SameSite=strict"));
    const headers = { cookie: cookie.split(";")[0] };
    response = await fetch(host + "/admin", { headers });
    text = await response.text();
    assert.ok(text.includes("Your website, at a glance."));
    assert.ok(!text.includes(password));
    assert.ok(!text.includes("NEXT_PUBLIC_ADMIN"));
    assert.equal(
      (await fetch(host + "/api/admin/content?id=blog-rawPosts", { headers }))
        .status,
      503,
    );
    response = await fetch(host + "/", { headers });
    text = await response.text();
    assert.ok(text.includes("Grow on Google."));
    assert.equal((await fetch(host + "/robots.txt")).status, 200);
    assert.ok(
      (await (await fetch(host + "/robots.txt")).text()).includes(
        "Disallow: /admin",
      ),
    );
    assert.equal(
      (await fetch(host + "/google60d60c42f8fed864.html")).status,
      200,
    );
    console.log(
      "PASS: real production HTTP login, secure cookies, unauthorized APIs, CSRF, authenticated dashboard, no secret exposure, homepage, robots and Search Console verification.",
    );
  } catch (e) {
    console.error(e);
    console.error(output);
    process.exitCode = 1;
  } finally {
    child.kill("SIGTERM");
  }
})();
