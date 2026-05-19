import Link from 'next/link';
import { prisma } from '@/prisma';

//import { PrismaClient } from '@prisma/client';
//const prisma = new PrismaClient();

export const metadata = {
  title: 'Farmacias de turno en Argentina',
  description:
    'Consultá farmacias de turno actualizadas por localidad en distintas provincias de Argentina.',
};

export default async function Home() {
  const localidades = await prisma.localidad.findMany({
    orderBy: { nombre: 'asc' },
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="bg-[#0F2343] border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
              Farmacias de turno en Argentina
            </h1>

            <p className="mt-5 text-lg text-blue-100 leading-relaxed">
              Consultá farmacias de turno actualizadas por localidad en distintas
              provincias del país.
            </p>
          </div>
        </div>
      </section>

      {/* INFO BOX */}
      <section className="max-w-6xl mx-auto px-6 pt-8">
        <div className="bg-green-50 border border-green-200 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 text-xl font-bold">+</span>
            </div>

            <div>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                Servicio rápido de consulta de{' '}
                <strong>Farmacias de Turno</strong>. Encontrá información
                actualizada por localidad con dirección y teléfono para recibir
                atención farmacéutica de manera rápida y sencilla.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LOCALIDADES */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          {/* HEADER */}
          <div className="border-b border-gray-100 px-6 py-5 bg-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-[#0F2343]">
                  Seleccioná tu localidad
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Accedé al listado actualizado de farmacias disponibles.
                </p>
              </div>

              <div className="text-sm font-medium text-gray-500">
                {localidades.length} localidades disponibles
              </div>
            </div>
          </div>

          {/* GRID */}
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {localidades.map((loc) => (
                <Link
                  key={loc.id}
                  href={`/${loc.slug}/farmacias-de-turno`}
                  className="
                    group
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-5
                    hover:border-green-300
                    hover:bg-green-50
                    hover:shadow-md
                    transition-all
                  "
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-[#0F2343] text-lg group-hover:text-green-700">
                        {loc.nombre}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Ver farmacias de turno
                      </p>
                    </div>

                    <div className="text-green-600 font-semibold text-sm whitespace-nowrap">
                      Ver →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO SEO */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[#0F2343] mb-4">
            Información actualizada de farmacias de turno
          </h2>

          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Este sitio permite consultar farmacias de turno por localidad de
              manera rápida y organizada.
            </p>

            <p>
              La información se obtiene desde colegios farmacéuticos,
              municipios y otras fuentes públicas disponibles.
            </p>

            <p>
              El sistema incorpora progresivamente nuevas localidades y
              provincias para ampliar la cobertura en todo el país.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[#0F2343] mb-6">
            Preguntas frecuentes
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-[#0F2343] mb-2">
                ¿Cómo consultar farmacias de turno?
              </h3>

              <p className="text-gray-600">
                Seleccioná tu localidad para acceder al listado actualizado de
                farmacias disponibles actualmente.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#0F2343] mb-2">
                ¿Cada cuánto se actualizan los datos?
              </h3>

              <p className="text-gray-600">
                La información se actualiza periódicamente según las fuentes
                oficiales disponibles para cada localidad.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#0F2343] mb-2">
                ¿Qué localidades están disponibles?
              </h3>

              <p className="text-gray-600">
                El sitio incorpora progresivamente localidades de distintas
                provincias de Argentina.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}