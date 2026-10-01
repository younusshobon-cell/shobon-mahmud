"use client";
import { Plus, Trash2, ChevronDown } from "lucide-react";
import schemas from "@/lib/admin/schemas.json";
export type Value =
  string | number | boolean | null | Value[] | { [key: string]: Value };
type Schema = {
  type?: string;
  $ref?: string;
  const?: Value;
  anyOf?: Schema[];
  items?: Schema;
  properties?: Record<string, Schema>;
  required?: string[];
  additionalProperties?: Schema;
};
const defs = schemas.defs as unknown as Record<string, Schema>;
export const groupSchema = (id: string) =>
  (schemas.groups as Record<string, Schema>)[id];
const resolve = (s: Schema): Schema =>
  s?.$ref ? resolve(defs[s.$ref]) : (s ?? {});
function selected(s: Schema, v: Value): Schema {
  s = resolve(s);
  if (s.anyOf) {
    return resolve(
      s.anyOf.find((x) => {
        const r = resolve(x);
        if (r.const !== undefined) return r.const === v;
        if (
          r.type === "object" &&
          v &&
          typeof v === "object" &&
          !Array.isArray(v) &&
          r.properties?.type
        )
          return r.properties.type.const === v.type;
        return r.type === typeof v;
      }) ?? s.anyOf[0],
    );
  }
  return s;
}
export function blank(s: Schema): Value {
  s = resolve(s);
  if (s.anyOf) return blank(s.anyOf[0]);
  if (s.const !== undefined) return s.const;
  if (s.type === "array") return [];
  if (s.type === "object")
    return Object.fromEntries(
      (s.required ?? []).map((k) => [
        k,
        k === "slug"
          ? "new-entry"
          : k === "date"
            ? new Date().toISOString().slice(0, 10)
            : blank(s.properties![k]),
      ]),
    );
  if (s.type === "number") return 0;
  if (s.type === "boolean") return false;
  return "";
}
export const title = (v: Value, index?: number) =>
  typeof v === "object" && v && !Array.isArray(v)
    ? String(
        v.title ??
          v.name ??
          v.city ??
          v.client ??
          v.heading ??
          v.q ??
          v.label ??
          v.slug ??
          `Item ${(index ?? 0) + 1}`,
      )
    : String(v ?? "").slice(0, 75) || `Item ${(index ?? 0) + 1}`;
const label = (key: string) =>
  key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
export function FormEditor({
  value,
  onChange,
  schema,
  name = "Content",
  depth = 0,
}: {
  value: Value;
  onChange: (value: Value) => void;
  schema: Schema;
  name?: string;
  depth?: number;
}) {
  const root = resolve(schema),
    s = selected(root, value);
  if (Array.isArray(value))
    return (
      <div className="admin-list-field">
        <div className="admin-field-heading">
          <h3>
            {label(name)} <small>{value.length}</small>
          </h3>
          <button
            type="button"
            className="admin-small"
            onClick={() =>
              onChange([...value, blank(s.items ?? { type: "string" })])
            }
          >
            <Plus size={14} />
            Add item
          </button>
        </div>
        {value.map((v, i) => (
          <details className="admin-nested" key={i}>
            <summary>
              <ChevronDown size={14} />
              <span>{title(v, i)}</span>
              <button
                type="button"
                aria-label={`Remove ${title(v, i)}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (window.confirm("Remove this item from your draft?"))
                    onChange(value.filter((_, j) => j !== i));
                }}
              >
                <Trash2 size={14} />
              </button>
            </summary>
            <div className="admin-nested-body">
              <div className="admin-reorder">
                <button
                  type="button"
                  disabled={i === 0}
                  onClick={() => {
                    const next = [...value];
                    [next[i - 1], next[i]] = [next[i], next[i - 1]];
                    onChange(next);
                  }}
                >
                  Move up
                </button>
                <button
                  type="button"
                  disabled={i === value.length - 1}
                  onClick={() => {
                    const next = [...value];
                    [next[i + 1], next[i]] = [next[i], next[i + 1]];
                    onChange(next);
                  }}
                >
                  Move down
                </button>
              </div>
              <FormEditor
                value={v}
                onChange={(n) =>
                  onChange(value.map((x, j) => (j === i ? n : x)))
                }
                schema={s.items ?? { type: "string" }}
                name={`Item ${i + 1}`}
                depth={depth + 1}
              />
            </div>
          </details>
        ))}
      </div>
    );
  if (value && typeof value === "object")
    return (
      <div className="admin-object">
        {root.anyOf &&
          root.anyOf.every(
            (x) => resolve(x).properties?.type?.const !== undefined,
          ) && (
            <label className="admin-field">
              Block type
              <select
                value={String(value.type ?? "")}
                onChange={(e) => {
                  const option = root.anyOf!.find(
                    (x) => resolve(x).properties?.type.const === e.target.value,
                  );
                  if (option) onChange(blank(option));
                }}
              >
                {root.anyOf.map((x) => (
                  <option
                    key={String(resolve(x).properties?.type.const)}
                    value={String(resolve(x).properties?.type.const)}
                  >
                    {String(resolve(x).properties?.type.const)}
                  </option>
                ))}
              </select>
            </label>
          )}
        {Object.entries(value).map(([k, v]) => {
          const child = s.properties?.[k] ??
            s.additionalProperties ?? { type: typeof v };
          const field = (
            <FormEditor
              key={k}
              value={v}
              onChange={(n) => onChange({ ...value, [k]: n })}
              schema={child}
              name={
                k.startsWith("text_")
                  ? `${k} · ${String(v).trim().slice(0, 62)}`
                  : k
              }
              depth={depth + 1}
            />
          );
          return (
            <div key={k}>
              {field}
              {s.properties && !(s.required ?? []).includes(k) && (
                <button
                  type="button"
                  className="admin-remove-field"
                  onClick={() => {
                    const n = { ...value };
                    delete n[k];
                    onChange(n);
                  }}
                >
                  Remove optional field
                </button>
              )}
            </div>
          );
        })}
        {s.properties &&
          Object.keys(s.properties).some((k) => !(k in value)) && (
            <div className="admin-optional">
              <span>Add optional field</span>
              {Object.entries(s.properties)
                .filter(([k]) => !(k in value))
                .map(([k, v]) => (
                  <button
                    type="button"
                    key={k}
                    onClick={() => onChange({ ...value, [k]: blank(v) })}
                  >
                    <Plus size={12} />
                    {label(k)}
                  </button>
                ))}
            </div>
          )}
        {s.additionalProperties && (
          <button
            type="button"
            className="admin-small"
            onClick={() => {
              const k = window.prompt("New key (for example, a location slug)");
              if (k && /^[a-z0-9-]+$/.test(k) && !(k in value))
                onChange({ ...value, [k]: blank(s.additionalProperties!) });
            }}
          >
            <Plus size={14} />
            Add entry
          </button>
        )}
      </div>
    );
  if (typeof value === "boolean")
    return (
      <label className="admin-toggle">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span>{label(name)}</span>
      </label>
    );
  if (root.anyOf?.every((x) => resolve(x).const !== undefined))
    return (
      <label className="admin-field">
        {label(name)}
        <select
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
        >
          {root.anyOf.map((x) => (
            <option key={String(resolve(x).const)}>
              {String(resolve(x).const)}
            </option>
          ))}
        </select>
      </label>
    );
  if (s.const !== undefined)
    return (
      <div className="admin-fixed">
        {label(name)}: {String(value)}
      </div>
    );
  return (
    <label className="admin-field">
      <span>{label(name)}</span>
      {typeof value === "number" ? (
        <input
          type="number"
          step="any"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      ) : String(value ?? "").length > 100 ||
        /intro|description|summary|body|text_|text$|situation|challenge|takeaway|^a$|ctaLine/i.test(
          name,
        ) ? (
        <textarea
          value={String(value ?? "")}
          rows={String(value ?? "").length > 250 ? 5 : 3}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type="text"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {name === "slug" && (
        <small>
          Changing a slug changes its public URL. Update related links too.
        </small>
      )}
      {/seoTitle/i.test(name) && (
        <small>{String(value ?? "").length} characters</small>
      )}
    </label>
  );
}
