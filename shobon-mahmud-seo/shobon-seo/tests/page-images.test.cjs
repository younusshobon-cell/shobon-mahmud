const fs = require('fs'), vm = require('vm'), assert = require('assert/strict'), ts = require('typescript');
function load(file, stubs = {}) {
  const mod = {exports: {}};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions: {module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, esModuleInterop: true}}).outputText;
  vm.runInThisContext('(function(require,module,exports){'+code+'\n})')(p => p in stubs ? stubs[p] : p.startsWith('@/') && p.endsWith('.json') ? JSON.parse(fs.readFileSync(p.slice(2))) : p.endsWith('.json') ? JSON.parse(fs.readFileSync(require('path').resolve(require('path').dirname(file), p))) : require(p), mod, mod.exports);
  return mod.exports;
}
const validate = load('lib/admin/validation.ts', {'@/lib/content/editor': load('lib/content/editor.ts')}).validateContent;
const image = {page: '/locations/saudi-arabia', key: 'hero', src: '/uploads/saudi.png', alt: 'Saudi hero'};
assert.equal(validate('page-images', [image]), null);
assert.equal(validate('page-images', [image, {...image, page: '/locations/dubai'}]), null);
assert.ok(validate('page-images', [image, image]));
for (const src of ['javascript:alert(1)', '//evil.test/image.png', '/uploads/file.svg', '/admin', 'https://evil.test/a.jpg']) assert.ok(validate('page-images', [{...image, src}]));
for (const page of ['/admin', '/api/admin/content', '//evil.test', '/about?x=1']) assert.ok(validate('page-images', [{...image, page}]));
const React = require('react'), {renderToStaticMarkup} = require('react-dom/server');
let pathname = image.page;
const {default: Image, HeroImageLayout, imageKey, EditableInlineImage} = load('components/content/EditableImage.tsx', {
  'next/navigation': {usePathname: () => pathname},
  'next/image': {__esModule: true, default: props => React.createElement('img', {src: props.src, alt: props.alt, 'data-original-src': props['data-original-src'], 'data-unoptimized': props.unoptimized})},
  '@/lib/utils': {cn: (...values) => values.filter(Boolean).join(' ')},
  '@/content/page-images.json': [image, {...image, key: JSON.stringify(['/original.png', 'Original'])}]
});
assert.equal(imageKey('/_next/static/media/photo.12345678.jpg', 'Original'), imageKey('/_next/static/media/photo.87654321.jpg', 'Original'));
const hero = () => renderToStaticMarkup(React.createElement(HeroImageLayout, {alt: 'Hero', aside: React.createElement('div', null, 'Original diagram')}, 'Text'));
assert.match(hero(), /src="\/uploads\/saudi.png"/);
assert.match(hero(), /Original diagram/);
assert.match(renderToStaticMarkup(React.createElement(Image, {src: '/original.png', alt: 'Original', width: 10, height: 10})), /data-unoptimized="true"/);
assert.match(renderToStaticMarkup(React.createElement(EditableInlineImage, {src: '/original.png', alt: 'Original'})), /src="\/uploads\/saudi.png"/);
pathname = '/locations/dubai';
assert.doesNotMatch(hero(), /src="\/uploads\/saudi.png"/);
assert.match(renderToStaticMarkup(React.createElement(Image, {src: '/original.png', alt: 'Original', width: 10, height: 10})), /src="\/original.png"/);
console.log('PASS: page-scoped images, SSR hero overrides, original quality, native article images, stable keys and invalid URL / duplicate slot protection.');
