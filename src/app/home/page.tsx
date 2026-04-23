/**
 * Home Page — Server Component
 *
 * Demonstrates the full dynamic pattern:
 *  1. generateMetadata()  → SEO tags from Laravel meta_desc
 *  2. fetchPageData()     → server-side data fetch
 *  3. notFound()          → 404 if Laravel returns nothing
 *  4. resolveImageUrl()   → backend-prefixed image paths
 *
 * To add a new page (e.g. "services"), duplicate this file,
 * change the pageName constant, and update the content rendering.
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";

import { fetchPageData } from "@/lib/api";
import { generatePageMetadata } from "@/lib/meta";
import { resolveImageUrl } from "@/lib/image";
import type { HomePageResponse, HomePageSection } from "@/types/pages";

/** The Laravel endpoint slug for this page. */
const PAGE_NAME = "home-page";

/* ── SEO ──────────────────────────────────────────────────────────────────── */

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageData<HomePageResponse>(PAGE_NAME);

  // If the page doesn't exist, Next.js will render the notFound UI below,
  // but we still need to return something valid here.
  if (!data) return { title: "Page Not Found" };

  return generatePageMetadata(data.meta_desc);
}

/* ── Page Component ───────────────────────────────────────────────────────── */

export default async function HomePage() {
  const data = await fetchPageData<HomePageResponse>(PAGE_NAME);

  // Trigger Next.js 404 page if Laravel returns null (404).
  if (!data) notFound();

  const { content, sections } = data;

  return (
    <main>
      {/* ── Hero ── */}
      <section>
        <h1>{content.hero_heading}</h1>
        <p>{content.hero_subheading}</p>
        {content.hero_cta_url && (
          <a href={content.hero_cta_url}>{content.hero_cta_label}</a>
        )}
      </section>

      {/* ── Stats ── */}
      <section>
        <Stat label="Active Members" value={content.stats_members} />
        <Stat label="Total Paid Out" value={content.stats_paid_out} />
        <Stat label="Views Generated" value={content.stats_views} />
        <Stat label="Verified Reviews" value={content.stats_reviews} />
      </section>

      {/* ── Dynamic Sections ── */}
      {sections?.map((section, index) => (
        <DynamicSection key={index} section={section} />
      ))}
    </main>
  );
}

/* ── Sub-components ───────────────────────────────────────────────────────── */

function Stat({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

/**
 * Renders a section based on its `type` field from the API.
 * Add new cases here as your Laravel backend grows.
 */
function DynamicSection({ section }: { section: HomePageSection }) {
  switch (section.type) {
    case "slider":
      return <SliderSection section={section} />;
    case "banner":
      return <BannerSection section={section} />;
    case "testimonials":
      return <TestimonialsSection section={section} />;
    default:
      // Unknown section types are silently skipped in production.
      if (process.env.NODE_ENV === "development") {
        console.warn(`[DynamicSection] Unknown section type: "${section.type}"`);
      }
      return null;
  }
}

function SliderSection({ section }: { section: HomePageSection }) {
  return (
    <section aria-label={section.title ?? "Slider"}>
      {section.title && <h2>{section.title}</h2>}
      <div role="list">
        {section.items?.map((item) => (
          <div key={item.id} role="listitem">
            {item.image && (
              <Image
                src={resolveImageUrl(item.image)}
                alt={item.title ?? ""}
                width={800}
                height={450}
                style={{ width: "100%", height: "auto" }}
              />
            )}
            {item.title && <h3>{item.title}</h3>}
            {item.description && <p>{item.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

function BannerSection({ section }: { section: HomePageSection }) {
  const banner = section.items?.[0];
  if (!banner) return null;

  return (
    <section aria-label={section.title ?? "Banner"}>
      {banner.image && (
        <Image
          src={resolveImageUrl(banner.image)}
          alt={banner.title ?? ""}
          width={1440}
          height={500}
          priority
          style={{ width: "100%", height: "auto" }}
        />
      )}
      {banner.title && <h2>{banner.title}</h2>}
      {banner.description && <p>{banner.description}</p>}
    </section>
  );
}

function TestimonialsSection({ section }: { section: HomePageSection }) {
  return (
    <section aria-label={section.title ?? "Testimonials"}>
      {section.title && <h2>{section.title}</h2>}
      <ul>
        {section.items?.map((item) => (
          <li key={item.id}>
            {item.image && (
              <Image
                src={resolveImageUrl(item.image)}
                alt={item.title ?? ""}
                width={64}
                height={64}
                style={{ borderRadius: "50%" }}
              />
            )}
            <blockquote>{item.description}</blockquote>
            {item.title && <cite>{item.title}</cite>}
          </li>
        ))}
      </ul>
    </section>
  );
}
