const { spawn } = require('child_process');
const assert = require('assert/strict');
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3100'], { stdio:['ignore','pipe','pipe'] });
let logs='';server.stdout.on('data',d=>logs+=d);server.stderr.on('data',d=>logs+=d);
(async()=>{
 const origin='http://127.0.0.1:3100';let ready=false;
 for(let i=0;i<60;i++){try{await fetch(origin);ready=true;break}catch{await new Promise(r=>setTimeout(r,200))}}
 assert.ok(ready,logs);
 for(const [slug,locale,country] of [['dubai','ar','AE'],['saudi-arabia','ar','SA'],['oman','ar','OM'],['dhaka','bn','BD']]) {
  const base='/locations/seo-consultant-'+slug,native='/'+locale+base;
  for(const path of [base,native]) {
   const res=await fetch(origin+path);const html=await res.text();
   assert.equal(res.status,200);assert.ok(html.includes(`<html lang="${path===base?'en':locale}"`));
   assert.ok(html.includes(`dir="${path===native&&locale==='ar'?'rtl':'ltr'}"`));
   assert.ok(html.includes('hrefLang="'+locale+'"'));
   assert.ok(html.includes('rel="canonical" href="https://shobon-mahmud.vercel.app'+path+'"'));
   assert.equal((html.match(/<h1\b/g)||[]).length,1);
   if(path===native) assert.match(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1],locale==='ar'?/[\u0600-\u06ff]/:/[\u0980-\u09ff]/);
   console.log('PASS HTTP + SEO',path);
  }
  const local=await fetch(origin+base,{redirect:'manual',headers:{'x-vercel-ip-country':country}});
  assert.equal(local.status,307);assert.equal(new URL(local.headers.get('location'),origin).pathname,native);
  const english=await fetch(origin+native+'?lang=en',{redirect:'manual',headers:{'x-vercel-ip-country':country}});
  const cookie=english.headers.get('set-cookie').split(';')[0];
  const preferred=await fetch(origin+base,{redirect:'manual',headers:{'x-vercel-ip-country':country,cookie}});
  assert.equal(preferred.status,200,'manual English does not loop');
  console.log('PASS runtime geography and English preference',slug);
 }
 const sitemap=await (await fetch(origin+'/sitemaps/locations.xml')).text();
 for(const path of ['/ar/locations/seo-consultant-dubai','/ar/locations/seo-consultant-saudi-arabia','/ar/locations/seo-consultant-oman','/bn/locations/seo-consultant-dhaka']) assert.ok(sitemap.includes(path));
 console.log('PASS localized sitemap URLs');
})().catch(e=>{console.error(e,logs);process.exitCode=1}).finally(()=>server.kill());
