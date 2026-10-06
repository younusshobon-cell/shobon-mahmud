import 'server-only';
import { createHmac } from 'node:crypto';
import { redis, analyticsConfigured } from './store';
import { reportDays, addTotals } from './model';
const root = 'shobon:conversions:v1:';
export type CtaEvent = {event:string;visitor:string;path:string;label:string;target:string};
export type Enquiry = {id:string;created:string;status:'new'|'contacted'|'qualified'|'closed';notes:string;details:Record<string,string>};
export function validCta(v: unknown): v is CtaEvent {
 if (!v || typeof v !== 'object') return false;
 const x=v as CtaEvent;
 return [x.event,x.visitor].every(s=>typeof s==='string' && /^[a-f0-9-]{36}$/.test(s)) &&
 typeof x.path==='string' && /^\/(?:[a-zA-Z0-9_-]+\/?)*$/.test(x.path) && x.path.length<=200 && !/^\/(admin|api)(\/|$)/.test(x.path) &&
 typeof x.label==='string' && x.label.trim().length>0 && x.label.length<=120 &&
 typeof x.target==='string' && x.target.length<=240 && /^(\/[^/]|\/$|https:\/\/|mailto:|tel:|#)/.test(x.target);
}
function hash(s:string){return createHmac('sha256',process.env.ADMIN_SESSION_SECRET!).update(s).digest('hex');}
function ip(req:Request){return req.headers.get('x-vercel-forwarded-for') || req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';}
const clickLua=`
local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],60) end
if n>60 then return 0 end
if not redis.call('SET',KEYS[2],'1','NX','EX',86400) then return 0 end
redis.call('INCR',KEYS[3]);redis.call('HINCRBY',KEYS[4],ARGV[1],1);redis.call('PFADD',KEYS[5],ARGV[2])
for i=3,5 do redis.call('EXPIRE',KEYS[i],7862400) end
return 1`;
export async function recordCta(v:CtaEvent,req:Request){
 const base=root+new Date().toISOString().slice(0,10)+':';
 await redis([['EVAL',clickLua,5,root+'rate:'+hash(ip(req))+':'+Math.floor(Date.now()/60000),root+'event:'+v.event,base+'clicks',base+'buttons',base+'visitors',JSON.stringify([v.path,v.label,v.target]),hash(v.visitor)]]);
}
function obj(value:unknown){if(!Array.isArray(value))return {};const o:Record<string,string>={};for(let i=0;i<value.length;i+=2)o[String(value[i])]=String(value[i+1]);return o;}
export async function conversionReport(days:number){
 const dates=reportDays(days), commands:(string|number)[][]=dates.flatMap(d=>[['GET',root+d+':clicks'],['HGETALL',root+d+':buttons'],['GET',root+d+':submissions']]);
 commands.push(['PFCOUNT',...dates.map(d=>root+d+':visitors')]);
 const rows=await redis(commands);
 return {clicks:dates.reduce((n,_,i)=>n+Number(rows[i*3]||0),0),clickers:Number(rows.at(-1)||0),submissions:dates.reduce((n,_,i)=>n+Number(rows[i*3+2]||0),0),
 ctas:addTotals(dates.map((_,i)=>obj(rows[i*3+1]))).map(r=>{const [path,label,target]=JSON.parse(r.name) as string[];return {path,label,target,clicks:r.value};}),
 daily:dates.map((date,i)=>({date,clicks:Number(rows[i*3]||0),submissions:Number(rows[i*3+2]||0)}))};
}
const saveLua=`
if redis.call('EXISTS',KEYS[1])==1 then return 2 end
local n=redis.call('INCR',KEYS[2]);if n==1 then redis.call('EXPIRE',KEYS[2],600) end
if n>10 then return 0 end
redis.call('SET',KEYS[1],ARGV[1],'EX',7776000)
redis.call('ZADD',KEYS[3],ARGV[2],ARGV[3])
redis.call('ZREMRANGEBYSCORE',KEYS[3],'-inf',ARGV[4])
redis.call('INCR',KEYS[4]);redis.call('EXPIRE',KEYS[4],7862400)
return 1`;
export async function saveEnquiry(details:Record<string,string>,id:string,req:Request){
 if(!analyticsConfigured())throw Error('Enquiry storage is unavailable.');
 const now=Date.now(),lead:Enquiry={id,created:new Date(now).toISOString(),status:'new',notes:'',details};
 const [result]=await redis([['EVAL',saveLua,4,root+'lead:'+id,root+'lead-rate:'+hash(ip(req)),root+'leads',root+lead.created.slice(0,10)+':submissions',JSON.stringify(lead),now,id,now-7776000000]]);
 if(Number(result)===0)throw Error('Too many enquiries. Please try again later.');
 return id;
}
export async function listEnquiries(days:number){
 const start=new Date(reportDays(days)[0]+'T00:00:00Z').getTime();
 const [ids]=await redis([['ZREVRANGEBYSCORE',root+'leads','+inf',start,'LIMIT',0,500]]);
 const keys=ids as string[];if(!keys?.length)return [];
 const rows=await redis([['MGET',...keys.map(id=>root+'lead:'+id)]]);
 return (rows[0] as (string|null)[]).filter((v):v is string=>!!v).map(v=>JSON.parse(v) as Enquiry);
}
export async function updateEnquiry(id:string,status:string,notes:string){
 const key=root+'lead:'+id;
 const script=`local v=redis.call('GET',KEYS[1]);if not v then return 0 end;local o=cjson.decode(v);o.status=ARGV[1];o.notes=ARGV[2];redis.call('SET',KEYS[1],cjson.encode(o),'KEEPTTL');return 1`;
 const [found]=await redis([['EVAL',script,1,key,status,notes]]);return !!found;
}
export async function deleteEnquiry(id:string){await redis([['DEL',root+'lead:'+id],['ZREM',root+'leads',id]]);}
