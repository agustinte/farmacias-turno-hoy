"use client";

import React, { useState } from 'react';

interface Farmacia {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string | null;
}

interface Props {
  farmacias: Farmacia[];
  nombreLocalidad: string;
}

export default function FarmaciasGoogleMap({ farmacias, nombreLocalidad }: Props) {
  const [selected, setSelected] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (e: React.MouseEvent, f: Farmacia, index: number) => {
    e.stopPropagation();
    const text = `${f.nombre}\n${f.direccion}\nTel: ${f.telefono || 'No disponible'}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch (err) {
      console.warn('Copy failed', err);
    }
  };

  const handleCall = (e: React.MouseEvent, telefono: string | null) => {
    e.stopPropagation();
    if (!telefono) return;
    const sanitized = telefono.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
    window.location.href = `tel:${sanitized}`;
  };

  const selectedFarm = farmacias[selected];
  const addressForMap = selectedFarm ? `${selectedFarm.direccion}, ${nombreLocalidad}, Argentina` : '';
  const mapSrc = selectedFarm
    ? `https://www.google.com/maps?q=${encodeURIComponent(addressForMap)}&output=embed`
    : undefined;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="md:col-span-2 overflow-auto max-h-[60vh] space-y-3 min-w-[200px]">
        {farmacias.map((f, i) => (
          <div
            key={f.id}
            onClick={() => setSelected(i)}
            className={`cursor-pointer bg-white p-4 rounded-2xl border ${i === selected ? 'border-2 border-[#2ecc71]' : 'border-slate-100'} shadow-sm hover:shadow-md transition-shadow flex items-center justify-between gap-3`}
          >
            <div className="flex flex-col w-full pr-3">
              <p className="font-extrabold text-slate-800">{f.nombre}</p>
              <p className="text-xs text-slate-500 mt-1 truncate">{f.direccion}</p>
              <p className="text-xs text-[#2ecc71] mt-1 font-bold">{f.telefono || 'No disponible'}</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              <button onClick={(e) => handleCopy(e, f, i)} className="text-slate-500 hover:text-green-600 transition-colors p-2" aria-label="Copiar">
                {copiedIndex === i ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                    <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h6a2 2 0 00-2-2H5z" />
                  </svg>
                )}
              </button>

              <button onClick={(e) => handleCall(e, f.telefono)} className={`text-slate-500 hover:text-green-600 transition-colors p-2 ${!f.telefono ? 'opacity-40 pointer-events-none' : ''}`} aria-label="Llamar">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.76a11.032 11.032 0 006.364 6.364l.76-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="md:col-span-3 h-72 md:h-[60vh] rounded-2xl overflow-hidden border border-slate-100">
        {mapSrc ? (
          <iframe
            title="Mapa de la farmacia seleccionada"
            src={mapSrc}
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-500">Seleccioná una farmacia para ver su ubicación</p>
          </div>
        )}
      </div>
    </div>
  );
}
