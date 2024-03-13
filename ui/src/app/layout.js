import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: 'ATM | FS | EENRIQUEZ CODING CHALLENGE',
  description: 'coding challenge ATM',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>
        <Header />
        {/* NAVBAR */}
        {/* <NavBar className="my-4" /> */}

        {/* SEARCHBOX */}
        <div className='px-8 max-w-6xl 2xl:max-w-full mx-auto my-2'>
          {children}
        </div>

        {/* FOOTER */}
      </Providers>
      </body>
    </html>
  )
}
