import React from 'react';

export const metadata = {
  title: 'Política de Privacidad',
  robots: {
    index: false,
    follow: true,
  },
};

export default function PoliticaPrivacidad() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-10">
        
        {/* Encabezado */}
        <div className="border-b border-slate-100 pb-6 mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Política de Privacidad
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Última actualización: Mayo 2026
          </p>
        </div>

        {/* Introducción */}
        <p className="text-slate-600 leading-relaxed mb-8">
          Bienvenido a nuestra plataforma de consulta de <strong>Farmacias de Turno</strong>. 
          Nos tomamos muy en serio la privacidad de nuestros usuarios. A continuación, detallamos qué 
          información recopilamos, cómo la utilizamos y qué medidas tomamos para protegerla al utilizar nuestro servicio.
        </p>

        {/* Secciones */}
        <div className="space-y-8">
          
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">
              1. Información que Recopilamos
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 leading-relaxed">
              <li>
                <strong className="text-slate-700">Datos de ubicación:</strong> Para mostrarte las farmacias más cercanas, la aplicación puede solicitar acceso a la ubicación en tiempo real de tu dispositivo. Esta autorización es completamente opcional y revocable por el usuario.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">
              2. Uso de la Información
            </h2>
            <p className="text-slate-600 leading-relaxed mb-2">
              La información recolectada se utiliza exclusivamente para:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 leading-relaxed">
              <li>Proporcionar y optimizar el servicio de visualización de farmacias de guardia.</li>
              <li>Interpretar la ubicación (en caso de ser otorgada por el usuario) únicamente dentro de la sesión activa para centrar el mapa, sin almacenar tu historial de coordenadas en nuestros servidores.</li>
              <li>Mejorar la interfaz y el rendimiento técnico de la plataforma.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">
              3. Servicios de Terceros
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Nuestra aplicación integra herramientas de terceros para mejorar la experiencia de usuario. 
              Específicamente, utilizamos el servicio de mapas incrustados de <strong>Google Maps</strong> para 
              facilitar la visualización de las direcciones de las farmacias. El uso de esta funcionalidad está sujeto 
              a los Términos de Servicio y la Política de Privacidad de Google.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">
              4. Cookies
            </h2>
            <p className="text-slate-600 leading-relaxed">
              NO Utilizamos cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">
              5. Almacenamiento y Seguridad
            </h2>
            <p className="text-slate-600 leading-relaxed">
              No solicitamos ni almacenamos datos personales sensibles (como nombres, correos electrónicos, contraseñas 
               o registros financieros de los usuarios que consultan). La base de datos del sistema solo contiene 
              información de carácter público correspondiente a los comercios (farmacias) y sus cronogramas de guardia rotativos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">
              6. Cambios en esta Política
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Cualquier cambio 
              será publicado de inmediato en esta misma sección con su respectiva fecha de actualización modificada en el encabezado.
            </p>
          </section>

          <section className="border-t border-slate-100 pt-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">
              7. Contacto
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Si tenés alguna duda o consulta respecto a estos términos, podés ponerte en contacto con nosotros a través 
              de los canales de soporte o administración de la aplicación.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}