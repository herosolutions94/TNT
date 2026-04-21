'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', tiktok: '', instagram: '',
    followers: '', experience: '', why: '', availability: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  // Blue Color Palette
  const brandBlue = '#3B82F6'
  const brandBlueLight = '#EFF6FF'
  const brandBlueBorder = '#DBEAFE' 
  const textDark = '#1E293B'
  const textMuted = '#64748B'

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #F1F5F9' }}>
        <Link href="/" className="flex items-center gap-2 transition-opacity">
          <img src="/images/logo.png" alt="TNT" width={100} height={100} className="rounded-lg shadow-sm" style={{ 
            borderRadius: '8px', 
            filter: 'brightness(0)'
          }} />
        </Link>
        <div className="w-24" />
      </div>

      <div className="pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">

          {!submitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
                  style={{ background: brandBlueLight, color: brandBlue, border: `1px solid ${brandBlueBorder}` }}>
                  Limited Spots
                </span>
                <h1 className="font-display font-black text-5xl md:text-6xl mb-4" style={{ color: textDark }}>
                  Apply Now
                </h1>
                <p className="text-lg" style={{ color: textMuted }}>
                  Tell us about yourself. We review applications within 48 hours.
                </p>
              </div>

              {/* Form card */}
              <div className="rounded-3xl p-8 md:p-12 shadow-xl shadow-blue-500/5 border border-slate-100" style={{background: brandBlueLight}}>

                <div className="space-y-6">
                  {/* Row 1 */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: textMuted }}>Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange}
                        placeholder="Your full name" 
                        className="text-gray-700 w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: textMuted }}>Email *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange}
                        placeholder="you@example.com" 
                        className="text-gray-700 w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" required />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: textMuted }}>Phone Number</label>
                      <input name="phone" value={form.phone} onChange={handleChange}
                        placeholder="+1 (555) 000-0000" 
                        className="text-gray-700 w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: textMuted }}>Availability *</label>
                      <select name="availability" value={form.availability} onChange={handleChange} 
                        className="w-full px-4 py-3 text-gray-700 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-white">
                        <option value="">Select hours/week</option>
                        <option value="part">Part-time (5–15 hrs/week)</option>
                        <option value="full">Full-time (20+ hrs/week)</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  {/* Social handles */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: textMuted }}>TikTok Handle</label>
                      <input name="tiktok" value={form.tiktok} onChange={handleChange}
                        placeholder="@yourhandle" 
                        className="text-gray-700 w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: textMuted }}>Instagram Handle</label>
                      <input name="instagram" value={form.instagram} onChange={handleChange}
                        placeholder="@yourhandle" 
                        className="text-gray-700 w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" />
                    </div>
                  </div>

                  {/* Followers */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2"
                      style={{ color: textMuted }}>Current Following</label>
                    <select name="followers" value={form.followers} onChange={handleChange} 
                      className="w-full px-4 text-gray-700 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-white">
                      <option value="">Select range</option>
                      <option value="0">0 — Just starting out</option>
                      <option value="1k">1K – 10K</option>
                      <option value="10k">10K – 50K</option>
                      <option value="50k">50K – 200K</option>
                      <option value="200k">200K+</option>
                    </select>
                  </div>

                  {/* Content experience */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2"
                      style={{ color: textMuted }}>Content Creation Experience</label>
                    <textarea name="experience" value={form.experience} onChange={handleChange} rows={3}
                      placeholder="Tell us about any content you've made..."
                      className="text-gray-700 w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none" />
                  </div>

                  {/* Why you */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2"
                      style={{ color: textMuted }}>Why do you want to join? *</label>
                    <textarea name="why" value={form.why} onChange={handleChange} rows={4}
                      placeholder="What excites you about this opportunity?"
                      className="text-gray-700 w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none" required />
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !form.name || !form.email}
                    className="w-full py-4 rounded-2xl font-bold text-lg transition-all duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 active:scale-[0.98] shadow-lg shadow-blue-500/25"
                    style={{ background: brandBlue, color: '#fff' }}>
                    {loading ? (
                      <span className="flex items-center justify-center gap-3">
                        <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : 'Submit Application →'}
                  </button>

                  <p className="text-center text-xs font-medium" style={{ color: textMuted }}>
                    We review every application within 48 hours.
                  </p>
                </div>
              </div>
            </>
          ) : (
            /* Success state */
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-blue-500/5">
              <div className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center text-5xl"
                style={{ background: brandBlueLight, border: `2px solid ${brandBlueBorder}` }}>
                🎉
              </div>
              <h2 className="font-display font-black text-5xl mb-4" style={{ color: textDark }}>
                Application Sent!
              </h2>
              <p className="text-lg mb-10 max-w-md mx-auto" style={{ color: textMuted }}>
                Thanks for applying, {form.name.split(' ')[0]}! Check your email for updates soon.
              </p>
              <Link href="/"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all hover:bg-slate-50 active:scale-95"
                style={{ border: '2px solid #F1F5F9', color: textDark }}>
                ← Back to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}