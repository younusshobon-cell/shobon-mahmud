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
    assert.equal((await fetch(host + "/api/admin/visual")).status, 401);
    assert.equal((await fetch(host + "/api/admin/analytics")).status, 401);
    assert.equal((await fetch(host + "/api/admin/enquiries")).status, 401);
    assert.equal((await fetch(host + "/api/analytics/cta",{method:"POST",headers:{origin:"https://attacker.test","content-type":"application/json"},body:"{}"})).status,403);
    assert.equal((await fetch(host + "/api/analytics", {method:"POST", headers:{origin:"https://attacker.test","content-type":"application/json"},body:"{}"})).status,403);
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
    const visualResponse = await fetch(host + "/api/admin/visual", {headers});
    assert.equal(visualResponse.status, 200);
    assert.ok(visualResponse.headers.get("cache-control").includes("no-store"));
    const visual = await visualResponse.json();
    for (const path of ["/", "/about", "/contact", "/blog", "/services/technical-seo", "/locations/seo-consultant-dhaka"]) assert.ok(visual.pages.includes(path));
    assert.ok(!visual.pages.includes("/admin"));
    assert.ok(visual.fields.some(f => f.id === "copy-components-sections-Hero" && f.path[0] === "text_002"));
    assert.equal(visual.images.length, 6);
    const analytics=await (await fetch(host+"/api/admin/analytics",{headers})).json();
    assert.equal(analytics.configured,false);
    const enquiries = await fetch(host+"/api/admin/enquiries",{headers});
    assert.equal(enquiries.status,200);
    assert.ok(enquiries.headers.get("cache-control").includes("no-store"));
    assert.equal((await enquiries.json()).configured,false);
    assert.equal((await fetch(host+"/api/admin/analytics?days=999",{headers})).status,400);
    assert.equal((await fetch(host+"/not-a-published-page")).status,404);
    response = await fetch(host + "/admin", { headers });
    text = await response.text();
    assert.ok(text.includes("Grow. Follow up. Publish."));
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
