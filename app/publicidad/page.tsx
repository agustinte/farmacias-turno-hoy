import React from 'react';

export const metadata = {
  title: 'Publicidad',
  robots: {
    index: false,
    follow: true,
  },
};

const MAIL_HREF =
  'mailto:publicidad.farmacias.turno@gmail.com?subject=Solicitud%20Plan%20Premium%20-%20Farmacias%20de%20Turno&body=Hola!%20Deseo%20obtener%20informaci%C3%B3n%20para%20destacar%20mi%20farmacia.%0A%0ANombre%20de%20la%20Farmacia:%20%0ALocalidad:%20%0ATel%C3%A9fono%20de%20contacto:%20';

function PlanCheck({ included, label }: { included: boolean; label?: string }) {
  return included ? (
    <span className="text-emerald-600 font-semibold">✔{label ? ` ${label}` : ''}</span>
  ) : (
    <span className="text-slate-400" style={{ color: 'red' }}>✖</span>
  );
}

export default function Publicidad() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-10">

        {/* Encabezado */}
        <div className="border-b border-slate-100 pb-6 mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            📈 Multiplicá las ventas de tu farmacia cuando estás de turno
          </h1>
        </div>

        {/* Introducción */}
        <p className="text-slate-600 leading-relaxed mb-4">
          Cada mes, miles de vecinos de la Provincia de Buenos Aires buscan con urgencia qué farmacia
          está abierta hoy desde sus celulares. Entran con una necesidad de compra inmediata. Si tu
          farmacia aparece oculta o sin canales de contacto rápidos, estás perdiendo clientes frente a
          tu competencia.
        </p>
        <p className="text-slate-600 leading-relaxed mb-8">
          En <strong>FarmaciasdeTurnoHoy.site</strong> centralizamos la información y conectamos a esos
          usuarios decididos a tu farmacia.
        </p>

        {/* Secciones */}
        <div className="space-y-8">

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">
              Elegí cómo querés que te encuentren tus clientes
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-3 pr-2 font-semibold text-slate-700">Beneficios incluidos</th>
                    <th className="py-3 px-2 font-semibold text-slate-700 text-center">Plan Básico</th>
                    <th className="py-3 pl-2 font-semibold text-slate-700 text-center">Plan Destacado Premium</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  <tr className="border-b border-slate-100">
                    <td className="py-3 pr-2">Presencia en el listado de tu localidad</td>
                    <td className="py-3 px-2 text-center"><PlanCheck included /></td>
                    <td className="py-3 pl-2 text-center"><PlanCheck included /></td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 pr-2">Dirección y teléfono verificados</td>
                    <td className="py-3 px-2 text-center"><PlanCheck included /></td>
                    <td className="py-3 pl-2 text-center"><PlanCheck included /></td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 pr-2">Ubicación en mapa dinámico</td>
                    <td className="py-3 px-2 text-center"><PlanCheck included /></td>
                    <td className="py-3 pl-2 text-center"><PlanCheck included /></td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 pr-2">Posicionamiento Prioritario (Aparecer primero en tu ciudad)</td>
                    <td className="py-3 px-2 text-center"><PlanCheck included={false} /></td>
                    <td className="py-3 pl-2 text-center"><PlanCheck included label="Destacado" /></td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 pr-2">Botón de enlace directo a tu WhatsApp</td>
                    <td className="py-3 px-2 text-center"><PlanCheck included={false} /></td>
                    <td className="py-3 pl-2 text-center"><PlanCheck included label="Activo" /></td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 pr-2">Módulo de Ofertas y Promociones del mes</td>
                    <td className="py-3 px-2 text-center"><PlanCheck included={false} /></td>
                    <td className="py-3 pl-2 text-center"><PlanCheck included label="Activo" /></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-2">Soporte técnico digital</td>
                    <td className="py-3 px-2 text-center"><PlanCheck included={false} /></td>
                    <td className="py-3 pl-2 text-center"><PlanCheck included label="Prioritario" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">
              Por qué sumarte al Plan Destacado Premium
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 leading-relaxed">
              <li>
                <strong className="text-slate-700">Contacto en un solo clic:</strong> Los clientes no
                tienen que agendar tu número. Te escriben directamente por WhatsApp para consultar
                stock o encargar medicamentos antes de ir al local.
              </li>
              <li>
                <strong className="text-slate-700">Capta compras de urgencia:</strong> Al estar en la
                cima del listado de tu localidad, tu marca es la primera opción visual para el usuario.
              </li>
              <li>
                <strong className="text-slate-700">Atrae clientes para productos complementarios:</strong>{' '}
                Usá el módulo de ofertas para promocionar perfumería, pañalera u ofertas estacionales
                mientras cubrís el turno.
              </li>
            </ul>
          </section>

          <section className="border-t border-slate-100 pt-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">
              Cómo activar tu espacio destacado
            </h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              El proceso es directo y personalizado:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-slate-600 leading-relaxed mb-6">
              <li>Hacé clic en el botón de abajo para enviarnos un correo.</li>
              <li>Indicanos el nombre de tu farmacia y la localidad.</li>
              <li>
                Te responderemos a la brevedad para coordinar los detalles, solicitarle el enlace de
                tu WhatsApp comercial y activar tu destacado en la plataforma.
              </li>
            </ol>
            <a
              href={MAIL_HREF}
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-3 transition-colors"
            >
              📩 Contactar Soporte Comercial por Email
            </a>
          </section>

        </div>
      </div>
    </main>
  );
}
