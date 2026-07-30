import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Study in Turkey`,
    short_name: siteConfig.shortName,
    description: siteConfig.description.en,
    start_url: '/',
    display: 'standalone',
    background_color: '#f9f9ff',
    theme_color: '#003d9b',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
