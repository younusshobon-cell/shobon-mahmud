export type Visit = {
    event: string;
    visitor: string;
    session: string;
    path: string;
    source: string;
    device: string;
};
export function trafficSource(referrer: string, utm: string, ownHost: string) {
    const clean = utm.trim().toLowerCase();
    if (clean && /^[a-z0-9 _.-]{1,60}$/.test(clean))
        return `Campaign: ${clean}`;
    if (!referrer)
        return 'Direct';
    try {
        const host = new URL(referrer).hostname.toLowerCase().replace(/^www\./, '');
        if (host === ownHost.replace(/^www\./, ''))
            return 'Direct';
        if (/(^|\.)google\.[a-z.]+$/.test(host))
            return 'Google';
        if (/(^|\.)(bing.com|duckduckgo.com|search.yahoo.com)$/.test(host))
            return 'Other search';
        if (/(^|\.)(facebook.com|instagram.com|linkedin.com|t.co|twitter.com|x.com|youtube.com|pinterest.com)$/.test(host))
            return 'Social';
        return `Referral: ${host.slice(0, 80)}`;
    }
    catch {
        return 'Direct';
    }
}
export function validVisit(x: unknown): x is Visit { if (!x || typeof x !== 'object')
    return false; const v = x as Visit; return [v.event, v.visitor, v.session].every(s => typeof s === 'string' && /^[a-f0-9-]{36}$/.test(s)) && typeof v.path === 'string' && /^\/(?:[a-zA-Z0-9_-]+\/?)*$/.test(v.path) && v.path.length <= 200 && !/^\/(admin|api)(\/|$)/.test(v.path) && typeof v.source === 'string' && /^(Direct|Google|Other search|Social|Campaign: [a-z0-9 _.-]{1,60}|Referral: [a-z0-9.-]{1,80})$/.test(v.source) && ['Mobile', 'Tablet', 'Desktop'].includes(v.device); }
export function reportDays(days: number, now = new Date()) { const end = new Date(`${now.toISOString().slice(0, 10)}T00:00:00Z`); return Array.from({ length: days }, (_, i) => new Date(end.getTime() - (days - 1 - i) * 86400000).toISOString().slice(0, 10)); }
export function addTotals(rows: Record<string, string>[]) { const totals: Record<string, number> = {}; for (const row of rows)
    for (const [k, v] of Object.entries(row))
        totals[k] = (totals[k] || 0) + Number(v); return Object.entries(totals).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value); }
