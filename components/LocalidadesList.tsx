"use client";

import Link from 'next/link';
import { useMemo, useState } from 'react';

type Localidad = {
  id: string;
  nombre: string;
  slug?: string | null;
};

export default function LocalidadesList({ localidades }: { localidades: Localidad[] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => localidades.filter((l) => l.nombre.toLowerCase().includes(query.toLowerCase())),
    [localidades, query]
  );

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="border-b border-gray-100 px-6 py-5 bg-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-[#0F2343]">Seleccioná tu localidad</h2>

            <p className="text-sm text-gray-500 mt-1">
              Accedé al listado actualizado de farmacias disponibles.
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-2 w-full md:w-auto">
            <div className="flex items-center w-full md:w-auto gap-2">
              <input
                aria-label="Filtrar localidad"
                type="text"
                placeholder="Filtrar localidad..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 md:w-52 px-3 py-2 border rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200"
              />

              <button
                type="button"
                onClick={() => setQuery('')}
                disabled={!query}
                aria-label="Borrar filtro"
                title="Borrar filtro"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${!query ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-300'}`}
              >
                Borrar
              </button>
            </div>

            <div className="text-sm font-medium text-gray-500">{filtered.length} localidades disponibles</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((loc) => (
            <Link
              key={loc.id}
              href={`/${loc.slug}/farmacias-de-turno`}
              className="group rounded-2xl border border-gray-200 bg-white p-5 hover:border-green-300 hover:bg-green-50 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-[#0F2343] text-lg group-hover:text-green-700">{loc.nombre}</h3>

                  <p className="text-sm text-gray-500 mt-1">Ver farmacias de turno</p>
                </div>

                <div className="text-green-600 font-semibold text-sm whitespace-nowrap">Ver →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
