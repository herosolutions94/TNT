/**
 * API Client
 * Single source of truth for all Laravel backend communication.
 * To change the base URL or headers, update this file only.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

/* ── Site Settings ────────────────────────────────────────────────────────── */

export interface SiteSettings {
  site_name: string;
  site_logo: string;       // filename only, e.g. "idoi4EA3j...png"
  site_logo2: string;
  site_icon: string;
  site_copyright: string;
  site_facebook?: string | null;
  site_twitter?: string | null;
  site_instagram?: string | null;
  site_linkedin?: string | null;
  site_youtube?: string | null;
  site_discord?: string | null;
  site_phone?: string | null;
  site_email?: string | null;
  site_address?: string | null;
  site_meta_desc?: string | null;
  site_meta_keyword?: string | null;
  [key: string]: unknown;
}

/**
 * Fetches site_settings from any page endpoint and returns them.
 * Uses the become_creator endpoint as the canonical settings source
 * since every Laravel page response includes site_settings.
 * Cached for 5 minutes — settings rarely change.
 */
export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/become_creator`, {
      headers: { "Content-Type": "application/json", lang: "eng" },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return (data?.site_settings as SiteSettings) ?? null;
  } catch {
    return null;
  }
}

/**
 * Resolves a site_settings logo filename to a full storage URL.
 * Laravel stores logos as bare filenames (no path prefix).
 */
export function resolveStorageUrl(filename?: string | null): string {
  if (!filename) return "";
  if (filename.startsWith("http://") || filename.startsWith("https://")) return filename;
  return `${BASE_URL}/storage/images/${filename}`;
}

export interface PageMeta {
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  meta_image?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  og_type?: string;
  canonical_url?: string;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  [key: string]: string | undefined;
}

/**
 * Generic page response shape.
 * Laravel returns `content`, `meta_desc`, and any number of extra
 * top-level keys (home_jobs, interns, coaches, etc.).
 * Use the TPage generic to type the full response for a specific page.
 */
export type PageResponse<TPage = Record<string, unknown>> = TPage & {
  content: Record<string, unknown>;
  meta_desc: PageMeta;
};

/**
 * Fetches page data from the Laravel backend.
 * @param pageName - The page slug, e.g. "become_creator", "home-page"
 * @returns Typed response or null if the page is not found (404).
 * @throws Error for non-404 network/server failures.
 */
export async function fetchPageData<TPage = Record<string, unknown>>(
  pageName: string,
): Promise<TPage | null> {
  const url = `${BASE_URL}/api/${pageName}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      lang: "eng",
    },
    // ISR: revalidate every 60 seconds.
    // Set to 0 for no cache, remove for full static build-time caching.
    next: { revalidate: 60 },
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(
      `Failed to fetch page "${pageName}": ${res.status} ${res.statusText}`,
    );
  }

  return res.json() as Promise<TPage>;
}

/* ── Form Submissions ─────────────────────────────────────────────────────── */

export interface ApiFormResponse {
  status: 0 | 1;
  msg: string;
}

export interface ApplyJobPayload {
  name: string;
  email: string;
  phone?: string;
  tiktok?: string;
  instagram?: string;
  followers?: string;
  experience?: string;
  why: string;
  availability: string;
}

/**
 * Submits a job application to Laravel: POST /api/apply-job
 * Always resolves — never throws. Check `status` in the return value.
 */
export async function submitApplyJob(
  payload: ApplyJobPayload,
): Promise<ApiFormResponse> {
  try {
    const res = await fetch(`${BASE_URL}/api/save-request-quote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });


    const data = await res.json();
    return data as ApiFormResponse;
  } catch {
    return { status: 0, msg: "Could not reach the server. Please check your connection." };
  }
}
