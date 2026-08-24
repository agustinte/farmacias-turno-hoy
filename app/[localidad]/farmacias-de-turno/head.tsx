type Props = {
  params: { localidad: string };
};

function titleCase(s: string) {
  return s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Head({ params }: Props) {
  const { localidad } = params;
  const nombreLocalidad = titleCase(localidad || '');

  const faqJson = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `¿Cómo saber qué farmacia de turno está abierta hoy en ${nombreLocalidad}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `El servicio de guardia de las farmacias cambia diariamente. En nuestra plataforma actualizamos de forma continua el listado de farmacias de turno hoy en ${nombreLocalidad}, detallando la dirección exacta, el teléfono de contacto y el mapa interactivo para atención las 24 horas.`,
        },
      },
      {
        '@type': 'Question',
        name: `¿Cuáles son los horarios de las farmacias de guardia en ${nombreLocalidad}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Las farmacias de turno cubren un horario extendido obligatorio que asegura la dispensación de medicamentos fuera del horario comercial habitual durante la noche, fines de semana y feriados.`,
        },
      },
      {
        '@type': 'Question',
        name: `¿Qué farmacias están abiertas hoy fuera del horario comercial?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Además del turno de guardia obligatorio de 24 horas, nuestra base de datos centralizada muestra la ubicación exacta, dirección y teléfono de los establecimientos operativos en tiempo real para evitar traslados innecesarios.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
    </>
  );
}
