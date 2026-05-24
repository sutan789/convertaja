import type { MetadataRoute } from 'next';

// Ganti ini dengan domain Vercel kamu setelah deploy
// Contoh: https://convertaja.vercel.app ATAU domain custom seperti https://convertaja.com
const BASE_URL = 'https://convertaja.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const tools = [
    { slug: 'qr-code',           label: 'Link to QR Code' },
    { slug: 'digital-signature', label: 'Tanda Tangan Digital' },
    { slug: 'merge-pdf',         label: 'Merge PDF' },
    { slug: 'split-pdf',         label: 'Split PDF' },
    { slug: 'image-to-pdf',      label: 'Image to PDF' },
    { slug: 'compress-pdf',      label: 'Compress PDF' },
    { slug: 'pdf-to-word',       label: 'PDF ke Word' },
    { slug: 'word-to-pdf',       label: 'Word ke PDF' },
  ];

  return [
    // Halaman utama — prioritas tertinggi
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Halaman statis
    {
      url: `${BASE_URL}/tentang`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    // Halaman tools — prioritas tinggi karena ini inti produk
    ...tools.map((tool) => ({
      url: `${BASE_URL}/tools/${tool.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ];
}
