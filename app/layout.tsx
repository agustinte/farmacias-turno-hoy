import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import GoogleAnalytics from './components/GoogleAnalytics'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
   title: {
    default: "Farmacias de Turno Hoy",
    template: "%s | Farmacias de Turno Hoy",
  },

  description:
    "Consultá las farmacias de turno de tu localidad. Información actualizada diariamente con direcciones, teléfonos y ubicación.",

  keywords: [
    "farmacias de turno",
    "farmacia de turno",
    "farmacias abiertas",
    "farmacias 24 horas",
    "turnos farmacia",
  ],
  verification: {
    google: "xtJxcjfTFIs5k9wq7ePs_MwASHveuU86LUtvw4TIUoY",
  },  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
	    <GoogleAnalytics />
		{children}
        <footer className="mt-auto bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-600 flex items-center justify-between">
            <div>
              <Link href="/" className="font-semibold text-[#0F2343] hover:text-green-700">
                Farmacias de Turno
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/politica-privacidad" className="hover:text-green-700">
                Política de Privacidad
              </Link>

              <Link href="/publicidad" className="inline-flex items-center gap-2 hover:text-green-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="m3 11 18-5v12L3 13v-2Z" />
                  <path d="M11.6 16.7 13 21H7l1.8-6.2" />
                </svg>

                <span>Anunciar mi Farmacia</span>
              </Link>

              <a
                href="mailto:publicidad.farmacias.turno@gmail.com?subject=Contacto%20sitio%20Farmacias%20de%20Turno"
                className="inline-flex items-center gap-2 hover:text-green-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M3 8l7.5 5L18 8" />
                  <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
                </svg>

                <span>Contacto</span>
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
