'use client'
import { ThemeProvider } from 'next-themes'

export default function providers({children}) {
  return (
    <ThemeProvider enableSystem attribute='class'>
      <div className='bg-cyan-950 text-slate-300 transition-colors duration-700 max-h-screen overflow-scroll h-screen'>
        {children}
      </div>
    </ThemeProvider>
  )
}
