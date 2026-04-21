import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ScrollReveal from '@/components/ScrollReveal'
import Footer from '@/components/Footer'

/* ─── DATA ──────────────────────────────────────────────── */

const jobPerks = [
  { icon: '/images/icon1.png', title: 'We Build the Strategy. You Post the Content.', desc: 'Start your fresh TikTok journey today! Post once a day about Turbo AI, and we’ll handle the heavy lifting. Get exclusive access to viral blueprints and content ideas curated by our top-tier marketing team.' },
  { icon: '/images/icon2.png', title: 'Master the Art of Viral Growth', desc: 'Collaborate directly with our founders and elite influencer network to master startup marketing. Refine your creative voice and learn the exact strategies used to scale brands from the ground up.' },
  { icon: '/images/icon3.png', title: 'Turn Your Creativity into a Career', desc: 'Secure a base rate of $20+ per video and boost your earnings with performance-based rewards. Follow in the footsteps of our top creator who earned $20k in a single month by mastering our system.' },
]

const interns = [
  { img: '/images/img1.jpg', name:'Aysha', outcome: 'Landed her dream marketing role at a Series B startup in Dubai.', tag: 'Full-time Hire', color: '#3B82F6' },
  { img: '/images/img2.jpg', name:'Mubashra', outcome: 'Earned $18,000 in a single month from performance bonuses.', tag: '$18K Month', color: '#2563EB' },
  { img: '/images/img3.jpg', name:'Johen', outcome: 'Grew from 0 content experience to 400K followers in 90 days.', tag: '400K Followers', color: '#60A5FA' },
]

const whyItems = [
  { emoji: '/images/icon4.png', title: 'Real Experience', desc: 'Marketing internship at a high-growth, venture-backed company — not just busy work.' },
  { emoji: '/images/icon5.png', title: 'Maximize Your Income', desc: '$20 base per video + significant performance bonuses. Uncapped earning potential.' },
  { emoji: '/images/icon6.png', title: 'The Viral Roadmap', desc: 'Our creators have driven 500M+ views. We teach you exactly how to replicate that.' },
  { emoji: '/images/icon7.png', title: 'Strategic Creative Direction', desc: 'Free coaching from influencers with millions of followers across TikTok & YouTube.' },
  { emoji: '/images/icon8.png', title: 'Collaborative Growth Ecosystem', desc: 'IRL events, global Slack community, and connections with hundreds of TNT creators.' },
  { emoji: '/images/icon9.png', title: 'Startup Access', desc: 'Work directly with founders. Get a front-row seat to how a VC-backed company scales.' },
]

const productPoints = [
  { n: '01', title: 'AI-Powered Learning', body: 'Our platform uses AI to personalise study plans, surface the right content, and help students learn 3× faster than traditional methods.' },
  { n: '02', title: 'Bite-Size Video Lessons', body: 'Complex topics broken into 60-second TikTok-style clips that are actually fun to watch — made by real educators.' },
  { n: '03', title: 'Live Progress Tracking', body: 'Students, parents, and tutors see real-time performance data so everyone knows exactly what needs work.' },
  { n: '04', title: 'Exam-Ready in Weeks', body: 'Structured roadmaps that take students from confused to confident before their next big test.' },
]

const coaches = [
  { name: 'Eric', followers: '600K', platform: 'TikTok' },
  { name: 'Eileen', followers: '130K', platform: 'YouTube' },
  { name: 'Nick', followers: '250K', platform: 'TikTok' },
  { name: 'Andrew', followers: '5M', platform: 'Instagram' },
  { name: 'Hershy', followers: '200K', platform: 'TikTok' },
  { name: 'Sam', followers: '600K', platform: 'YouTube' },
  { name: 'Adriel', followers: '500K', platform: 'TikTok' },
  { name: 'Rudy', followers: 'CEO', platform: 'Founder' },
]

const videos = [
  { title: '"I used AI to ace my finals"', views: '2.4M views', tag: 'Study tips' , videoUrl:'/images/vid1.mp4'},
  { title: '"This app replaced my tutor"', views: '890K views', tag: 'Product demo' , videoUrl:'/images/vid2.mp4'},
  { title: '"How I went from D to A in 3 weeks"', views: '1.7M views', tag: 'Story' , videoUrl:'/images/vid3.mp4'},
  { title: '"AI homework hack every student needs"', views: '3.1M views', tag: 'Viral' , videoUrl:'/images/vid4.mp4'},
]

const testi = [
  { name: 'Fatima A.', text: 'I had zero content experience. TNT gave me the system and coaching to hit 300K followers in 60 days. The pay is real - do not sleep on this.', stars: 5 },
  { name: 'Jordan K.', text: 'Made $12K in my second month. The viral format library alone is worth 10x what other programs charge.', stars: 5 },
  { name: 'Priya M.', text: 'Working directly with the founders was something I never expected. Got a full-time offer after 3 months.', stars: 5 },
]

/* ─── COMPONENT ─────────────────────────────────────────── */

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── HERO (Blue Mode Animated) ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-36 pb-24 overflow-hidden min-h-screen bg-white">
        
        {/* Animated Background Orbs (Blue Palette) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 -left-10 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 animate-blob"
            style={{ background: '#3B82F6' }} />
          <div className="absolute bottom-1/4 -right-10 w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.07] animate-blob animation-delay-2000"
            style={{ background: '#60A5FA' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.05] animate-blob animation-delay-4000"
            style={{ background: '#2563EB' }} />

          {/* Light Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.05]" 
            style={{ backgroundImage: `linear-gradient(#ddd 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
              style={{ background: 'rgba(59,130,246,0.1)', color: '#2563EB', border: '1px solid rgba(59,130,246,0.2)' }}>
              Hiring Marketing Interns
            </span>

            <h1 className="font-display font-black leading-tight mb-6 text-slate-900"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)' }}>
              Turn Your Content Into a<br />
              <span className="text-blue-600 animate-pulse">Viral Growth Machine.</span>
            </h1>

            <p className="max-w-xl mx-auto text-lg mb-10 text-slate-600 font-medium leading-relaxed">
              We don't just edit videos; we engineer retention.{' '}
              <span className="text-blue-700 font-bold">Scale your personal brand on TikTok, Reels, and Shorts </span>with world-class editing and data-driven strategy.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/apply"
                className="px-10 py-4 rounded-full text-base font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(59,130,246,0.25)]"
                style={{ background: '#3B82F6', color: '#fff' }}>
                Apply Today →
              </Link>
              <a href="#the-job"
                className="px-10 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:bg-slate-50"
                style={{ background: '#fff', color: '#1e293b', border: '1px solid #e2e8f0' }}>
                Learn More
              </a>
            </div>

            {/* Stats Bar */}
            <div className="flex flex-wrap justify-center gap-12 mt-24 pt-10"
              style={{ borderTop: '1px solid #f1f5f9' }}>
              {[['500M+', 'Views Generated'], ['$20K', 'Top Monthly Earn'], ['300+', 'Active Creators']].map(([num, label]) => (
                <div key={label} className="text-center group">
                  <p className="font-display font-black text-4xl mb-1 text-blue-600 transition-transform group-hover:-translate-y-1">{num}</p>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TICKER (Blue) ── */}
      <div className="py-4 overflow-hidden" style={{ background: '#3B82F6' }}>
        <div className="ticker-wrapper">
          <div className="ticker-inner">
            {Array(8).fill('TNT CREATOR PROGRAM · GET PAID · GO VIRAL · LEARN FROM INFLUENCERS · ').join('').split('·').map((t, i) => (
              <span key={i} className="font-display font-bold text-sm tracking-widest uppercase px-6 text-white">
                {t.trim()} {i % 4 !== 3 && <span className="mx-3 opacity-50">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── THE JOB (White/Blue) ── */}
      <section id="the-job" className="py-28 px-6 md:px-16 max-w-7xl mx-auto bg-white">
        <ScrollReveal>
          <p className="text-xs font-bold tracking-widest uppercase mb-4 text-blue-600">You Create. We Dominate.</p>
          <h2 className="font-display font-black text-5xl md:text-6xl mb-16 text-slate-900">
            The Job
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {jobPerks.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 150}>
              <div className="rounded-3xl p-8 h-full transition-all hover:shadow-xl border border-slate-100 bg-slate-100/100">
                <span className="mb-6 block bg-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <img src={p.icon} alt='TNT' width={32} height={32} />
                </span>
                <h3 className="font-display font-bold text-xl mb-3 text-slate-900">{p.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500 font-medium">{p.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── OUR INTERNS ── */}
      <section id="interns" className="py-28 px-6 md:px-16 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="text-xs font-bold tracking-widest uppercase mb-4 text-blue-600">Real Results</p>
            <h2 className="font-display font-black text-5xl md:text-6xl mb-4 text-slate-900">
              Our Interns
            </h2>
            <p className="text-lg mb-16 max-w-xl text-slate-500 font-medium">
              Join the ranks of creators who have mastered the algorithm.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {interns.map((intern, i) => (
              <ScrollReveal key={intern.name} delay={i * 150}>
                <div className="relative overflow-hidden rounded-3xl h-[600px] group shadow-lg border border-slate-200">
                  <img 
                    src={intern.img} 
                    alt={intern.name} 
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold self-start"
                      style={{ background: intern.color, color: '#fff' }}>
                      {intern.tag}
                    </span>
                    <h3 className="font-display font-bold text-3xl text-white">Meet {intern.name}</h3>
                    <p className="text-sm leading-relaxed text-slate-200 line-clamp-3">{intern.outcome}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY TNT ── */}
      <section id="why-tnt" className="py-28 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="text-xs font-bold tracking-widest uppercase mb-4 text-blue-600">Perks</p>
            <h2 className="font-display font-black text-5xl md:text-6xl mb-16 text-slate-900">
              Why TNT?
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyItems.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div className="flex gap-5 rounded-2xl p-6 h-full border border-slate-100 bg-slate-100/100 hover:border-blue-200 transition-colors">
                  <span className="shrink-0"><img src={item.emoji} alt={item.title} width={32} height={32} /></span>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-500 font-medium">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      {/* ── PRODUCT ── */}
      <section id="product" className="py-28 px-6 md:px-16"
        style={{ background: 'rgba(59, 131, 246, 0.08)' }}> {/* Subtle blue tint background */}
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" 
              style={{ color: '#3B82F6' }}> {/* Primary Blue Accent */}
              What We Build
            </p>
            <h2 className="font-display font-black text-5xl md:text-6xl mb-4" 
                style={{ color: '#1a1a1a' }}> {/* Pure white for contrast */}
              What Our Product<br />Actually Does
            </h2>
            <p className="text-lg mb-16 max-w-xl" 
              style={{ color: 'rgba(37, 37, 37, 0.6)' }}> {/* Muted white/blue text */}
              TNT is an AI-powered learning platform that makes studying fast, fun, and actually effective.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {productPoints.map((p, i) => (
              <ScrollReveal key={p.n} delay={i * 120}>
                <div className="card-glow rounded-2xl p-8 transition-all duration-300 hover:border-blue-500/50"
                  style={{ 
                    background: 'rgba(59, 130, 246, 0.04)', 
                    border: '1px solid rgba(59, 130, 246, 0.15)' 
                  }}>
                  {/* Transparent Blue Number */}
                  <span className="font-display font-black text-5xl mb-4 block" 
                        style={{ color: 'rgba(59, 131, 246, 0.42)' }}>
                    {p.n}
                  </span>
                  <h3 className="font-display font-bold text-xl mb-3" 
                      style={{ color: '#252525' }}>
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed" 
                    style={{ color: 'rgba(29, 29, 29, 0.5)' }}>
                    {p.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      {/* ── COACHES ── */}
      <section id="coaches" className="py-28" style={{ background: '#f8fafc' }}> {/* Slightly cleaner light blue-gray background */}
        <div className="max-w-7xl mx-auto">
          <div className="px-6 md:px-16 max-w-7xl mx-auto mb-14">
            <ScrollReveal>
              <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#3B82F6' }}>
                Coaching
              </p>
              <h2 className="font-display font-black text-5xl md:text-6xl mb-4" style={{ color: '#0f172a' }}>
                Content Coaches
              </h2>
              <p className="text-lg max-w-lg font-medium" style={{ color: '#64748b' }}>
                Work with influencers to learn virality and improve as a creator.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Infinite scroll row */}
        <div className="relative overflow-hidden">
          <div className="coaches-scroll flex gap-6">
            {[...coaches, ...coaches].map((c, i) => (
              <div key={i} className="shrink-0 w-52 rounded-3xl p-8 text-center transition-all border border-blue-100 bg-white shadow-sm hover:shadow-md">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center font-display font-black text-2xl shadow-inner"
                  style={{ 
                    // Generates different shades of professional blues
                    background: `hsl(${210 + (i % 4) * 15}, 70%, 90%)`, 
                    color: '#2563EB' 
                  }}>
                  {c.name[0]}
                </div>
                <p className="font-bold text-lg mb-1 text-slate-900">{c.name}</p>
                <p className="text-xs font-black mb-1 uppercase tracking-wider" style={{ color: '#3B82F6' }}>
                  {c.followers} Followers
                </p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{c.platform}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── EXAMPLE VIDEOS ── */}
      <section id="videos" className="py-28 px-6 md:px-16" style={{ background: 'rgba(59, 131, 246, 0.08)' }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="text-xs font-bold tracking-widest uppercase mb-4 text-blue-600">Proof of Work</p>
            <h2 className="font-display font-black text-5xl md:text-6xl mb-16 text-slate-900">Example Videos</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 100}>
                <div className="rounded-2xl overflow-hidden group flex flex-col bg-white border h-full border-slate-200 shadow-sm">
                  <div className="relative w-full aspect-[9/16] bg-black">
                    <video 
                      src={v.videoUrl} 
                      className="w-full h-full object-cover" 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      preload="metadata" 
                    />
                    <span className="absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-bold bg-blue-500 text-white z-10">{v.tag}</span>
                  </div>
                  <div className="py-4 px-4">
                    <p className="text-sm font-bold text-slate-800">{v.title}</p>
                    <p className="text-xs font-bold text-blue-600 mt-1 uppercase">{v.views}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── REFERRALS ── */}
      

      <section id="referrals" className="py-28 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            {/* Container to hold text and button */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              
              {/* Text Side */}
              <div>
                <p className="text-xs font-bold tracking-widest uppercase mb-4 text-blue-600">
                  Testimonials
                </p>
                <h2 className="font-display font-black text-5xl md:text-6xl text-slate-900 leading-tight">
                  Referrals
                </h2>
              </div>

              {/* Button Side */}
              <div className="pb-2"> {/* Bottom padding to align with the baseline of the large text */}
                <a 
                  href="#join-referral" 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-200 shadow-lg hover:shadow-blue-200/50"
                >
                  Refer Friend
                </a>
              </div>

            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {testi.map((r, i) => (
              <ScrollReveal key={r.name} delay={i * 150}>
                <div className="rounded-3xl p-8 h-full flex flex-col border border-slate-100 bg-slate-50/50">
                  <div className="flex mb-4 text-blue-500">
                    {Array(r.stars).fill(0).map((_, si) => <span key={si} className="text-lg">★</span>)}
                  </div>
                  <p className="text-base font-medium leading-relaxed italic text-slate-700 flex-1 mb-8">"{r.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-blue-500 text-white">
                      {r.name[0]}
                    </div>
                    <span className="font-bold text-slate-900">{r.name}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
        </div>
      </section>

      {/* ── CTA BANNER (Blue Gradient) ── */}
      <div className="bg-white pb-16">
        <section className="py-24 px-6 mx-6 md:mx-16 rounded-[40px] text-center relative overflow-hidden shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)' }}>
          <div className="relative z-10">
            <h2 className="font-display font-black text-4xl md:text-6xl mb-6 text-white">Ready to go viral?</h2>
            <p className="text-lg mb-10 max-w-md mx-auto text-blue-100 font-medium opacity-80">
              Applications are reviewed on a rolling basis. Limited spots available.
            </p>
            <Link href="/apply"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-bold transition-all bg-white text-blue-900 hover:scale-105 hover:shadow-2xl">
              Apply Now →
            </Link>
          </div>
        </section>
      </div>

      <Footer/>
    </main>
  )
}