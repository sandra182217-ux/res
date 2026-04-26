import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({ 
  subsets: ["latin"],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Floripa Bar | Bar, Restaurante e Frutos do Mar - Tubarão SC',
  description: 'O melhor bar e restaurante de frutos do mar em Tubarão, SC. Camarão à milanesa, tilápia, drinks, cervejas geladas e muito mais. Ambiente familiar e aconchegante.',
  keywords: 'frutos do mar, camarão, bar, restaurante, Tubarão, SC, drinks, cerveja, tilápia',
  openGraph: {
    title: 'Floripa Bar | Bar, Restaurante e Frutos do Mar',
    description: 'O melhor bar e restaurante de frutos do mar em Tubarão, SC.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export const viewport = {
  themeColor: '#1a1410',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="bg-background">
      <body className={`${playfair.variable} ${lato.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
