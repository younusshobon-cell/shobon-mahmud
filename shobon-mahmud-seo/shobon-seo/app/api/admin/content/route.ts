import { authenticated, sameOrigin } from "@/lib/admin/auth";
import { AdminError, readContent, publishContent } from "@/lib/admin/github";
import { validateContent } from "@/lib/admin/validation";
export const runtime = "nodejs";
function failure(e: unknown) {
  return Response.json(
    {
      error:
        e instanceof AdminError
          ? e.message
          : "Could not process content. Try again.",
    },
    {
      status: e instanceof AdminError ? e.status : 500,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
export async function GET(request: Request) {
  if (!(await authenticated()))
    return Response.json({ error: "Please sign in." }, { status: 401 });
  try {
    return Response.json(
      await readContent(new URL(request.url).searchParams.get("id") ?? ""),
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    return failure(e);
  }
}
export async function PUT(request: Request) {
  if (!(await authenticated()))
    return Response.json({ error: "Please sign in." }, { status: 401 });
  if (!sameOrigin(request))
    return Response.json({ error: "Invalid origin." }, { status: 403 });
  try {
    if (Number(request.headers.get("content-length") ?? 0) > 2 * 1024 * 1024)
      throw new AdminError("Content exceeds the 2 MB limit.", 413);
    const raw = await request.text();
    if (raw.length > 2 * 1024 * 1024)
      throw new AdminError("Content exceeds the 2 MB limit.", 413);
    const body = JSON.parse(raw);
    const error = validateContent(body.id, body.data);
    if (error) throw new AdminError(error);
    return Response.json(await publishContent(body.id, body.data, body.sha));
  } catch (e) {
    return failure(e);
  }
}
