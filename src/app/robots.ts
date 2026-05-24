import type { MetadataRoute } from 'next';

const BASE_URL = 'https://convertaja.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Blokir halaman yang tidak perlu diindex Google
        disallow: [
          '/api/',
          '/login',
          '/register',
          '/profile',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
