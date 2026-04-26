'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { submitApplyJob, fetchPageData, type ApplyJobPayload } from '@/lib/api'

/* ── Types ────────────────────────────────────────────────────────────────── */

interface ApplyPageContent {
  banner_top_heading: string
  banner_heading: string
  banner_text: string
  btn_text: string
  banner_bottom_text: string
}

interface ApplyPageData {
  content: ApplyPageContent
}

/* ── Constants ────────────────────────────────────────────────────────────── */

const brandBlue       = '#3B82F6'
const brandBlueLight  = '#EFF6FF'
const brandBlueBorder = '#DBEAFE'
const textDark        = '#1E293B'
const textMuted       = '#64748B'

const EMPTY_FORM: ApplyJobPayload = {
  name: '', email: '', phone: '', tiktok: '', instagram: '',
  followers: '', experience: '', why: '', availability: '',
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function ApplyPage() {
  const [form, setForm]           = useState<ApplyJobPayload>(EMPTY_FORM)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [pageContent, setPageContent] = useState<ApplyPageContent | null>(null)

  // Fetch page content from Laravel on mount
  useEffect(() => {
    fetchPageData<ApplyPageData>('request_quote')
      .then(data => { if (data?.content) setPageContent(data.content) })
      .catch(() => {/* silently fall back to defaults */})
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await submitApplyJob(form)
    setLoading(false)
    res.status === 1 ? setSubmitted(true) : setError(res.msg)
  }

  const isDisabled = loading || !form.name || !form.email || !form.why || !form.availability

  // Content with fallbacks so the page works even if API is down
  const badge      = pageContent?.banner_top_heading ?? 'Limited Spots'
  const heading    = pageContent?.banner_heading      ?? 'Apply Now'
  const subtext    = pageContent?.banner_text         ?? 'Tell us about yourself. We review applications within 48 hours.'
  const btnLabel   = pageContent?.btn_text            ?? 'Submit Application'
  const bottomText = pageContent?.banner_bottom_text  ?? 'We review every application within 48 hours.'

  if (submitted) return <SuccessScreen name={form.name} />

  return (
    <div className="min-h-screen bg-white pt-24 pb-24 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
            style={{ background: brandBlueLight, color: brandBlue, border: `1px solid ${brandBlueBorder}` }}
          >
            {badge}
          </span>
          <h1 className="font-display font-black text-5xl md:text-6xl mb-4" style={{ color: textDark }}>
            {heading}
          </h1>
          <p className="text-lg" style={{ color: textMuted }}>{subtext}</p>
        </div>

        {/* Form card */}
        <div
          className="rounded-3xl p-8 md:p-12 shadow-xl shadow-blue-500/5 border border-slate-100"
          style={{ background: brandBlueLight }}
        >
          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl text-sm font-medium text-red-700 bg-red-50 border border-red-200">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Name + Email */}
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Full Name *">
                <input name="name" value={form.name} onChange={handleChange}
                  placeholder="Your full name" required className={inputCls} />
              </Field>
              <Field label="Email *">
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="you@example.com" required className={inputCls} />
              </Field>
            </div>

            {/* Phone + Availability */}
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Phone Number">
                <input name="phone" value={form.phone} onChange={handleChange}
                  placeholder="+44 1234 567890" className={inputCls} />
              </Field>
              <Field label="Availability *">
                <select name="availability" value={form.availability} onChange={handleChange}
                  required className={inputCls}>
                  <option value="">Select hours/week</option>
                  <option value="part">Part-time (5–15 hrs/week)</option>
                  <option value="full">Full-time (20+ hrs/week)</option>
                  <option value="flexible">Flexible</option>
                </select>
              </Field>
            </div>

            {/* TikTok + Instagram */}
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="TikTok Handle">
                <input name="tiktok" value={form.tiktok} onChange={handleChange}
                  placeholder="@yourhandle" className={inputCls} />
              </Field>
              <Field label="Instagram Handle">
                <input name="instagram" value={form.instagram} onChange={handleChange}
                  placeholder="@yourhandle" className={inputCls} />
              </Field>
            </div>

            {/* Followers */}
            <Field label="Current Following">
              <select name="followers" value={form.followers} onChange={handleChange} className={inputCls}>
                <option value="">Select range</option>
                <option value="0">0 — Just starting out</option>
                <option value="1k">1K – 10K</option>
                <option value="10k">10K – 50K</option>
                <option value="50k">50K – 200K</option>
                <option value="200k">200K+</option>
              </select>
            </Field>

            {/* Experience */}
            <Field label="Content Creation Experience">
              <textarea name="experience" value={form.experience} onChange={handleChange} rows={3}
                placeholder="Tell us about any content you've made..."
                className={`${inputCls} resize-none`} />
            </Field>

            {/* Why */}
            <Field label="Why do you want to join? *">
              <textarea name="why" value={form.why} onChange={handleChange} rows={4}
                placeholder="What excites you about this opportunity?"
                className={`${inputCls} resize-none`} required />
            </Field>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={isDisabled}
              className="w-full py-4 rounded-2xl font-bold text-lg transition-all duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 active:scale-[0.98] shadow-lg shadow-blue-500/25"
              style={{ background: brandBlue, color: '#fff' }}
            >
              {loading ? <Spinner /> : `${btnLabel} →`}
            </button>

            <p className="text-center text-xs font-medium" style={{ color: textMuted }}>
              {bottomText}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Reusable pieces ──────────────────────────────────────────────────────── */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#64748B' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

function Spinner() {
  return (
    <span className="flex items-center justify-center gap-3">
      <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      Submitting...
    </span>
  )
}

function SuccessScreen({ name }: { name: string }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-blue-500/5 max-w-lg w-full">
        <div className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center text-5xl"
          style={{ background: '#EFF6FF', border: '2px solid #DBEAFE' }}>
          🎉
        </div>
        <h2 className="font-display font-black text-5xl mb-4" style={{ color: '#1E293B' }}>
          Application Sent!
        </h2>
        <p className="text-lg mb-10 max-w-md mx-auto" style={{ color: '#64748B' }}>
          Thanks for applying, {name.split(' ')[0]}! Check your email for updates soon.
        </p>
        <Link href="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all hover:bg-slate-50 active:scale-95"
          style={{ border: '2px solid #F1F5F9', color: '#1E293B' }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

const inputCls = 'text-gray-700 w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-white'
