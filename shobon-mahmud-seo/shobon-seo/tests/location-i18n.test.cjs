const fs = require('fs'), vm = require('vm'), assert = require('assert/strict'), ts = require('typescript');
const {NextRequest, NextResponse} = require('next/server');
function load(file, stubs={}) { const module={exports:{}}; const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText; vm.runInThisContext('(function(require,module,exports){'+code+'\n})')(p=>stubs[p]||require(p),module,module.exports); return module.exports; }
const routing=load('lib/i18n/routing.ts');
const {proxy}=load('proxy.ts',{'@/lib/i18n/routing':routing});
const origin='https://shobon-mahmud.vercel.app';
for(const [slug,config] of Object.entries(routing.localizedLocations)) {
 const path=routing.locationPath(slug), native=routing.locationPath(slug,config.locale);
 const request=(p,headers={})=>new NextRequest(origin+p,{headers});
 const local=proxy(request(path,{'x-vercel-ip-country':config.country}));
 assert.equal(local.status,307); assert.equal(local.headers.get('location'),origin+native);
 assert.match(local.headers.get('cache-control'),/no-store/);
 assert.equal(proxy(request(path,{'x-vercel-ip-country':'US'})).headers.get('location'),null);
 assert.equal(proxy(request(path)).headers.get('location'),null);
 assert.equal(proxy(request(native,{'x-vercel-ip-country':'US'})).headers.get('location'),null,'explicit native URL accessible everywhere');
 const select=proxy(request(native+'?lang=en&utm_source=test',{'x-vercel-ip-country':config.country}));
 assert.equal(select.headers.get('location'),origin+path+'?utm_source=test');
 assert.equal(select.cookies.get(`location-language-${slug}`).value,'en');
 assert.equal(proxy(request(path,{'x-vercel-ip-country':config.country,cookie:`location-language-${slug}=en`})).headers.get('location'),null,'manual English overrides geolocation');
 assert.equal(proxy(request(path,{'x-vercel-ip-country':'US',cookie:`location-language-${slug}=${config.locale}`})).headers.get('location'),origin+native);
 const alternates=routing.locationAlternates(slug,origin);
 assert.equal(alternates.en,origin+path);assert.equal(alternates['x-default'],alternates.en);assert.equal(alternates[config.languageTag],origin+native);
 assert.equal(proxy(request(path+'?lang=xx',{'x-vercel-ip-country':'US'})).headers.get('location'),null);
}
assert.equal(proxy(new NextRequest(origin+'/locations/seo-consultant-london',{headers:{'x-vercel-ip-country':'AE'}})).headers.get('location'),null);
const en=require('../content/copy-components-sections-DhakaLanding.json'),bn=require('../content/dhaka-bn.json');
assert.deepEqual(Object.keys(en),Object.keys(bn));
for(const [key,value] of Object.entries(en)) {if(!value.startsWith('/')&&!value.startsWith('#')&&value!=='0'&&value!=='.') assert.match(bn[key],/[\u0980-\u09ff]/,`Bangla coverage: ${key}`); else if(value==='.') assert.equal(bn[key],'।'); else assert.equal(bn[key],value,'links and indices preserved');}
const ar=require('../content/locations-ar.json');for(const loc of Object.values(ar)) for(const field of ['heroTitle','intro','city','seoTitle']) assert.match(loc[field],/[\u0600-\u06ff]/);
console.log('PASS: four country routes, English fallback, explicit native URLs, remembered language choice, query preservation, private caching, language alternates and complete Bangla copy.');
