'use client';
import { useState } from 'react';
import { ImagePlus } from 'lucide-react';
import studio from '@/assets/images/portrait-studio.jpg';
import outdoor from '@/assets/images/portrait-outdoor.jpg';
import coast from '@/assets/images/portrait-coast.jpg';
import smile from '@/assets/images/portrait-smile.jpg';
import formal from '@/assets/images/portrait-formal.jpg';
import casual from '@/assets/images/portrait-casual.jpg';
const originals:Record<string,string> = {
  'assets/images/portrait-studio.jpg':studio.src,
  'assets/images/portrait-outdoor.jpg':outdoor.src,
  'assets/images/portrait-coast.jpg':coast.src,
  'assets/images/portrait-smile.jpg':smile.src,
  'assets/images/portrait-formal.jpg':formal.src,
  'assets/images/portrait-casual.jpg':casual.src,
};
export function MediaThumbnail({path,url}:{path:string;url:string|null}) {
  const src=url||originals[path], [failed,setFailed]=useState(false);
  const name=path.split('/').pop()||'Image';
  if(!src||failed) return <div className="media-thumbnail media-thumbnail-missing"><ImagePlus size={24}/><span>Preview unavailable</span><small>New uploads appear after deployment.</small></div>;
  return <a className="media-thumbnail" href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size preview of ${name}`}><img src={src} alt={name} loading="lazy" decoding="async" onError={()=>setFailed(true)}/><span className="media-preview-label">View full size ↗</span></a>;
}
