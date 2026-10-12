const assert = require('node:assert/strict');
const fs = require('node:fs');
const { spawn } = require('node:child_process');
const removed = ['seo-audits', 'keyword-research', 'competitor-research'];
const merged = ['technical-seo', 'on-page-seo', 'off-page-seo'];
const services = require('../content/services-services.json');
const current = new Set(services.map(service => service.slug));
assert.equal(current.size, 5);
[...removed, ...merged].forEach(slug => assert.ok(!current.has(slug)));
assert.ok(current.has('Holistic-SEO')); 
const manifest = JSON.parse(fs.readFileSync('.next/prerender-manifest.json', 'utf8'));
[...removed, ...merged].forEach(slug => assert.ok(!manifest.routes[`/services/${slug}`], 'deleted service is not generated'));
for (const file of ['services-services', 'industries-industries', 'locations-locations', 'locations-ar', 'blog-rawPosts', 'case-studies-caseStudies']) {
  const walk = value => {
    if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === 'object') for (const [key, child] of Object.entries(value)) {
      if (key === 'relatedServices' || key === 'services') child.forEach(slug => assert.ok(current.has(slug), `${file}: unknown linked service ${slug}`));
      else walk(child);
    }
  };
  walk(require(`../content/${file}.json`));
}
const origin = 'http://127.0.0.1:3118';
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', '3118'], { stdio: ['ignore', 'pipe', 'pipe'] });
let logs = '';
server.stdout.on('data', data => logs += data);
server.stderr.on('data', data => logs += data);
(async () => {
  let ready = false;
  for (let i = 0; i < 40; i++) {
    try { await fetch(origin + '/services'); ready = true; break; }
    catch { await new Promise(resolve => setTimeout(resolve, 200)); }
  }
  assert.ok(ready, logs);
  for (const slug of removed) {
    const response = await fetch(`${origin}/services/${slug}`, { redirect: 'manual' });
    assert.equal(response.status, 308);
    assert.equal(new URL(response.headers.get('location'), origin).pathname, '/services');
  }
  for (const slug of merged) {
    const response = await fetch(`${origin}/services/${slug}`, { redirect: 'manual' });
    assert.equal(response.status, 308);
    assert.equal(new URL(response.headers.get('location'), origin).pathname, '/services/Holistic-SEO');
  }
  const master = await (await fetch(origin + '/services/Holistic-SEO')).text();
  for (const id of ['technical-seo', 'on-page-seo', 'off-page-seo', 'process', 'deliverables', 'measurement', 'service-faqs']) assert.ok(master.includes(`id="${id}"`));
  assert.ok(master.includes('Discuss my SEO growth plan'));
  assert.ok(master.includes('Talk through my SEO priorities'));
  const sitemap = await (await fetch(origin + '/sitemaps/services.xml')).text();
  const hub = await (await fetch(origin + '/services')).text();
  [...removed, ...merged].forEach(slug => {
    assert.ok(!sitemap.includes(`/services/${slug}`), 'removed from sitemap');
    assert.ok(!hub.includes(`href="/services/${slug}"`), 'removed from hub links');
  });
  for (const slug of current) assert.equal((await fetch(`${origin}/services/${slug}`)).status, 200);
  console.log('PASS: 3 removed services plus 3 consolidated services, correct 308 redirects, master-page pillars/CTAs, clean sitemap/hub links, valid references and 5 live service pages.');
})().catch(error => { console.error(error, logs); process.exitCode = 1; }).finally(() => server.kill());
