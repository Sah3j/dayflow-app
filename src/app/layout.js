import './globals.css'
import { Inter } from 'next/font/google'
import Providers from '../components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dayflow',
  description: 'Routine building app with emojis',
  icons: {
    icon: '/icon.png',
  },
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
