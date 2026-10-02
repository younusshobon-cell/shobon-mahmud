import { authenticated } from '@/lib/admin/auth';
import { analyticsConfigured, analyticsReport } from '@/lib/analytics/store';
export const runtime = 'nodejs';
export async function GET(request: Request) { const headers = { 'Cache-Control': 'private, no-store' }; if (!await authenticated())
    return Response.json({ error: 'Please sign in.' }, { status: 401, headers }); const days = Number(new URL(request.url).searchParams.get('days') || 28); if (![7, 28, 90].includes(days))
    return Response.json({ error: 'Choose 7, 28 or 90 days.' }, { status: 400, headers }); if (!analyticsConfigured())
    return Response.json({ configured: false }, { headers }); try {
    return Response.json(await analyticsReport(days), { headers });
}
catch {
    return Response.json({ error: 'Analytics storage is unavailable. Please try again.' }, { status: 503, headers });
} }
