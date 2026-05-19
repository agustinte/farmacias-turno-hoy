import { MetadataRoute } from 'next';
import { prisma } from '@/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const URL_BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://tu-web.com';

  // 1. Obtener todas las localidades de la base de datos
  const localidades = await prisma.localidad.findMany({
    select: {
      slug: true,
    },
  });

  // 2. Mapear las localidades a las rutas de tu sitio
  const rutasLocalidades = localidades.map((l) => ({
    url: `${URL_BASE}/${l.slug}/farmacias-de-turno`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const, // Cambia diariamente porque los turnos rotan
    priority: 0.8,
  }));

  // 3. Retornar la página principal + las subpáginas dinámicas
  return [
    {
      url: URL_BASE,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0, // Prioridad máxima para la Home
    },
    {
      url: `${URL_BASE}/politica-privacidad`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3, 
    },
    ...rutasLocalidades,
  ];
}