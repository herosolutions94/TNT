import type { Metadata } from 'next'
import './globals.css'
import { fetchSiteSettings } from '@/lib/api'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export async function generateMetadata(): Promise<Metadata> {
  const s = await fetchSiteSettings()
  return {
    title:       s?.site_name        ?? 'TNT Creator Program — Get Paid to Create',
    description: s?.site_meta_desc   ?? 'Join the TNT Creator Internship.',
    keywords:    s?.site_meta_keyword ?? undefined,
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetched once per request (cached 5 min via ISR in fetchSiteSettings).
  // Every page in the app automatically gets the live logo + footer data.
  const siteSettings = await fetchSiteSettings()

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar siteSettings={siteSettings} />
        {children}
        <Footer siteSettings={siteSettings} />
      </body>
    </html>
  )
}
