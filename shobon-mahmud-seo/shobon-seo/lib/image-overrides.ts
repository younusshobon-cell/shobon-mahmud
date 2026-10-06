type Override = { page: string; key: string; src: string; alt: string };
function stableKey(key: string) {
  try {
    const [src, alt] = JSON.parse(key) as [string, string];
    return JSON.stringify([src.replace(/(portrait-[a-z]+)\.[^.]+\.(jpg|png|webp)$/, "$1.$2"), alt]);
  } catch { return key; }
}
function stableSource(key: string) {
  try { return JSON.parse(stableKey(key))[0] as string; } catch { return undefined; }
}
export function resolveImageOverride(images: Override[], page: string, key: string) {
  const local = images.find(item => item.page === page && stableKey(item.key) === stableKey(key));
  if (local) return local;
  const src = stableSource(key);
  // Only the two reused blog portraits inherit the latest blog replacement.
  // Explicit hero slots and every other original image retain their own choices.
  if (!src || !/portrait-(smile|casual)\.(jpg|png|webp)$/.test(src)) return undefined;
  return images.find(item => item.page === "/blog" && stableSource(item.key) === src);
}
