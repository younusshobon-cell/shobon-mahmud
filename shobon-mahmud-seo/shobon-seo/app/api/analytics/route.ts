import { authenticated, sameOrigin } from '@/lib/admin/auth';
import { analyticsConfigured, recordVisit } from '@/lib/analytics/store';
import { validVisit } from '@/lib/analytics/model';
export const runtime = 'nodejs';
export async function POST(request: Request) {
    if (!sameOrigin(request))
        return new Response(null, { status: 403 });
    if (!analyticsConfigured() || request.headers.get('dnt') === '1' || request.headers.get('sec-gpc') === '1' || /bot|crawl|spider|headless/i.test(request.headers.get('user-agent') || '') || await authenticated())
        return new Response(null, { status: 204 });
    if (!request.headers.get('content-type')?.startsWith('application/json') || Number(request.headers.get('content-length') || 0) > 2048)
        return new Response(null, { status: 400 });
    try {
        const body = await request.text();
        if (body.length > 2048)
            return new Response(null, { status: 413 });
        const v = JSON.parse(body);
        if (!validVisit(v))
            return new Response(null, { status: 400 });
        await recordVisit(v, request);
        return new Response(null, { status: 204 });
    }
    catch {
        return new Response(null, { status: 503 });
    }
}
