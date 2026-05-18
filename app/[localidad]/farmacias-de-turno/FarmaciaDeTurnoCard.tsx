'use client';

import { useState } from 'react';

// Definimos los tipos para las props del componente
interface Farmacia {
  nombre: string;
  direccion: string;
  telefono: string | null;
}

interface Props {
  farmacia: Farmacia;
  fecha: Date;
}

// Icono de Copiar
const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
    <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
    <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h6a2 2 0 00-2-2H5z" />
  </svg>
);

// Icono de Check (para feedback)
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export default function FarmaciaDeTurnoCard({ farmacia, fecha }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `
Farmacia de turno: ${farmacia.nombre}
Dirección: ${farmacia.direccion}
Teléfono: ${farmacia.telefono || 'No disponible'}
    `.trim();
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="flex items-center gap-4 mb-4 text-left w-full">
      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
        <svg className="w-8 h-8 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v12m6-6H6"></path>
        </svg>
      </div>
      <div className="flex-grow">
        <span className="text-[13px] font-bold text-[#2ecc71] uppercase tracking-[0.2em] block mb-0.5">
          {fecha.toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
        <h2 className="text-3xl font-extrabold text-[#0f172a] leading-none">
          {farmacia.nombre}
        </h2>
      </div>
      <button
        onClick={handleCopy}
        aria-label="Copiar información de la farmacia"
        className="text-slate-500 hover:text-green-600 transition-colors p-2"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  );
}
