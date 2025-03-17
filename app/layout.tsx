import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/navbar'
import './globals.css'
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ML Engineer Portfolio',
  description: 'Portfolio of an aspiring ML engineer',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            <main>{children}</main>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}



import './globals.css'