'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5"
      style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(245,240,232,0.06)' }}>
      <Link href="/" className="font-display font-black text-2xl tracking-tight" style={{ color: 'var(--brand-cream)' }}>
        <img src="/images/logo.png" alt="TNT" width={100} height={100} style={{ borderRadius: '8px' }} />
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: 'rgba(245,240,232,0.7)' }}>
        <a href="#the-job" className="hover:text-white transition-colors">The Job</a>
        <a href="#interns" className="hover:text-white transition-colors">Interns</a>
        <a href="#why-tnt" className="hover:text-white transition-colors">Why TNT?</a>
        <a href="#product" className="hover:text-white transition-colors">Product</a>
        <a href="#coaches" className="hover:text-white transition-colors">Coaches</a>
        <a href="#referrals" className="hover:text-white transition-colors">Referrals</a>
      </div>

      <Link href="/apply"
        className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
        style={{ background: 'var(--brand-orange)', color: '#fff' }}>
        Apply Now →
      </Link>

      {/* Mobile burger */}
      <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <span className={`block w-6 h-0.5 transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} style={{ background: 'var(--brand-cream)' }} />
        <span className={`block w-6 h-0.5 transition-all ${open ? 'opacity-0' : ''}`} style={{ background: 'var(--brand-cream)' }} />
        <span className={`block w-6 h-0.5 transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} style={{ background: 'var(--brand-cream)' }} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 flex flex-col items-center gap-5 py-8 md:hidden"
          style={{ background: 'rgba(10,10,10,0.97)', borderBottom: '1px solid rgba(245,240,232,0.08)' }}>
          {['the-job','interns','why-tnt','product','coaches','referrals'].map(id => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}
              className="capitalize text-sm font-medium" style={{ color: 'rgba(245,240,232,0.8)' }}>
              {id.replace('-', ' ')}
            </a>
          ))}
          <Link href="/apply" onClick={() => setOpen(false)}
            className="mt-2 px-6 py-2.5 rounded-full text-sm font-semibold"
            style={{ background: 'var(--brand-orange)', color: '#fff' }}>
            Apply Now
          </Link>
        </div>
      )}
    </nav>
  )
}
