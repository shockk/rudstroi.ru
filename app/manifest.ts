import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

// Иконки собираются скриптом scripts/build-favicon.mjs
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.tagline,
    start_url: '/',
    display: 'browser',
    background_color: '#F6F4EE',
    theme_color: '#1F3B2D',
    icons: [
      { src: '/favicon/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/favicon/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
