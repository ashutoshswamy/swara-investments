import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://swarainvestments.in',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://swarainvestments.in/calculators',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...[
      'sip',
      'lumpsum',
      'retirement-corpus',
      'returns-cagr',
      'investment-goal',
    ].map((slug) => ({
      url: `https://swarainvestments.in/calculators/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
