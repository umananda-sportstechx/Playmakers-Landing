import type { MetadataRoute } from 'next';
import { SITE_URL } from './layout';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Playmakers',
    short_name: 'Playmakers',
    description: 'The inner circle of sports tech.',
    id: SITE_URL,
    start_url: '/',
    display: 'standalone',
    background_color: '#111133',
    theme_color: '#111133',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
