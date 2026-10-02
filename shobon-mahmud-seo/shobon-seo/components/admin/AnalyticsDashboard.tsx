'use client';
import { useEffect, useState } from 'react';
import { Download, RefreshCw, TrendingUp, Users, Eye, MousePointerClick } from 'lucide-react';
type Row = {
    name: string;
    value: number;
};
type Report = {
    configured: boolean;
    visitors: number;
    views: number;
    sessions: number;
    daily: {
        date: string;
        views: number;
        visitors: number;
        sessions: number;
    }[];
    sources: Row[];
    pages: Row[];
    devices: Row[];
    countries: Row[];
};
export function AnalyticsDashboard() {
    const [days, setDays] = useState(28), [data, setData] = useState<Report | null>(null), [error, setError] = useState(''), [loading, setLoading] = useState(true), [refresh, setRefresh] = useState(0);
    useEffect(() => { let ignore = false; setLoading(true); setError(''); fetch(`/api/admin/analytics?days=${days}`, { cache: 'no-store' }).then(async (r) => { const d = await r.json(); if (!r.ok)
        throw new Error(d.error); if (!ignore)
        setData(d); }).catch(e => { if (!ignore)
        setError(e.message); }).finally(() => { if (!ignore)
        setLoading(false); }); return () => { ignore = true; }; }, [days, refresh]);
    const fmt = (n: number) => new Intl.NumberFormat().format(n || 0);
    function table(title: string, rows: Row[], metric = 'Page views') { const total = rows.reduce((n, r) => n + r.value, 0); return <section className="admin-card"><h2>{title}</h2><div className="analytics-table"><div className="analytics-row admin-muted"><span>Name</span><span>{metric}</span><span>Share</span></div>{rows.slice(0, 15).map(r => <div className="analytics-row" key={r.name}><span title={r.name}>{r.name}</span><strong>{fmt(r.value)}</strong><span>{total ? (r.value / total * 100).toFixed(1) : 0}%</span></div>)}{!rows.length && <p className="admin-muted">No visits recorded in this period.</p>}</div></section>; }
    function csv() { if (!data?.configured)
        return; const lines = [['Section', 'Name', 'Views', 'Visitors', 'Sessions'], ...data.daily.map(d => ['Daily', d.date, d.views, d.visitors, d.sessions]), ...(['sources', 'pages', 'devices', 'countries'] as const).flatMap(key => data[key].map(r => [key, r.name, r.value, '', '']))]; const blob = new Blob([lines.map(row => row.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(',')).join('\n')], { type: 'text/csv;charset=utf-8' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `analytics-${days}-days.csv`; a.click(); URL.revokeObjectURL(a.href); }
    return <><div className="admin-page-heading"><div><p className="admin-eyebrow">WEBSITE PERFORMANCE</p><h1>Analytics</h1><p className="admin-muted">See how visitors find your site and which pages they read.</p></div><div className="admin-heading-actions"><select aria-label="Analytics date range" value={days} onChange={e => setDays(Number(e.target.value))}><option value={7}>Last 7 days</option><option value={28}>Last 28 days</option><option value={90}>Last 90 days</option></select><button onClick={() => setRefresh(n => n + 1)} disabled={loading} aria-label="Refresh analytics"><RefreshCw size={16}/></button><button onClick={csv} disabled={!data?.configured || loading}><Download size={16}/> Export CSV</button></div></div>{error && <div role="alert" className="admin-notice is-error">{error}</div>}{loading ? <div className="admin-card admin-empty">Loading analytics…</div> : data && !data.configured ? <section className="admin-card"><TrendingUp size={28}/><h2>Connect analytics storage</h2><p>Connect an Upstash Redis database to this Vercel project, then redeploy. Traffic data starts collecting after connection.</p><p className="admin-muted">No analytics data is available yet. Your website works normally while storage is disconnected.</p><a href="https://vercel.com/grewforge/shobon-mahmud/stores" target="_blank" rel="noopener noreferrer">Open project storage ↗</a></section> : data?.configured && <><div className="analytics-metrics">{[{ name: 'Visitors', value: data.visitors, Icon: Users, help: 'Estimated unique visitors across the selected period' }, { name: 'Page views', value: data.views, Icon: Eye, help: 'Every recorded page visit, including repeat views' }, { name: 'Sessions', value: data.sessions, Icon: MousePointerClick, help: 'Visits grouped by a 30-minute inactivity window' }].map(m => <section className="admin-card" key={m.name}><m.Icon size={20}/><p>{m.name}</p><strong>{fmt(m.value)}</strong><small>{m.help}</small></section>)}</div><section className="admin-card"><h2>Traffic over time</h2><p className="admin-muted">Daily page views · UTC dates</p><div className="analytics-chart" role="img" aria-label="Daily page views bar chart">{data.daily.map(d => <div key={d.date} title={`${d.date}: ${d.views} views, ${d.visitors} visitors`}><span style={{ height: `${Math.max(1, d.views / Math.max(1, ...data.daily.map(x => x.views)) * 100)}%` }}/></div>)}</div><div className="analytics-chart-labels"><span>{data.daily[0]?.date}</span><span>{data.daily.at(-1)?.date}</span></div><details><summary>View daily numbers</summary><div className="analytics-table"><div className="analytics-row"><strong>Date</strong><strong>Views</strong><strong>Visitors</strong></div>{data.daily.map(d => <div className="analytics-row" key={d.date}><span>{d.date}</span><span>{d.views}</span><span>{d.visitors}</span></div>)}</div></details></section><div className="analytics-grid">{table('Traffic sources', data.sources, 'Sessions')}{table('Popular pages', data.pages)}{table('Devices', data.devices)}{table('Countries', data.countries)}</div>{data.views === 0 && <p className="admin-notice">Tracking is connected. Your first visitor will appear here after opening a public page.</p>}<p className="admin-muted analytics-footnote">Data is retained for 90 days. Visitors are estimated using anonymous browser IDs; changing browsers or clearing storage can count a visitor again. Admin visits, common bots and browsers that request no tracking are excluded. Google search impressions, keywords and ranking require Google Search Console and are not collected here.</p></>}</>;
}
