import { reservedSlugs } from "@/lib/content/editor";
import definitions from "./schemas.json";
type Schema = {
  type?: string;
  const?: unknown;
  $ref?: string;
  anyOf?: Schema[];
  items?: Schema;
  properties?: Record<string, Schema>;
  required?: string[];
  additionalProperties?: Schema;
};
const defs = definitions.defs as unknown as Record<string, Schema>;
const groups = definitions.groups as Record<string, Schema>;
function check(value: unknown, schema: Schema, path: string): string | null {
  if (schema.$ref) return check(value, defs[schema.$ref], path);
  if (schema.anyOf)
    return schema.anyOf.some((s) => !check(value, s, path))
      ? null
      : `${path}: choose a valid value or block type.`;
  if ("const" in schema)
    return value === schema.const
      ? null
      : `${path}: expected ${JSON.stringify(schema.const)}.`;
  if (schema.type === "array") {
    if (!Array.isArray(value)) return `${path}: expected a list.`;
    if (value.length > 1000) return `${path}: maximum 1,000 items.`;
    for (let i = 0; i < value.length; i++) {
      const error = check(value[i], schema.items!, `${path}[${i + 1}]`);
      if (error) return error;
    }
    return null;
  }
  if (schema.type === "object") {
    if (!value || typeof value !== "object" || Array.isArray(value))
      return `${path}: expected an object.`;
    const obj = value as Record<string, unknown>;
    for (const key of schema.required ?? [])
      if (!(key in obj)) return `${path}.${key}: required field.`;
    for (const [key, v] of Object.entries(obj)) {
      if (["__proto__", "constructor", "prototype"].includes(key))
        return "Invalid field.";
      const child = schema.properties?.[key] ?? schema.additionalProperties;
      if (!child) return `${path}.${key}: unknown field.`;
      const error = check(v, child, `${path}.${key}`);
      if (error) return error;
    }
    return null;
  }
  if (
    typeof value !== schema.type ||
    (typeof value === "number" && !Number.isFinite(value))
  )
    return `${path}: expected ${schema.type}.`;
  if (typeof value === "string" && value.length > 100000)
    return `${path}: text is too long.`;
  return null;
}
function inspect(value: unknown, key = ""): string | null {
  if (typeof value === "string") {
    if (
      ["slug", "id"].includes(key) &&
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
    )
      return `${key}: use lowercase letters, numbers and hyphens.`;
    if (
      ["href", "image", "src"].includes(key) &&
      value &&
      !/^(\/(?!\/)|https?:\/\/|mailto:|tel:|#)/i.test(value)
    )
      return `${key}: use a site path or HTTP(S) URL.`;
    if (
      ["date", "updated"].includes(key) &&
      (!/^\d{4}-\d{2}-\d{2}$/.test(value) ||
        !Number.isFinite(Date.parse(value)) ||
        new Date(value).toISOString().slice(0, 10) !== value)
    )
      return `${key}: use YYYY-MM-DD.`;
  }
  if(value && typeof value === "object" && !Array.isArray(value)) {
    const block=value as Record<string,unknown>;
    if(block.type === "image" && (typeof block.src !== "string" || !/^(\/(?!\/)[^\s<>]*|https?:\/\/[^\s<>]+)$/i.test(block.src))) return "Image: use a site path or HTTP(S) URL.";
    if(block.type === "table" && Array.isArray(block.headers) && Array.isArray(block.rows) && (!block.headers.length || block.headers.length>12 || block.rows.length>100 || block.rows.some(r=>!Array.isArray(r)||r.length!==(block.headers as unknown[]).length))) return "Table: use 1–12 columns, up to 100 rows, and equal cell counts.";
  }
  if (Array.isArray(value)) {
    const slugs = value.flatMap((v) =>
      v && typeof v === "object" && "slug" in v ? [v.slug] : [],
    );
    if (new Set(slugs).size !== slugs.length)
      return "Each entry must have a unique slug.";
    for (const v of value) {
      const e = inspect(v, key);
      if (e) return e;
    }
  } else if (value && typeof value === "object")
    for (const [k, v] of Object.entries(value)) {
      const e = inspect(v, k);
      if (e) return e;
    }
  return null;
}
export function validateContent(id: string, value: unknown) {
  if (typeof id !== "string" || !Object.hasOwn(groups, id))
    return "Unknown content group.";
  const schema = groups[id];
  const error = check(value, schema, id) ?? inspect(value);
  if(error) return error;
  if (id === "page-images") {
    const seen = new Set<string>();
    for (const item of value as {page: string; key: string; src: string; alt: string}[]) {
      if (!/^\/(?!\/)[^?#\s<>]*$/.test(item.page) || item.page.startsWith("/admin") || item.page.startsWith("/api/")) return "Choose a public website page.";
      if (!item.key || item.key.length > 2000) return "Choose an image on the page.";
      if (!/^\/(?!\/)[^?#\s<>]+\.(png|jpe?g|webp|gif)$/i.test(item.src)) return "Upload a PNG, JPG, WEBP or GIF, or choose an image from Media.";
      const identity = JSON.stringify([item.page, item.key]);
      if (seen.has(identity)) return "Each page image must have a unique slot.";
      seen.add(identity);
    }
  }
  if (id === "image-sources" && Object.values(value as Record<string, string>).some(src => src !== "" && !/^\/(?!\/)[^?#\s]+\.(png|jpe?g|webp|gif)$/i.test(src))) return "Page photos need a local PNG, JPG, WEBP or GIF URL. Upload the image in the live editor or Media first.";
  if(id === "custom-pages" || id === "blog-rawPosts") {
    for(const item of value as Record<string, unknown>[]) {
      if(id === "custom-pages" && reservedSlugs.has(String(item.slug))) return "That URL is reserved for an existing website section.";
      if(!String(item.title).trim()) return "A title is required.";
      if(item.status !== "draft" && (!String(item.description).trim() || (id === "custom-pages" ? !String(item.body).trim() : !(item.sections as unknown[]).length))) return "Published content needs a description and body.";
    }
  }
  return null;
}
