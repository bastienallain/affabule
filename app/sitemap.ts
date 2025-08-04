import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://museeaffabuloscope.fr';
  
  // Pages statiques
  const staticPages = [
    '',
    '/about',
    '/contact',
  ];

  const staticSitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Ici vous pouvez ajouter des pages dynamiques
  // Par exemple, si vous avez des articles de blog :
  // const posts = await getPosts();
  // const dynamicSitemap = posts.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.updatedAt,
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.6,
  // }));

  return [
    ...staticSitemap,
    // ...dynamicSitemap,
  ];
}