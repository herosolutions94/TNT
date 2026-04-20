'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function NavbarBlue() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-300"
      style={{ 
        background: 'rgba(255, 255, 255, 0.4)', // Transparent with light glass effect
        backdropFilter: 'blur(12px)', 
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)' 
      }}>
      
      {/* Logo with Black Filter */}
      <Link href="/" className="font-display font-black text-2xl tracking-tight">
        <img 
          src="/images/logo.png" 
          alt="TNT" 
          width={100} 
          height={100} 
          style={{ 
            borderRadius: '8px', 
            filter: 'brightness(0)' // Makes the logo pure black
          }} 
        />
      </Link>

      {/* Nav Links - Black/Grey */}
      <div className="hidden md:flex items-center gap-8 text-sm font-bold" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
        <a href="#the-job" className="hover:text-black transition-colors">The Job</a>
        <a href="#interns" className="hover:text-black transition-colors">Interns</a>
        <a href="#why-tnt" className="hover:text-black transition-colors">Why TNT?</a>
        <a href="#product" className="hover:text-black transition-colors">Product</a>
        <a href="#coaches" className="hover:text-black transition-colors">Coaches</a>
        <a href="#referrals" className="hover:text-black transition-colors">Referrals</a>
      </div>

      {/* Button - Changed from Green to Bright Blue */}
      <Link href="/apply"
        className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-200"
        style={{ background: '#3B82F6', color: '#fff' }}>
        Apply Now →
      </Link>

      {/* Mobile Burger - Black */}
      <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <span className={`block w-6 h-0.5 transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} style={{ background: '#000' }} />
        <span className={`block w-6 h-0.5 transition-all ${open ? 'opacity-0' : ''}`} style={{ background: '#000' }} />
        <span className={`block w-6 h-0.5 transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} style={{ background: '#000' }} />
      </button>

      {/* Mobile Menu - Light Theme */}
      {open && (
        <div className="absolute top-full left-0 right-0 flex flex-col items-center gap-5 py-8 md:hidden shadow-xl"
          style={{ background: 'rgba(255, 255, 255, 0.98)', borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
          {['the-job','interns','why-tnt','product','coaches','referrals'].map(id => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}
              className="capitalize text-sm font-bold" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
              {id.replace('-', ' ')}
            </a>
          ))}
          {/* Mobile CTA Button - Changed to Blue */}
          <Link href="/apply" onClick={() => setOpen(false)}
            className="mt-2 px-8 py-3 rounded-full text-sm font-bold shadow-lg shadow-blue-100"
            style={{ background: '#3B82F6', color: '#fff' }}>
            Apply Now
          </Link>
        </div>
      )}
    </nav>
  )
}