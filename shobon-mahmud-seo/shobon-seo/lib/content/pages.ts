import data from '@/content/custom-pages.json';
import type { CustomPage } from './editor';
export const customPages = (data as CustomPage[]).filter(p => p.status === 'published');
