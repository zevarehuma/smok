import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'M50 Dublin — Toll Payment',
  description: 'Pay your M50 Dublin toll online. Check tariffs, FAQs, and contact support.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[radial-gradient(60%_80%_at_10%_10%,#12203a_0%,#0b1221_55%)] text-slate-100">
        {children}
      </body>
    </html>
  )
}
