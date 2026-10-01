# Content studio

Open `/admin` to manage the website. Public routes retain their existing URLs and content.

## Activate on Vercel

Set these **server-only encrypted environment variables** for the `shobon-mahmud` project:

- `ADMIN_PASSWORD`: a unique password, at least 11 characters (a longer unique password is recommended), no more than 256.
- `ADMIN_SESSION_SECRET`: a separate cryptographically random secret, at least 32 characters. For example, generate one with `openssl rand -hex 32`.
- `ADMIN_GITHUB_TOKEN`: a fine-grained GitHub personal access token restricted to `younusshobon-cell/shobon-mahmud`, with **Contents: Read and write**. The token remains on the server and is never returned to the browser. Configure a suitable expiry and rotate it before expiration.

Use Production and, if you want to test previews, Preview targets. Redeploy after setting or rotating secrets. Never commit secret values or prefix these variables with `NEXT_PUBLIC_`. Login stays disabled until the password and session secret meet the minimum requirements. Content access and publishing require the repository token.

## Manage content

- **Site settings**: name, contact email, location, social links, metrics, tools, experience, navigation.
- **Page copy**: static page/component headings, paragraphs, button labels, image descriptions, links and metadata copy.
- **Blog**: posts and categories; add article sections and paragraphs, headings, lists or quotes.
- **Services, Industries, Locations, Portfolio**: editable structured entries, content sections, FAQs and related slugs.
- **FAQs**: hub/page question groups.
- **Media**: upload raster images or replace existing portraits, Dubai hero and default social image. Uploaded bytes are preserved. PNG, JPG, WEBP and GIF are supported, up to 3 MB. New files go to `public/uploads`; use their `/uploads/...` path in an image field. Existing assets require matching file formats. SVG/HTML uploads and arbitrary file paths are rejected.

Edits remain in the browser until **Publish changes**. Publishing updates the selected JSON file on `main` with a GitHub commit, then the existing Git integration builds and deploys it on Vercel. Media uploads commit immediately. A successful commit is not a completed deployment; wait for Vercel before checking the live page. JSON exports back up the selected group. The JSON editor supports advanced editing and imports by pasting JSON. Code-controlled layout, animation and computed copy stay in the source repository.

New entries use the existing page templates and are included in generated routes and sitemaps after deployment. Changing a slug changes the URL; update related slugs, page links and navigation. Existing slugs can be removed, but that does not automatically create redirect rules. Portfolio `draft` retains the existing site's draft semantics; there is no separate editorial review workflow.

GitHub SHA checks prevent silent overwrites: if someone changes the same content file, export your draft and reload before reapplying it. GitHub commit history is the audit trail and can be used to revert a published edit. You can disable access immediately by clearing the admin secrets and redeploying. Rotating the password or session secret invalidates existing sessions on the new deployment.

## Security and verification

Every content and media API verifies the authenticated session. Write requests require a matching Origin. Sessions use an HMAC signature, eight-hour expiry and HttpOnly / SameSite=Strict cookies (Secure in production). Login uses constant-time comparison of scrypt-derived values and per-instance attempt throttling. This throttling is not a distributed global limit; configure a Vercel Firewall login limit for additional protection if needed. Runtime content validation rejects malformed records, unknown fields, duplicate slugs and invalid dates before committing. The admin is excluded from indexing. Public data and secret values are separated.

Run `npm run test:admin`, `npm run typecheck` and `npm run build`. After building, run `npm run test:admin:runtime` to verify the implementation. Tests use mocked GitHub responses and temporary dummy credentials, and do not publish changes to the real repository.
