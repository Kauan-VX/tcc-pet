import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://adotamatch.com.br';

  const routes = [
    '',
    '/dashboard',
    '/dashboard/profile',
    '/dashboard/matches',
    '/dashboard/favorites',
    '/dashboard/foster',
    '/institution',
    '/institution/pets',
    '/institution/applications',
    '/institution/foster',
    '/admin',
    '/admin/users',
    '/admin/pets',
    '/admin/institutions',
    '/admin/analytics',
    '/admin/settings',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route.includes('/admin') ? 0.3 : 0.8,
  }));
}
