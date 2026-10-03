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

## Easy page and blog workflow

Open **Blog → New article** or **Pages → New page**. Enter the title, URL, description and content. The URL is generated from the title; use a unique URL. Use the content toolbar for headings, lists and quotes, and **Preview** before publishing. **Save draft** stores the work in the repository while hiding it from public pages and sitemaps. **Publish** creates a GitHub commit; wait for Vercel deployment to finish before opening the live page. To hide an existing page/article, open it and save as draft. **Duplicate** creates a separate copy without altering the original. **Reload latest** resolves stale content after someone else edits it; unsaved edits will be discarded only after confirmation.

Existing articles retain their FAQs, related links and section anchors when the headings remain the same. Use **Advanced collections** for these optional fields or blog categories. Pages creates standalone URLs; add a menu link in **Site settings** if you want it in navigation. A page's URL cannot replace an existing built-in section such as `/about` or `/services`; edit those through **Page copy**. Give maintenance staff the admin password only if they should have full content publishing access.

## Private analytics

**Analytics** shows estimated unique visitors, page views, 30-minute sessions, daily traffic, acquisition sources, popular pages, devices and countries. Date ranges are 7, 28 or 90 days; dates use UTC. Export CSV for your records. Traffic sources count sessions; other breakdowns count page views. Unique visitors across a date range are calculated from the union of daily Redis HyperLogLog counters (not the sum of daily visitors).

Connect an **Upstash Redis** database from Vercel's Storage tab using the free plan. Attach it to this project and Production, then redeploy. The server accepts `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` or `KV_REST_API_URL` / `KV_REST_API_TOKEN`. Tokens stay server-side. The existing `ADMIN_SESSION_SECRET` hashes browser IDs and rate-limit IPs. Rotating it changes visitor identity; old aggregates remain.

Collection begins after storage is connected; earlier traffic is unavailable. No demo metrics are shown. Data expires after 91 days; the dashboard exposes the last 90. The tracker stores a random browser ID in local storage and a session ID/source in session storage. It records clean page paths, normalized source, device and country only: no raw IP, complete referrer URLs, queries, names or emails. Admin sessions, common bots, Do Not Track and Global Privacy Control are excluded. Visitors are approximate and cannot identify people. Browser storage blockers can prevent tracking. Search Console impressions, search terms, CTR and rankings require a separate Google Search Console integration; this dashboard measures visits to the site itself.

## Visual blog editor

Blog content now uses a visual editor. Select a line or place the cursor in it, then choose Paragraph or Heading 1–6 from **Text style**. Use **Bullets**, **Numbered list** or **Quote** to format selected lines. No Markdown markers are needed. **Image** accepts a site/HTTP(S) URL or uploads the original PNG/JPG/WEBP/GIF (under 3 MB); add alt text and an optional caption. Click an inserted image to edit or remove it. Removing an image from an article does not delete the uploaded file. **Table** chooses body rows and columns; click cells to edit, then use **Row**, **Column** or **Remove table**. Tables support up to 12 columns and 100 body rows. Use Preview before Save draft or Publish. Pasted text is inserted as plain text for consistent formatting.

Existing article sections and anchors are retained. H2 headings become table-of-contents sections; H1/H3–H6 remain body headings. Article images, captions and tables are stored as validated structured content and rendered safely, without storing HTML.

## Live page editor

Click the eye icon **Live editor** in the admin header or sidebar. Choose any published page, blog article, service, location, industry or portfolio URL. Desktop and mobile previews stay inside admin. Clicking a text or image selects its source field. If several fields share a value, select the correct collection/path first. Edit text in the inspector or click **Edit directly on page** to type on the preview. Links have an **Edit link destination** action, and photos support uploads and alt text. Uploaded images are committed immediately; the page reference is published separately.

The collection editor also covers SEO, lists and fields that cannot be matched to a visible element. String changes preview directly; list/layout changes need publishing and deployment before their rendered structure updates. Generated text or component layouts have no direct field mapping. The editor never changes component source code.

**Publish** saves changed collections using their latest file SHA. Each collection is a separate commit. On partial failure, successful collections remain saved and remaining drafts stay in the editor. Wait for the Vercel deployment then reload the preview. Navigation warns before discarding unpublished changes. Draft edits are held in memory; they do not survive closing the browser. New pages become available after publishing and deploying.

The iframe is limited to same-origin public routes, forms cannot submit, admin previews are excluded from first-party analytics, and catalog/read/write APIs require the existing admin session. Existing photos use `image-sources` overrides; empty values retain the original files. Only local uploaded image URLs are accepted for these overrides.

## Automatic sitemaps and robots

`/sitemap.xml` lists folder sitemaps for pages, services, locations, industries,
blog and portfolio, plus `/sitemaps/industries/<industry-slug>.xml` for each industry.
Industry sitemaps use the existing related-industry fields on services, locations
and blog posts, and the industry field on published case studies. Unknown industry
sitemap URLs return 404. Draft pages, posts and case studies are excluded.

Publish content normally in Admin. Once the connected Vercel production deployment
finishes, new pages and industries appear automatically; XML files need no manual
editing. Plain custom pages go into pages.xml. New industry pages should be added
in the Industries collection. Robots allows public production pages, blocks admin
and API paths, declares the sitemap index, and blocks preview deployments.

Verify with `node tests/sitemaps.test.cjs`.
