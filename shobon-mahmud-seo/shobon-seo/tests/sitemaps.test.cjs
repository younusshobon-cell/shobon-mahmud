const fs = require('fs'), vm = require('vm'), assert = require('assert/strict'), ts = require('typescript');
const industries = [{slug:'healthcare',relatedServices:['audit']}];
const stubs = {
 '@/lib/content/pages':{customPages:[{slug:'new-page',updated:'invalid'}]},
 '@/lib/content/blog':{blogCategories:[],POSTS_PER_PAGE:10,posts:[{slug:'care-guide',relatedIndustries:['healthcare'],date:'2026-10-03'}]},
 '@/lib/content/case-studies':{caseStudies:[{slug:'published-case',industry:'healthcare',draft:false},{slug:'draft-case',industry:'healthcare',draft:true}]},
 '@/lib/content/industries':{industries},
 '@/lib/content/locations':{locations:[{slug:'dhaka',industries:['healthcare']}]},
 '@/lib/content/services':{services:[{slug:'audit',relatedIndustries:['healthcare']}]},
 '@/lib/site':{siteConfig:{url:'https://shobon-mahmud.vercel.app'}}
};
function load(file,extra={}) {const module={exports:{}};const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;vm.runInThisContext('(function(require,module,exports,process){'+code+'\n})')(p=>({...stubs,...extra})[p]||require(p),module,module.exports,process);return module.exports;}
(async()=>{
const s=load('lib/sitemaps.ts');
for(const section of s.sitemapSections) assert.ok(s.sitemapIndex().includes(`/sitemaps/${section}.xml`));
assert.equal((s.sitemapIndex().match(/<sitemap>/g)||[]).length,6);
assert.ok(!s.sitemapIndex().includes('/sitemaps/industries/'));
industries.push({slug:'new-industry',relatedServices:[]});
assert.ok(s.sectionSitemap('industries').includes('/industries/new-industry'),'new CMS industry joins the single industry sitemap automatically');
assert.equal((s.sitemapIndex().match(/<sitemap>/g)||[]).length,6,'adding industries does not add separate sitemaps');
assert.ok(!s.sectionSitemap('portfolio').includes('draft-case'));
assert.ok(s.sectionSitemap('pages').includes('/new-page'));assert.ok(!s.sectionSitemap('pages').includes('<lastmod>'));
assert.equal((s.urlSitemap([{path:'/a&b'},{path:'/a&b'}]).match(/<url>/g)||[]).length,1);assert.ok(s.urlSitemap([{path:'/a&b'}]).includes('&amp;'));
const robots=load('app/robots.ts').default;
process.env.VERCEL_ENV='production';assert.ok(robots().rules[0].disallow.includes('/admin'));assert.ok(robots().rules[0].disallow.includes('/api/'));assert.equal(robots().sitemap,'https://shobon-mahmud.vercel.app/sitemap.xml');
process.env.VERCEL_ENV='preview';assert.equal(robots().rules[0].disallow,'/');delete process.env.VERCEL_ENV;
console.log('PASS: six-folder index, automatic industry page discovery, draft exclusion, XML safety and production/preview robots.');
})().catch(e=>{console.error(e);process.exitCode=1});
