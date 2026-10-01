import { randomUUID } from "node:crypto";
import { authenticated, sameOrigin } from "@/lib/admin/auth";
import {
  AdminError,
  mediaList,
  mediaSha,
  mediaTargets,
  uploadMedia,
} from "@/lib/admin/github";
export const runtime = "nodejs";
function failure(e: unknown) {
  return Response.json(
    {
      error:
        e instanceof AdminError ? e.message : "Image upload failed. Try again.",
    },
    { status: e instanceof AdminError ? e.status : 500 },
  );
}
export async function GET(request: Request) {
  if (!(await authenticated()))
    return Response.json({ error: "Please sign in." }, { status: 401 });
  try {
    const path = new URL(request.url).searchParams.get("path");
    return Response.json(
      path ? { sha: await mediaSha(path) } : { images: await mediaList() },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    return failure(e);
  }
}
export async function POST(request: Request) {
  if (!(await authenticated()))
    return Response.json({ error: "Please sign in." }, { status: 401 });
  if (!sameOrigin(request))
    return Response.json({ error: "Invalid origin." }, { status: 403 });
  try {
    if (Number(request.headers.get("content-length") ?? 0) > 4 * 1024 * 1024)
      throw new AdminError("Maximum image size is 3 MB.", 413);
    const form = await request.formData(),
      file = form.get("file");
    if (!(file instanceof File) || file.size > 3 * 1024 * 1024 || !file.size)
      throw new AdminError("Select a PNG, JPG, WEBP or GIF under 3 MB.");
    const bytes = Buffer.from(await file.arrayBuffer());
    let extension = "";
    if (
      bytes
        .subarray(0, 8)
        .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
    )
      extension = "png";
    else if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255)
      extension = "jpg";
    else if (
      bytes.toString("ascii", 0, 4) === "RIFF" &&
      bytes.toString("ascii", 8, 12) === "WEBP"
    )
      extension = "webp";
    else if (/^GIF8[79]a$/.test(bytes.toString("ascii", 0, 6)))
      extension = "gif";
    else
      throw new AdminError(
        "Unsupported image format. SVG and HTML uploads are not accepted.",
      );
    const target = String(form.get("target") ?? "");
    if (target && !mediaTargets.includes(target))
      throw new AdminError("Unsupported image target.");
    if (target && !target.endsWith("." + extension))
      throw new AdminError(
        `This image needs a ${target.split(".").pop()?.toUpperCase()} file.`,
      );
    const path = target || "public/uploads/" + randomUUID() + "." + extension;
    return Response.json(
      await uploadMedia(
        path,
        bytes,
        form.get("sha") ? String(form.get("sha")) : undefined,
      ),
    );
  } catch (e) {
    return failure(e);
  }
}
