import 'server-only';
import { createHmac } from 'node:crypto';
import { addTotals, reportDays, type Visit } from './model';
const prefix = 'shobon:analytics:v1:';
function config() { return { url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN }; }
export function analyticsConfigured() { const c = config(); return !!(c.url && c.token && process.env.ADMIN_SESSION_SECRET); }
export async function redis(commands: (string | number)[][]) { const c = config(); if (!analyticsConfigured())
    throw new Error('Analytics storage is not connected.'); const response = await fetch(`${c.url!.replace(/\/$/, '')}/pipeline`, { method: 'POST', headers: { Authorization: `Bearer ${c.token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(commands), cache: 'no-store', signal: AbortSignal.timeout(8000) }); if (!response.ok)
    throw new Error('Analytics storage is unavailable.'); const rows = await response.json() as {
    result: unknown;
    error?: string;
}[]; if (rows.some(r => r.error))
    throw new Error('Analytics storage could not process the request.'); return rows.map(r => r.result); }
function hash(value: string) { return createHmac('sha256', process.env.ADMIN_SESSION_SECRET!).update(value).digest('hex'); }
// A single Redis script makes deduplication, throttling, counters and expiry atomic.
const lua = `
local count=redis.call('INCR',KEYS[1]); if count==1 then redis.call('EXPIRE',KEYS[1],120) end
if count>120 then return 0 end
if not redis.call('SET',KEYS[2],'1','EX',86400,'NX') then return 0 end
redis.call('HINCRBY',KEYS[3],'views',1)
redis.call('PFADD',KEYS[4],ARGV[1])
local fresh=redis.call('SET',KEYS[5],'1','EX',1800,'NX');redis.call('EXPIRE',KEYS[5],1800)
if fresh then redis.call('HINCRBY',KEYS[3],'sessions',1);redis.call('HINCRBY',KEYS[6],ARGV[3],1) end
redis.call('HINCRBY',KEYS[7],ARGV[2],1)
redis.call('HINCRBY',KEYS[8],ARGV[4],1)
redis.call('HINCRBY',KEYS[9],ARGV[5],1)
for i=3,9 do if i~=5 then redis.call('EXPIRE',KEYS[i],7862400) end end
return 1`;
export async function recordVisit(v: Visit, request: Request) { const day = new Date().toISOString().slice(0, 10), base = prefix + day + ':'; const ip = request.headers.get('x-vercel-forwarded-for') || request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'; const country = request.headers.get('x-vercel-ip-country') || 'Unknown'; const keys = [prefix + 'rate:' + hash(ip) + ':' + Math.floor(Date.now() / 60000), prefix + 'event:' + v.event, base + 'totals', base + 'visitors', prefix + 'session:' + hash(v.session), base + 'sources', base + 'pages', base + 'devices', base + 'countries']; await redis([['EVAL', lua, keys.length, ...keys, hash(v.visitor), v.path, v.source, v.device, /^[A-Z]{2}$/.test(country) ? country : 'Unknown']]); }
function object(value: unknown) { if (!Array.isArray(value))
    return {} as Record<string, string>; const out: Record<string, string> = {}; for (let i = 0; i < value.length; i += 2)
    out[String(value[i])] = String(value[i + 1]); return out; }
export async function analyticsReport(days: number) { const dates = reportDays(days); const commands = dates.flatMap(day => { const b = prefix + day + ':'; return [['HGETALL', b + 'totals'], ['PFCOUNT', b + 'visitors'], ['HGETALL', b + 'sources'], ['HGETALL', b + 'pages'], ['HGETALL', b + 'devices'], ['HGETALL', b + 'countries']]; }); commands.push(['PFCOUNT', ...dates.map(d => prefix + d + ':visitors')]); const data = await redis(commands), daily = dates.map((date, i) => { const counts = object(data[i * 6]); return { date, views: Number(counts.views || 0), sessions: Number(counts.sessions || 0), visitors: Number(data[i * 6 + 1] || 0) }; }); const sum = (offset: number) => addTotals(dates.map((_, i) => object(data[i * 6 + offset]))); return { configured: true, days, timezone: 'UTC', retentionDays: 90, visitors: Number(data.at(-1) || 0), views: daily.reduce((n, d) => n + d.views, 0), sessions: daily.reduce((n, d) => n + d.sessions, 0), daily, sources: sum(2), pages: sum(3), devices: sum(4), countries: sum(5) }; }
