import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN ? `https://${process.env.NEXT_PUBLIC_DOMAIN}` : 'https://zinergiamarketing.com'),
  title: 'Zinergia | Marketing Digital - Diseño, Video y Web',
  description: 'Impulsa tu negocio con creatividad + IA. Diseño gráfico, edición de video profesional, páginas web, manejo de redes sociales y pautas publicitarias. Resultados en 30 días.',
  keywords: 'marketing digital, diseño gráfico, edición de video, páginas web, manejo de redes sociales, pautas publicitarias, community management, branding, marketing digital Colombia, agencia de marketing digital, PyMEs Colombia',
  authors: [{ name: 'Zinergia Marketing' }],
  openGraph: {
    title: 'Zinergia | Marketing Digital',
    description: 'Impulsa tu negocio con creatividad + IA. Diseño gráfico, edición de video y páginas web que convierten.',
    url: 'https://zinergiamarketing.com',
    siteName: 'Zinergia Marketing',
    locale: 'es_CO',
    type: 'website',
    images: [
      {
        url: '/images/general/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zinergia Marketing - Impulsa tu Negocio con Creatividad + IA',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zinergia | Marketing Digital',
    description: 'Impulsa tu negocio con creatividad + IA',
    images: ['/images/general/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://zinergiamarketing.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  )
}

