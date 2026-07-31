import LocalidadesList from '@/components/LocalidadesList';
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

  const serializedLocalidades = localidades.map((l) => ({
    id: String(l.id),
    nombre: l.nombre,
    slug: l.slug,
  }));

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
        <LocalidadesList localidades={serializedLocalidades} />
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