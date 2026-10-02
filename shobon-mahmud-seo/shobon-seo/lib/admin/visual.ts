export type Field = { id: string; path: (string | number)[]; value: string };
export function fieldsOf(id: string, value: unknown, path: (string | number)[] = []): Field[] {
  if (typeof value === "string") return [{id, path, value}];
  if (Array.isArray(value)) return value.flatMap((v, i) => fieldsOf(id, v, [...path, i]));
  if (value && typeof value === "object") return Object.entries(value).flatMap(([key, v]) => fieldsOf(id, v, [...path, key]));
  return [];
}
export function fieldKey(field: Pick<Field, "id" | "path">) { return JSON.stringify([field.id, field.path]); }
export function normalize(value: string) { return value.replace(/\s+/g, " ").trim(); }
export function valueAt(value: unknown, path: (string | number)[]): unknown {
  for (const key of path) {
    if (["__proto__", "constructor", "prototype"].includes(String(key)) || !value || typeof value !== "object" || !Object.hasOwn(value, key)) throw new Error("This field no longer exists. Reload the collection.");
    value = (value as Record<string | number, unknown>)[key];
  }
  return value;
}
export function replaceAt<T>(value: T, path: (string | number)[], next: string): T {
  if (!path.length) throw new Error("Select a content field.");
  valueAt(value, path);
  const copy = structuredClone(value);
  const parent = valueAt(copy, path.slice(0, -1)) as Record<string | number, unknown>;
  parent[path[path.length - 1]] = next;
  return copy;
}
