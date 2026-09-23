import type { MetadataRoute } from 'next';
import { SITE_URL as BASE } from './layout';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
