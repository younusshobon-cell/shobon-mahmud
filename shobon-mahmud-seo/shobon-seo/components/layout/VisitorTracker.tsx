'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trafficSource } from '@/lib/analytics/model';
export function VisitorTracker() { const path = usePathname(), last = useRef(''); useEffect(() => { if (window.parent !== window && new URLSearchParams(location.search).get('admin-preview') === '1') return; if (!path || last.current === path || path.startsWith('/admin') || navigator.doNotTrack === '1' || (navigator as Navigator & {
    globalPrivacyControl?: boolean;
}).globalPrivacyControl)
    return; last.current = path; try {
    let visitor = localStorage.getItem('shobon-visitor');
    if (!visitor) {
        visitor = crypto.randomUUID();
        localStorage.setItem('shobon-visitor', visitor);
    }
    let session = sessionStorage.getItem('shobon-session');
    const touched = Number(sessionStorage.getItem('shobon-session-time'));
    if (!session || Date.now() - touched > 1800000) {
        session = crypto.randomUUID();
        sessionStorage.setItem('shobon-session', session);
        sessionStorage.setItem('shobon-source', trafficSource(document.referrer, new URLSearchParams(location.search).get('utm_source') || '', location.hostname));
    }
    sessionStorage.setItem('shobon-session-time', String(Date.now()));
    const device = /ipad|tablet/i.test(navigator.userAgent) ? 'Tablet' : /mobi|android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
    void fetch('/api/analytics', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event: crypto.randomUUID(), visitor, session, path, source: sessionStorage.getItem('shobon-source') || 'Direct', device }), keepalive: true }).catch(() => { });
}
catch { /* Storage blocked: do not track. */ } }, [path]); return null; }
