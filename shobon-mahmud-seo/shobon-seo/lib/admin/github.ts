import "server-only";
import manifest from "@/content/manifest.json";
export const REPOSITORY = "younusshobon-cell/shobon-mahmud";
export const BRANCH = "main";
const PREFIX = "shobon-mahmud-seo/shobon-seo/";
export class AdminError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}
export function publishingConfigured() {
  return Boolean(process.env.ADMIN_GITHUB_TOKEN);
}
async function github(endpoint: string, method = "GET", body?: unknown) {
  if (!publishingConfigured())
    throw new AdminError("Publishing needs ADMIN_GITHUB_TOKEN in Vercel.", 503);
  const response = await fetch(
    `https://api.github.com/repos/${REPOSITORY}/${endpoint}`,
    {
      method,
      headers: {
        Authorization: `Bearer ${process.env.ADMIN_GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    },
  );
  if (!response.ok) {
    if (response.status === 404)
      throw new AdminError(
        "Repository file was not found. Check token permissions.",
        404,
      );
    if (response.status === 409 || response.status === 422)
      throw new AdminError(
        "Content changed since you opened it. Reload the latest version before publishing.",
        409,
      );
    if (response.status === 401 || response.status === 403)
      throw new AdminError(
        "GitHub access was denied. Check the repository token permissions.",
        503,
      );
    throw new AdminError(
      "GitHub is unavailable. Your changes have not been published.",
      502,
    );
  }
  return response.json();
}
function endpoint(path: string) {
  return (
    "contents/" + (PREFIX + path).split("/").map(encodeURIComponent).join("/")
  );
}
export function contentEntry(id: string) {
  const item = manifest.find((x) => x.id === id);
  if (!item) throw new AdminError("Unknown content group.", 404);
  return item;
}
export async function readContent(id: string) {
  const item = contentEntry(id);
  const file = await github(endpoint(item.path) + "?ref=" + BRANCH);
  return {
    id,
    sha: file.sha,
    data: JSON.parse(Buffer.from(file.content, "base64").toString("utf8")),
  };
}
export async function publishContent(id: string, data: unknown, sha: string) {
  const item = contentEntry(id);
  if (!/^[0-9a-f]{40}$/.test(sha))
    throw new AdminError("Reload this group before publishing.");
  const result = await github(endpoint(item.path), "PUT", {
    message: `content: update ${item.label} from admin`,
    content: Buffer.from(JSON.stringify(data, null, 2) + "\n").toString(
      "base64",
    ),
    sha,
    branch: BRANCH,
  });
  return {
    sha: result.content.sha,
    commit: result.commit.sha,
    url: result.commit.html_url,
  };
}
export const mediaTargets = [
  "assets/images/portrait-studio.jpg",
  "assets/images/portrait-outdoor.jpg",
  "assets/images/portrait-coast.jpg",
  "assets/images/portrait-smile.jpg",
  "assets/images/portrait-formal.jpg",
  "assets/images/portrait-casual.jpg",
  "public/images/dubai-hero.webp",
  "public/og-default.jpg",
];
export async function mediaList() {
  const entries = [];
  for (const path of mediaTargets) {
    entries.push({
      path,
      url: path.startsWith("public/") ? "/" + path.slice(7) : null,
    });
  }
  let uploads = [];
  try {
    uploads = await github(endpoint("public/uploads") + "?ref=" + BRANCH);
  } catch (e) {
    if (!(e instanceof AdminError && e.status === 404)) throw e;
  }
  return [
    ...entries,
    ...(Array.isArray(uploads)
      ? uploads
          .filter((x: { type: string }) => x.type === "file")
          .map((x: { name: string }) => ({
            path: "public/uploads/" + x.name,
            url: "/uploads/" + x.name,
          }))
      : []),
  ];
}
export async function uploadMedia(path: string, bytes: Buffer, sha?: string) {
  if (
    !mediaTargets.includes(path) &&
    !/^public\/uploads\/[a-z0-9-]+\.(png|jpg|webp|gif)$/.test(path)
  )
    throw new AdminError("Unsupported image path.");
  const replacing = mediaTargets.includes(path);
  if (replacing && !sha)
    throw new AdminError("Select the existing image before replacing it.");
  const result = await github(endpoint(path), "PUT", {
    message: `media: ${replacing ? "replace" : "add"} ${path.split("/").pop()} from admin`,
    content: bytes.toString("base64"),
    ...(sha ? { sha } : {}),
    branch: BRANCH,
  });
  return {
    path,
    url: path.startsWith("public/") ? "/" + path.slice(7) : null,
    sha: result.content.sha,
    commit: result.commit.html_url,
  };
}
export async function mediaSha(path: string) {
  if (!mediaTargets.includes(path)) throw new AdminError("Unsupported image.");
  const file = await github(endpoint(path) + "?ref=" + BRANCH);
  return file.sha;
}
