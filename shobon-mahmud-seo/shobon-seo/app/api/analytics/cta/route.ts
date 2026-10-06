import { authenticated, sameOrigin } from '@/lib/admin/auth';
import { analyticsConfigured } from '@/lib/analytics/store';
import { validCta, recordCta } from '@/lib/analytics/conversions';
export const runtime='nodejs';
export async function POST(req:Request){
 if(!sameOrigin(req))return new Response(null,{status:403});
 if(!analyticsConfigured() || req.headers.get('dnt')==='1' || req.headers.get('sec-gpc')==='1' || /bot|crawl|spider|headless/i.test(req.headers.get('user-agent')||'') || await authenticated())return new Response(null,{status:204});
 if(!req.headers.get('content-type')?.startsWith('application/json'))return new Response(null,{status:400});
 try{
  const text=await req.text();if(text.length>2048)return new Response(null,{status:413});
  const v=JSON.parse(text);if(!validCta(v))return new Response(null,{status:400});
  await recordCta(v,req);return new Response(null,{status:204});
 }catch{return new Response(null,{status:503});}
}
