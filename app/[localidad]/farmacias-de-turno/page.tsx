import { PrismaClient } from '@prisma/client';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FarmaciaInfo from './FarmaciaInfo';
import FarmaciaDeTurnoCard from './FarmaciaDeTurnoCard';
import FarmaciasGoogleMap from './FarmaciasGoogleMap';

const prisma = new PrismaClient();

interface Props {
  params: Promise<{ localidad: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { localidad } = await params;
  const nombre = localidad.replace(/-/g, ' ');
  const nombreFormateado = nombre.charAt(0).toUpperCase() + nombre.slice(1);

  return {
    title: `Farmacia de Turno Hoy en ${nombreFormateado} | Horarios y Dirección`,
    description: `Consulta la farmacia que está de turno hoy en ${nombreFormateado}.`,
  };
}

export default async function LocalidadPage({ params }: Props) {
  const { localidad } = await params;
  const ahora = new Date();

  const localidadData = await prisma.localidad.findUnique({
    where: { slug: localidad }
  });

  if (!localidadData) notFound();

  const farmaciasHoy = await prisma.farmacia.findMany({
    where: {
      localidadId: localidadData.id,
      turnos: {
        some: {
          fechaInicio: { lte: ahora },
          fechaFin: { gte: ahora }
        }
      }
    }
  });

  const farmaciaHoy = farmaciasHoy.length > 0 ? farmaciasHoy[0] : null;

  const proximosTurnos = await prisma.turno.findMany({
    where: {
      farmacia: { localidadId: localidadData.id },
      fechaInicio: { gt: ahora }
    },
    include: { farmacia: true },
    orderBy: { fechaInicio: 'asc' },
    take: 3
  });

  const nombreLocalidad = localidadData.nombre;

  return (
    <main className="w-full max-w-4xl mx-auto p-4 sm:p-8 font-sans text-slate-900 bg-white min-h-screen">

      {/* HEADER DE LA PÁGINA */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-1">
          Farmacia de turno hoy en {nombreLocalidad}
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Actualizado el {ahora.toLocaleDateString('es-AR')}
        </p>
      </header>

      {/* SECCIÓN INFORMATIVA (img1) */}
      <section className="mb-8 p-5 bg-[#f0fff4] border border-[#c6f6d5] rounded-2xl flex items-start shadow-sm">
        <div className="mr-4 mt-0.5">
          <svg className="w-6 h-6 text-[#38a169]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p className="text-[14.5px] text-slate-700 leading-relaxed italic">
          Servicio rápido de consulta de <strong className="text-slate-800">Farmacias de Turno en {nombreLocalidad}</strong>. Encontrará en tiempo real cuál es la <strong className="text-slate-800">Farmacia de Guardia</strong> con servicio <strong className="text-slate-800">turno 24 horas</strong>. Consulte la dirección, el teléfono y la ubicación exacta para recibir atención farmacéutica inmediata.
        </p>
      </section>

      {/* CARD PRINCIPAL */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border-t-4 border-[#2ecc71] mb-4 min-h-[200px] flex flex-col justify-center">
        {farmaciasHoy.length > 1 ? (
          <FarmaciasGoogleMap farmacias={farmaciasHoy} nombreLocalidad={nombreLocalidad} />
        ) : farmaciaHoy ? (
          <>
            <FarmaciaDeTurnoCard farmacia={farmaciaHoy} fecha={ahora} />
            <FarmaciaInfo farmacia={farmaciaHoy} nombreLocalidad={nombreLocalidad} />
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <p className="text-slate-500 font-bold text-lg">No hay turnos cargados para hoy</p>
            <p className="text-slate-400 text-sm mt-1">Por favor, consulte más tarde o verifique los próximos turnos debajo.</p>
          </div>
        )}
      </div>

      <div className="bg-[#f8fafc] border-l-4 border-slate-300 p-5 rounded-r-2xl mb-6 text-left">
        <p className="text-[14px] text-slate-600 leading-relaxed italic">
          * El turno es de <strong className="text-slate-800">24 horas</strong> y rige <strong className="text-slate-800">a partir de las 8:00 AM</strong> del día indicado hasta las 8:00 AM del día siguiente.
        </p>
      </div>

      {/* SECCIÓN PRÓXIMOS TURNOS */}
      {proximosTurnos.length > 0 && (
        <section className="mt-12 text-left">
          <h3 className="text-xl font-bold text-slate-800 mb-5 px-1 flex items-center">
            <svg className="w-5 h-5 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-4 4V3m-6 4h12M6 11h12M6 15h12M6 19h12"></path>
            </svg>
            Próximos Turnos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {proximosTurnos.map((t) => (
              <div key={t.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[10px] font-bold text-green-500 uppercase tracking-wider mb-2">
                  {new Date(t.fechaInicio).toLocaleDateString('es-AR', { day: 'numeric', month: 'long' })}
                </p>
                <p className="font-extrabold text-slate-800 text-sm truncate uppercase">{t.farmacia.nombre}</p>
                <p className="text-xs text-slate-500 truncate mt-1">{t.farmacia.direccion}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECCIÓN HORARIOS DE ATENCIÓN NORMAL */}
      <section className="mt-12 p-6 bg-[#f0f7ff] border border-[#dbeafe] rounded-2xl shadow-sm text-left">
        <h3 className="text-xl font-bold text-[#1e40af] mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Horarios de Atención Normal (Diurna)
        </h3>
        <div className="space-y-4">
          <p className="text-[15px] text-slate-700 font-medium">
            Todas las Farmacias en {nombreLocalidad} atienden en los siguientes horarios:
          </p>
          <div className="space-y-2">
            <p className="text-[15px] text-slate-800">
              <span className="font-extrabold">Lunes a Viernes:</span> 8:00 a 12:30 y de 16:00 a 19:30
            </p>
            <p className="text-[15px] text-slate-800">
              <span className="font-extrabold">Sábados:</span> 8:30 a 12:30
            </p>
          </div>
          <p className="text-[13.5px] text-[#3b82f6] italic pt-2 leading-relaxed">
            Fuera de estos horarios y los domingos, solo la Farmacia de Turno indicada arriba ofrece atención de guardia 24 hs.
          </p>
        </div>
      </section>

      <footer className="mt-16 text-center text-[12px] text-slate-400 pb-10 uppercase tracking-widest">
        © {ahora.getFullYear()} Farmacias de turno {nombreLocalidad}
      </footer>
    </main>
  );
}