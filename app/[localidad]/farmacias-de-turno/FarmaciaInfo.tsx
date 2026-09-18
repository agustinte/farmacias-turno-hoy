'use client';

import ShareButton from '@/components/ShareButton';

interface Farmacia {
  nombre: string;
  direccion: string;
  telefono: string | null;
}

interface Props {
  farmacia: Farmacia;
  nombreLocalidad: string;
}

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
    <path d="M12 21s6-5.686 6-11A6 6 0 106 10c0 5.314 6 11 6 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="10" r="2.5" fill="currentColor" stroke="none"/>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.76a11.032 11.032 0 006.364 6.364l.76-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

export default function FarmaciaInfo({ farmacia, nombreLocalidad }: Props) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    farmacia.direccion + ', ' + nombreLocalidad
  )}`;

  const phoneAvailable = Boolean(farmacia.telefono && farmacia.telefono !== '-');
  const phoneHref = phoneAvailable ? `tel:${farmacia.telefono!.replace(/\s/g, '')}` : undefined;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const textToShare = `Farmacia de turno: ${farmacia.nombre}\nDirección: ${farmacia.direccion}\nTeléfono: ${farmacia.telefono || 'No disponible'}`;

  const handleOpenMap = () => {
    if (typeof window !== 'undefined') {
      window.open(mapsUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCall = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!phoneHref) {
      event.preventDefault();
      return;
    }

    const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);
    if (!isMobile) {
      event.preventDefault();
      return;
    }
  };

  return (
    <>
      <div className="mt-3 space-y-3 text-left">
        <div className="flex items-center gap-3 text-[#111827]">
          <div className="text-[#111827]">
            <MapPinIcon />
          </div>
          <p className="text-[1.05rem] font-medium leading-snug" style={{ fontFamily: 'var(--font-roboto), Arial, sans-serif' }}>
            {farmacia.direccion}
          </p>
        </div>

        <div className="flex items-center gap-3 text-[#111827]">
          <div className="text-[#111827]">
            <PhoneIcon />
          </div>
          <p className="text-[1.05rem] font-medium leading-snug" style={{ fontFamily: 'var(--font-roboto), Arial, sans-serif' }}>
            {phoneAvailable ? farmacia.telefono : 'No disponible'}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <a
          href={phoneHref || '#'}
          onClick={handleCall}
          aria-disabled={!phoneAvailable}
          className={`inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl px-2 py-3 text-[0.82rem] font-bold shadow-sm transition sm:text-[0.9rem] ${
            phoneAvailable
              ? 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
              : 'pointer-events-none border border-slate-200 bg-slate-100 text-slate-400'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.76a11.032 11.032 0 006.364 6.364l.76-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span className="truncate">Llamar</span>
        </a>

        <ShareButton
          shareText={textToShare}
          shareUrl={shareUrl}
          title={`Farmacia de turno - ${farmacia.nombre}`}
          ariaLabel="Compartir información de la farmacia"
          className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl border border-emerald-600 bg-[#2ecc71] px-2 py-3 text-[0.82rem] font-bold text-white shadow-sm transition hover:bg-[#29b866] sm:text-[0.9rem]"
          label="Compartir"
        />
      </div>

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
            />
          </div>
        </div>
      )}
    </>
  );
}
