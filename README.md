This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Data base explorer
npx prisma studio

Para cargar datos usar archivo seed.ts
npx prisma db seed

npx prisma migrate reset --> Reset datos

## **Arquitectura del proyecto**

- **Stack:** Next.js (App Router) con TypeScript, React, Prisma (ORM), y una base de datos relacional (configurada vía `DATABASE_URL`).
- **Estructura principal:**
	- **app:** Rutas y componentes de la aplicación. Entradas principales: [app/layout.tsx](app/layout.tsx) y [app/page.tsx](app/page.tsx). Rutas específicas para búsquedas por localidad en [app/[localidad]/farmacias-de-turno/page.tsx](app/[localidad]/farmacias-de-turno/page.tsx).
	- **API:** Endpoints y lógica del lado servidor en [app/api/route.ts](app/api/route.ts) y la carpeta [app/api/turnos](app/api/turnos).
	- **Componentes específicos:** Componentes reutilizables para las vistas de farmacias en [app/[localidad]/farmacias-de-turno/FarmaciaDeTurnoCard.tsx](app/[localidad]/farmacias-de-turno/FarmaciaDeTurnoCard.tsx), [app/[localidad]/farmacias-de-turno/FarmaciaInfo.tsx](app/[localidad]/farmacias-de-turno/FarmaciaInfo.tsx) y el mapa [app/[localidad]/farmacias-de-turno/FarmaciasGoogleMap.tsx](app/[localidad]/farmacias-de-turno/FarmaciasGoogleMap.tsx).
	- **prisma:** Esquema, migraciones y seed: [prisma/schema.prisma](prisma/schema.prisma) y [prisma/seed.ts](prisma/seed.ts). Migraciones en la carpeta [prisma/migrations](prisma/migrations).
	- **public:** Recursos estáticos (imágenes, favicon, etc.).
	- **Configuración del proyecto:** [package.json](package.json), [next.config.ts](next.config.ts), [tsconfig.json](tsconfig.json), y [eslint.config.mjs](eslint.config.mjs).

- **Flujo de datos:** Las páginas (Server/Client Components) consultan la capa de datos mediante llamadas a la base de datos a través de Prisma o por medio de los endpoints en `app/api`. Prisma gestiona la conexión con la base de datos usando la variable de entorno `DATABASE_URL`.

- **Persistencia y migraciones:** Usa Prisma Migrate para versionar el esquema y `prisma/seed.ts` para poblar datos iniciales. Para explorar la BD en desarrollo usar `npx prisma studio`.

- **Despliegue:** Orientado a Vercel; configura variables de entorno (p. ej. `DATABASE_URL`) en el panel de despliegue. Ver la sección "Deploy on Vercel" más abajo.

Si quieres, puedo añadir un diagrama (Mermaid) con la arquitectura, o traducir esta sección al inglés.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
