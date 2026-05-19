import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const URL_BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://tu-web.com';

  return {
    rules: {
      userAgent: '*', // Aplica las reglas para TODOS los buscadores (Google, Bing, Yahoo, etc.)
      allow: '/',     // Permite que rastreen todo el sitio por defecto
      disallow: [
        '/api/',      // ❌ BLOQUEA tu ruta de la API (ej: /api?localidad=...) ya que no querés que Google indexe JSONs sueltos
        '/_next/',    // ❌ Bloquea archivos internos de configuración de Next.js
        '/static/',   // ❌ Bloquea estáticos crudos si los hubiera
      ],
    },
    sitemap: `${URL_BASE}/sitemap.xml`, // 🗺️ Le apunta el camino directo a tu sitemap dinámico
  };
}