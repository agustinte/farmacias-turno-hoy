'use client';

interface Farmacia {
  nombre: string;
  direccion: string;
  telefono: string | null;
}

interface Props {
  farmacia: Farmacia;
  fecha: Date;
}

export default function FarmaciaDeTurnoCard({ farmacia, fecha }: Props) {
  return (
    <div className="mb-3 w-full text-left">
      <span className="text-[13px] font-bold text-[#2ecc71] uppercase tracking-[0.22em] block mb-1">
        {fecha.toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </span>
      <h2
        className="text-[clamp(1.76rem,3.2vw,2.72rem)] font-bold text-[#111827] leading-[0.95] tracking-[-0.03em]"
        style={{ fontFamily: 'var(--font-roboto), Arial, sans-serif' }}
      >
        {farmacia.nombre}
      </h2>
    </div>
  );
}
