'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function NavbarGreen() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-300"
      style={{ 
        background: 'rgba(10, 10, 10, 0.7)', // Dark transparent background
        backdropFilter: 'blur(12px)', 
        borderBottom: '1px solid rgba(0, 255, 102, 0.1)' // Subtle green border
      }}>
      
      {/* Logo with White/Invert Filter for Dark Theme */}
      <Link href="/" className="font-display font-black text-2xl tracking-tight">
        <img 
          src="/images/logo.png" 
          alt="TNT" 
          width={100} 
          height={100} 
          style={{ 
            borderRadius: '8px', 
            filter: 'brightness(0) invert(1)' // Makes the logo pure white to stand out on black
          }} 
        />
      </Link>

      {/* Nav Links - Cream/Off-white with Green Hover */}
      <div className="hidden md:flex items-center gap-8 text-sm font-bold" style={{ color: 'rgba(245, 240, 232, 0.6)' }}>
        {['the-job', 'interns', 'why-tnt', 'product', 'coaches', 'referrals'].map((item) => (
          <a 
            key={item} 
            href={`#${item}`} 
            className="hover:text-[#00FF66] transition-colors"
          >
            {item.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </a>
        ))}
      </div>

      {/* Button - Electric Green */}
      <Link href="/apply"
        className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,102,0.4)]"
        style={{ background: '#00FF66', color: '#000' }}>
        Apply Now →
      </Link>

      {/* Mobile Burger - Green */}
      <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <span className={`block w-6 h-0.5 transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} style={{ background: '#00FF66' }} />
        <span className={`block w-6 h-0.5 transition-all ${open ? 'opacity-0' : ''}`} style={{ background: '#00FF66' }} />
        <span className={`block w-6 h-0.5 transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} style={{ background: '#00FF66' }} />
      </button>

      {/* Mobile Menu - Dark Theme */}
      {open && (
        <div className="absolute top-full left-0 right-0 flex flex-col items-center gap-5 py-8 md:hidden shadow-2xl"
          style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(0, 255, 102, 0.2)' }}>
          {['the-job','interns','why-tnt','product','coaches','referrals'].map(id => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}
              className="capitalize text-sm font-bold" style={{ color: 'rgba(245, 240, 232, 0.8)' }}>
              {id.replace('-', ' ')}
            </a>
          ))}
          {/* Mobile CTA Button - Green */}
          <Link href="/apply" onClick={() => setOpen(false)}
            className="mt-2 px-8 py-3 rounded-full text-sm font-bold"
            style={{ background: '#00FF66', color: '#000' }}>
            Apply Now
          </Link>
        </div>
      )}
    </nav>
  )
}