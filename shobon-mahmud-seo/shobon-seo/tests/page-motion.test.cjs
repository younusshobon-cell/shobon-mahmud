const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

// Exercise the browser lifecycle without requiring a downloaded browser.
function mount(pathname, reduced = false) {
  const effects = [], calls = [], observers = [], classes = new Set(), listeners = new Set();
  const preference = {
    matches: reduced,
    addEventListener: (_, callback) => listeners.add(callback),
    removeEventListener: (_, callback) => listeners.delete(callback),
  };
  const element = (media = false) => ({
    matches: selector => media && selector === '.hero-media',
    closest: () => null,
    parentElement: { children: [] },
    animate: (frames, options) => {
      const animation = { cancelled: false, cancel() { this.cancelled = true; } };
      calls.push({ frames, options, animation });
      return animation;
    },
  });
  const cards = [element(), element(), element()];
  cards.forEach(card => card.parentElement.children = cards);
  const main = {
    classList: { add: name => classes.add(name), remove: name => classes.delete(name) },
    querySelector: () => ({ querySelectorAll: () => [element(), element(), element(), element(true)] }),
    querySelectorAll: () => cards,
  };
  class Observer {
    constructor(callback) { this.callback = callback; this.targets = new Set(); this.disconnected = false; observers.push(this); }
    observe(target) { this.targets.add(target); }
    unobserve(target) { this.targets.delete(target); }
    disconnect() { this.disconnected = true; this.targets.clear(); }
  }
  const module = { exports: {} };
  const source = ts.transpileModule(fs.readFileSync('components/motion/SiteMotion.tsx', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const context = vm.createContext({
    module, exports: module.exports,
    require: name => name === 'react' ? { useEffect: callback => effects.push(callback) } : { usePathname: () => pathname },
    window: { matchMedia: () => preference, IntersectionObserver: Observer },
    document: { querySelector: () => main, querySelectorAll: () => [] },
    IntersectionObserver: Observer,
  });
  vm.runInContext(source, context);
  module.exports.SiteMotion();
  const cleanup = effects.map(callback => callback()).filter(Boolean);
  return { calls, observers, classes, cards, preference, listeners, cleanup: () => cleanup.forEach(callback => callback()) };
}

for (const path of ['/services', '/services/Holistic-SEO', '/industries', '/industries/saas', '/locations/seo-consultant-dhaka', '/ar/locations/seo-consultant-oman']) {
  const normal = mount(path);
  assert.ok(normal.classes.has('page-motion'), path);
  assert.equal(normal.calls.length, 4, 'hero entries');
  assert.equal(normal.calls[3].frames[0].transform, 'scale(.97)');
  const observer = normal.observers.at(-1);
  assert.equal(observer.targets.size, 3);
  observer.callback(normal.cards.map(target => ({ target, isIntersecting: true })));
  assert.equal(observer.targets.size, 0, 'cards reveal once');
  assert.deepEqual(normal.calls.slice(4).map(call => call.options.delay), [0, 90, 180]);
  normal.preference.matches = true;
  normal.listeners.forEach(callback => callback());
  assert.ok(normal.calls.every(call => call.animation.cancelled), 'preference change cancels active motion');
  normal.cleanup();
  assert.equal(normal.classes.size, 0, 'route cleanup removes motion class');
  assert.equal(normal.listeners.size, 0, 'route cleanup removes listeners');
  assert.ok(normal.observers.every(item => item.disconnected));
  const reduced = mount(path, true);
  assert.equal(reduced.calls.length, 0, 'no animation for reduced motion');
  reduced.cleanup();
}
for (const path of ['/about', '/blog', '/admin', '/locations', '/services/a/b']) {
  const other = mount(path);
  assert.equal(other.calls.length, 0, 'animation stays within target routes');
  assert.equal(other.classes.size, 0);
  other.cleanup();
}
console.log('PASS: scoped hero motion, staggered one-time card reveals, reduced-motion changes and route cleanup.');
