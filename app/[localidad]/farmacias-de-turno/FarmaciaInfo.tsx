'use client';

// Definimos los tipos para las props del componente
interface Farmacia {
  nombre: string;
  direccion: string;
  telefono: string | null;
}

interface Props {
  farmacia: Farmacia;
  nombreLocalidad: string;
}

export default function FarmaciaInfo({ farmacia, nombreLocalidad }: Props) {
  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-left w-full">
            {/* DIRECCIÓN */}
            <div className="bg-[#f8fafc] p-5 rounded-2xl">
                <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dirección</h3>
                <div className="flex items-center gap-2">
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            farmacia.direccion + ', ' + nombreLocalidad
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Abrir en Google Maps"
                        className="text-slate-500 hover:text-green-600 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
                </div>
                <p className="text-base font-semibold text-slate-700">{farmacia.direccion}</p>
            </div>

            {/* TELÉFONO */}
            <div className="bg-[#f8fafc] p-5 rounded-2xl flex flex-col justify-center">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Teléfono</span>
                    <div className="flex items-center gap-2">
                        {farmacia.telefono && farmacia.telefono !== '-' && (
                        <a href={`tel:${farmacia.telefono.replace(/\s/g, '')}`} aria-label="Llamar por teléfono" className="text-slate-500 hover:text-green-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.76a11.032 11.032 0 006.364 6.364l.76-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                        </a>
                        )}
                    </div>
                </div>
                <p className="text-[17px] font-extrabold text-[#2ecc71]">
                {farmacia.telefono && farmacia.telefono !== '-' ? farmacia.telefono : 'No disponible'}
                </p>
            </div>
        </div>
            {/* Mapa Dinámico basado en Dirección */}
            {farmacia.direccion && (
                <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-inner mt-4">
                <div className="relative h-56 sm:pb-[60%] sm:h-0">
                    <iframe
                    className="absolute top-0 left-0 w-full h-full border-0"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        `${farmacia.nombre}, ${farmacia.direccion}, ${nombreLocalidad}, Argentina`
                    )}&hl=es&z=16&output=embed`}
                    allowFullScreen
                    loading="lazy"
                    ></iframe>
                </div>
                </div>
            )}
    </>
  );
}
