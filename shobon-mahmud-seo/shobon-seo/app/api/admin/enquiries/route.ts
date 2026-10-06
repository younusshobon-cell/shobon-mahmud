import { authenticated, sameOrigin } from '@/lib/admin/auth';
import { analyticsConfigured } from '@/lib/analytics/store';
import { listEnquiries, updateEnquiry, deleteEnquiry } from '@/lib/analytics/conversions';
export const runtime='nodejs';
const headers={'Cache-Control':'private, no-store'};
export async function GET(req:Request){
 if(!await authenticated())return Response.json({error:'Please sign in.'},{status:401,headers});
 const days=Number(new URL(req.url).searchParams.get('days')||28);
 if(![7,28,90].includes(days))return Response.json({error:'Invalid date range.'},{status:400,headers});
 if(!analyticsConfigured())return Response.json({configured:false,enquiries:[]},{headers});
 try{return Response.json({configured:true,enquiries:await listEnquiries(days)},{headers});}
 catch{return Response.json({error:'Enquiry storage is unavailable.'},{status:503,headers});}
}
async function edit(req:Request,remove=false){
 if(!sameOrigin(req) || !await authenticated())return Response.json({error:'Please sign in.'},{status:403,headers});
 try{
 const text=await req.text();if(text.length>6000)return Response.json({error:'Request too large.'},{status:413,headers});
 const v=JSON.parse(text);
 if(typeof v.id!=='string'||!/^[a-f0-9-]{36}$/.test(v.id))return Response.json({error:'Invalid enquiry.'},{status:400,headers});
 if(remove){await deleteEnquiry(v.id);return Response.json({ok:true},{headers});}
 if(!['new','contacted','qualified','closed'].includes(v.status)||typeof v.notes!=='string'||v.notes.length>3000)return Response.json({error:'Invalid status or notes.'},{status:400,headers});
 if(!await updateEnquiry(v.id,v.status,v.notes))return Response.json({error:'Enquiry no longer available.'},{status:404,headers});
 return Response.json({ok:true},{headers});
 }catch{return Response.json({error:'Could not save. Please try again.'},{status:503,headers});}
}
export async function PATCH(req:Request){return edit(req);}
export async function DELETE(req:Request){return edit(req,true);}
