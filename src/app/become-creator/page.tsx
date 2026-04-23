/**
 * Become Creator Page — Server Component
 * All content is fetched from Laravel: /api/become_creator
 * No hardcoded strings. Add content via the Laravel admin panel.
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

import { fetchPageData } from "@/lib/api";
import { generatePageMetadata } from "@/lib/meta";
import { resolveImageUrl } from "@/lib/image";
import ScrollReveal from "@/components/ScrollReveal";
import VideoCard from "@/components/VideoCard";
import type {
  BecomeCreatorPageResponse,
  HomeJob,
  WhyChooseUs,
  OurProduct,
  WorkVideo,
  Intern,
  Coach,
  Testimonial,
} from "@/types/pages";

const PAGE_NAME = "become_creator";

/* ── SEO ──────────────────────────────────────────────────────────────────── */

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageData<BecomeCreatorPageResponse>(PAGE_NAME);
  if (!data) return { title: "Page Not Found" };
  return generatePageMetadata(data.meta_desc);
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default async function BecomeCreatorPage() {
  const data = await fetchPageData<BecomeCreatorPageResponse>(PAGE_NAME);
  if (!data) notFound();

  const {
    content,
    home_jobs,
    why_choose_us,
    our_products,
    work_videos,
    interns,
    coaches,
    testimonials,
  } = data;

  const stats = [
    { num: content.sec4_counter1, label: content.sec4_counter_txt1 },
    { num: content.sec4_counter2, label: content.sec4_counter_txt2 },
    { num: content.sec4_counter3, label: content.sec4_counter_txt3 },
  ];

  return (
    <main className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-36 pb-24 overflow-hidden min-h-screen bg-white">
        {/* Animated background orbs */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute top-1/4 -left-10 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 animate-blob"
            style={{ background: "#3B82F6" }}
          />
          <div
            className="absolute bottom-1/4 -right-10 w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.07] animate-blob animation-delay-2000"
            style={{ background: "#60A5FA" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.05] animate-blob animation-delay-4000"
            style={{ background: "#2563EB" }}
          />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(#ddd 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <ScrollReveal>
            {/* Badge */}
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
              style={{
                background: "rgba(59,130,246,0.1)",
                color: "#2563EB",
                border: "1px solid rgba(59,130,246,0.2)",
              }}
            >
              {content.banner_badage_heading}
            </span>

            {/* Heading */}
            <h1
              className="font-display font-black leading-tight mb-6 text-slate-900"
              style={{ fontSize: "clamp(3.5rem, 8vw, 5.5rem)" }}
            >
              {content.banner_heading}
              <br />
              <span className="text-blue-600 animate-pulse">
                {content.banner_b_heading}
              </span>
            </h1>

            {/* Sub-text */}
            <p className="max-w-xl mx-auto text-lg mb-10 text-slate-600 font-medium leading-relaxed">
              {content.banner_text}{" "}
              <span className="text-blue-700 font-bold">
                {content.banner_b_text}{" "}
              </span>
              {content.banner_text2}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={content.banner_btn1_link || "/apply"}
                className="px-10 py-4 rounded-full text-base font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(59,130,246,0.25)]"
                style={{ background: "#3B82F6", color: "#fff" }}
              >
                {content.banner_btn1_txt} →
              </Link>
              <a
                href="#the-job"
                className="px-10 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:bg-slate-50"
                style={{
                  background: "#fff",
                  color: "#1e293b",
                  border: "1px solid #e2e8f0",
                }}
              >
                {content.banner_btn2_txt}
              </a>
            </div>

            {/* Stats bar */}
            <div
              className="flex flex-wrap justify-center gap-12 mt-24 pt-10"
              style={{ borderTop: "1px solid #f1f5f9" }}
            >
              {stats.map(({ num, label }) => (
                <div key={label} className="text-center group">
                  <p className="font-display font-black text-4xl mb-1 text-blue-600 transition-transform group-hover:-translate-y-1">
                    {num}
                  </p>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="py-4 overflow-hidden" style={{ background: "#3B82F6" }}>
        <div className="ticker-wrapper">
          <div className="ticker-inner">
            {Array(8)
              .fill(
                "TNT CREATOR PROGRAM · GET PAID · GO VIRAL · LEARN FROM INFLUENCERS · ",
              )
              .join("")
              .split("·")
              .map((t, i) => (
                <span
                  key={i}
                  className="font-display font-bold text-sm tracking-widest uppercase px-6 text-white"
                >
                  {t.trim()}{" "}
                  {i % 4 !== 3 && (
                    <span className="mx-3 opacity-50">·</span>
                  )}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* ── THE JOB ── */}
      {home_jobs?.length > 0 && (
        <section
          id="the-job"
          className="py-28 px-6 md:px-16 max-w-7xl mx-auto bg-white"
        >
          <ScrollReveal>
            <p className="text-xs font-bold tracking-widest uppercase mb-4 text-blue-600">
              {content.section1_top_heading}
            </p>
            <h2 className="font-display font-black text-5xl md:text-6xl mb-16 text-slate-900">
              {content.section1_heading}
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {home_jobs.map((job: HomeJob, i: number) => (
              <ScrollReveal key={job.id} delay={i * 150}>
                <JobCard job={job} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* ── OUR INTERNS ── */}
      {interns?.length > 0 && (
        <section id="interns" className="py-28 px-6 md:px-16 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <p className="text-xs font-bold tracking-widest uppercase mb-4 text-blue-600">
                {content.section2_top_heading}
              </p>
              <h2 className="font-display font-black text-5xl md:text-6xl mb-4 text-slate-900">
                {content.section2_heading}
              </h2>
              <p className="text-lg mb-16 max-w-xl text-slate-500 font-medium">
                {content.section2_text}
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {interns.map((intern: Intern, i: number) => (
                <ScrollReveal key={intern.id} delay={i * 150}>
                  <InternCard intern={intern} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── WHY TNT ── */}
      {why_choose_us?.length > 0 && (
        <section id="why-tnt" className="py-28 px-6 md:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <p className="text-xs font-bold tracking-widest uppercase mb-4 text-blue-600">
                {content.section3_top_heading}
              </p>
              <h2 className="font-display font-black text-5xl md:text-6xl mb-16 text-slate-900">
                {content.section3_heading}
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {why_choose_us.map((item: WhyChooseUs, i: number) => (
                <ScrollReveal key={item.id} delay={i * 100}>
                  <WhyCard item={item} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PRODUCT ── */}
      {our_products?.length > 0 && (
        <section
          id="product"
          className="py-28 px-6 md:px-16"
          style={{ background: "rgba(59, 131, 246, 0.08)" }}
        >
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: "#3B82F6" }}
              >
                {content.section4_top_heading}
              </p>
              <h2
                className="font-display font-black text-5xl md:text-6xl mb-4"
                style={{ color: "#1a1a1a" }}
              >
                {content.section4_heading}
              </h2>
              <p
                className="text-lg mb-16 max-w-xl"
                style={{ color: "rgba(37, 37, 37, 0.6)" }}
              >
                {content.section4_text}
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6">
              {our_products.map((product: OurProduct, i: number) => (
                <ScrollReveal key={product.id} delay={i * 120}>
                  <ProductCard product={product} index={i} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── COACHES ── */}
      {coaches?.length > 0 && (
        <section id="coaches" className="py-28" style={{ background: "#f8fafc" }}>
          <div className="px-6 md:px-16 max-w-7xl mx-auto mb-14">
            <ScrollReveal>
              <p
                className="text-xs font-bold tracking-widest uppercase mb-4"
                style={{ color: "#3B82F6" }}
              >
                {content.section5_top_heading}
              </p>
              <h2
                className="font-display font-black text-5xl md:text-6xl mb-4"
                style={{ color: "#0f172a" }}
              >
                {content.section5_heading}
              </h2>
              <p
                className="text-lg max-w-lg font-medium"
                style={{ color: "#64748b" }}
              >
                {content.section5_text}
              </p>
            </ScrollReveal>
          </div>

          {/* Infinite scroll row */}
          <div className="relative overflow-hidden">
            <div className="coaches-scroll flex gap-6">
              {[...coaches, ...coaches].map((coach: Coach, i: number) => (
                <CoachCard key={`${coach.id}-${i}`} coach={coach} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── EXAMPLE VIDEOS ── */}
      {work_videos?.length > 0 && (
        <section
          id="videos"
          className="py-28 px-6 md:px-16"
          style={{ background: "rgba(59, 131, 246, 0.08)" }}
        >
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <p className="text-xs font-bold tracking-widest uppercase mb-4 text-blue-600">
                {content.section6_top_heading}
              </p>
              <h2 className="font-display font-black text-5xl md:text-6xl mb-16 text-slate-900">
                {content.section6_heading}
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {work_videos.map((video: WorkVideo, i: number) => (
                <ScrollReveal key={video.id} delay={i * 100}>
                  <VideoCard video={video} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS / REFERRALS ── */}
      {testimonials?.length > 0 && (
        <section id="referrals" className="py-28 px-6 md:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-4 text-blue-600">
                    {content.section7_top_heading}
                  </p>
                  <h2 className="font-display font-black text-5xl md:text-6xl text-slate-900 leading-tight">
                    {content.section7_heading}
                  </h2>
                </div>
                {content.section7_btn1_txt && (
                  <div className="pb-2">
                    <Link
                      href={content.section7_btn1_link || "/hire-talent"}
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-200 shadow-lg hover:shadow-blue-200/50"
                    >
                      {content.section7_btn1_txt}
                    </Link>
                  </div>
                )}
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t: Testimonial, i: number) => (
                <ScrollReveal key={t.id} delay={i * 150}>
                  <TestimonialCard testimonial={t} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA BANNER ── */}
      <div className="bg-white pb-16">
        <section
          className="py-24 px-6 mx-6 md:mx-16 rounded-[40px] text-center relative overflow-hidden shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)",
          }}
        >
          <div className="relative z-10">
            <h2 className="font-display font-black text-4xl md:text-6xl mb-6 text-white">{content.section8_top_heading}</h2>
          
            <p className="text-lg mb-10 max-w-md mx-auto text-blue-100 font-medium opacity-80">
              {content.section8_text}
            </p>
            <Link
              href={content.section8_btn1_link || "/apply"}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-bold transition-all bg-white text-blue-900 hover:scale-105 hover:shadow-2xl"
            >
              {content.section8_btn1_txt} →
            </Link>
          </div>
        </section>
      </div>

    </main>
  );
}

function JobCard({ job }: { job: HomeJob }) {
  return (
    <div className="rounded-3xl p-8 h-full transition-all hover:shadow-xl border border-slate-100 bg-slate-100/100">
      {job.image && (
        <span className="mb-6 block bg-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resolveImageUrl(job.image , "images")}
            alt={job.title}
            width={32}
            height={32}
            className="object-cover"
          />
        </span>
      )}
      <h3 className="font-display font-bold text-xl mb-3 text-slate-900">
        {job.title}
      </h3>
      {job.txt1 && (
        <p className="text-sm leading-relaxed text-slate-500 font-medium">
          {job.txt1}
        </p>
      )}
    </div>
  );
}

const INTERN_TAG_COLORS = ["#3B82F6", "#2563EB", "#60A5FA"];

function InternCard({ intern, index = 0 }: { intern: Intern; index?: number }) {
  const tagColor = INTERN_TAG_COLORS[index % INTERN_TAG_COLORS.length];

  return (
    <div className="relative overflow-hidden rounded-3xl h-[600px] group shadow-lg border border-slate-200">
      {intern.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolveImageUrl(intern.image , "interns")}
          alt={intern.name}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center text-white font-black text-6xl"
          style={{ background: tagColor }}
        >
          {intern.name[0]}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-3">
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-bold self-start"
          style={{ background: tagColor, color: "#fff" }}
        >
          {intern.time_period}
        </span>
        <h3 className="font-display font-bold text-3xl text-white">
          {intern.name}
        </h3>
        <p className="text-sm leading-relaxed text-slate-200 line-clamp-3">
          {intern.description}
        </p>
      </div>
    </div>
  );
}

function WhyCard({ item }: { item: WhyChooseUs }) {
  return (
    <div className="flex gap-5 rounded-2xl p-6 h-full border border-slate-100 bg-slate-100/100 hover:border-blue-200 transition-colors">
      {item.image && (
        <span className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resolveImageUrl(item.image , "images")}
            alt={item.title}
            width={32}
            height={32}
          />
        </span>
      )}
      <div>
        <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
        {item.txt1 && (
          <p className="text-sm leading-relaxed text-slate-500 font-medium">
            {item.txt1}
          </p>
        )}
      </div>
    </div>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: OurProduct;
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      className="card-glow rounded-2xl p-8 transition-all duration-300 hover:border-blue-500/50"
      style={{
        background: "rgba(59, 130, 246, 0.04)",
        border: "1px solid rgba(59, 130, 246, 0.15)",
      }}
    >
      <span
        className="font-display font-black text-5xl mb-4 block"
        style={{ color: "rgba(59, 131, 246, 0.42)" }}
      >
        {num}
      </span>
      <h3
        className="font-display font-bold text-xl mb-3"
        style={{ color: "#252525" }}
      >
        {product.title}
      </h3>
      {product.txt1 && (
        <p className="text-sm leading-relaxed" style={{ color: "rgba(29, 29, 29, 0.5)" }}>
          {product.txt1}
        </p>
      )}
    </div>
  );
}

function CoachCard({ coach, index }: { coach: Coach; index: number }) {
  return (
    <div className="shrink-0 w-52 rounded-3xl p-8 text-center transition-all border border-blue-100 bg-white shadow-sm hover:shadow-md">
      {coach.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolveImageUrl(coach.image)}
          alt={coach.name}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
        />
      ) : (
        <div
          className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center font-display font-black text-2xl shadow-inner"
          style={{
            background: `hsl(${210 + (index % 4) * 15}, 70%, 90%)`,
            color: "#2563EB",
          }}
        >
          {coach.name[0]}
        </div>
      )}
      <p className="font-bold text-lg mb-1 text-slate-900">{coach.name}</p>
      <p
        className="text-xs font-black mb-1 uppercase tracking-wider"
        style={{ color: "#3B82F6" }}
      >
        {coach.followers}
      </p>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
        {coach.platform}
      </p>
    </div>
  );
}



function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  // ratings from API is 0 when not set — default to 5 stars in that case
  const stars = testimonial.ratings > 0 ? testimonial.ratings : 5;

  return (
    <div className="rounded-3xl p-8 h-full flex flex-col border border-slate-100 bg-slate-50/50">
      {/* Stars */}
      <div className="flex mb-4 text-blue-500">
        {Array.from({ length: stars }).map((_, i) => (
          <span key={i} className="text-lg" aria-hidden="true">★</span>
        ))}
      </div>

      {/* Message */}
      <p className="text-base font-medium leading-relaxed italic text-slate-700 flex-1 mb-8">
        &ldquo;{testimonial.message}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        {testimonial.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resolveImageUrl(testimonial.image)}
            alt={testimonial.name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-blue-500 text-white shrink-0">
            {testimonial.name[0]}
          </div>
        )}
        <div>
          <p className="font-bold text-slate-900">{testimonial.name}</p>
          {testimonial.designation && (
            <p className="text-xs text-slate-400">{testimonial.designation}</p>
          )}
        </div>
      </div>
    </div>
  );
}
