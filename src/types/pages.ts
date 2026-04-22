/**
 * Page-specific TypeScript types.
 * Add a new interface here whenever you add a new Laravel page.
 */

/* ── Shared ─────────────────────────────────────────────── */

export interface SiteSettings {
  site_name: string;
  site_logo: string;
  site_logo2: string;
  site_icon: string;
  site_facebook?: string;
  site_twitter?: string;
  site_instagram?: string;
  site_linkedin?: string;
  site_youtube?: string;
  site_meta_desc?: string;
  site_meta_keyword?: string;
  [key: string]: unknown;
}

/* ── Become Creator Page ─────────────────────────────────── */

export interface BecomeCreatorContent {
  page_title: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;

  // Hero / Banner
  banner_badage_heading: string;
  banner_heading: string;
  banner_b_heading: string;
  banner_text: string;
  banner_b_text: string;
  banner_text2: string;
  banner_btn1_txt: string;
  banner_btn1_link: string;
  banner_btn2_txt: string;
  banner_btn2_link: string;

  // Stats
  sec4_counter1: string;
  sec4_counter_txt1: string;
  sec4_counter2: string;
  sec4_counter_txt2: string;
  sec4_counter3: string;
  sec4_counter_txt3: string;

  // Section headings
  section1_top_heading: string;
  section1_heading: string;
  section2_top_heading: string;
  section2_heading: string;
  section2_text: string;
  section3_top_heading: string;
  section3_heading: string;
  section4_top_heading: string;
  section4_heading: string;
  section4_text: string;
  section5_top_heading: string;
  section5_heading: string;
  section5_text: string;
  section6_top_heading: string;
  section6_heading: string;
  section7_top_heading: string;
  section7_heading: string;
  section7_btn1_txt: string;
  section7_btn1_link: string;
  section8_top_heading: string;
  section8_text: string;
  section8_btn1_txt: string;
  section8_btn1_link: string;
}

export interface HomeJob {
  id: number;
  title: string;
  detail: string;
  txt1: string;
  txt2: string;
  image: string;
  section: string;
  order_no: number;
}

export interface WhyChooseUs {
  id: number;
  title: string;
  detail: string;
  txt1: string;
  image: string;
  section: string;
  order_no: number;
}

export interface OurProduct {
  id: number;
  title: string;
  detail: string | null;
  txt1: string;
  section: string;
  order_no: number;
}

export interface WorkVideo {
  id: number;
  name: string;
  video: string;
  type: string;
  description: string;
  views: string;
  status: number;
}

export interface Intern {
  id: number;
  name: string;
  description: string;
  image: string;
  status: number;
  time_period: string;
}

export interface Coach {
  id: number;
  name: string;
  image: string | null;
  description: string;
  followers: string;
  platform: string;
  status: number;
}

export interface Testimonial {
  id: number;
  name: string;
  designation: string | null;
  ratings: number;
  message: string;
  status: number;
  image: string | null;
  title: string | null;
  created_at: string;
  updated_at: string;
}

export interface BecomeCreatorPageResponse {
  site_settings: SiteSettings;
  content: BecomeCreatorContent;
  meta_desc: {
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    meta_image: string;
    og_title: string;
    og_description: string;
    og_image: string;
    twitter_image: string;
  };
  home_jobs: HomeJob[];
  why_choose_us: WhyChooseUs[];
  our_products: OurProduct[];
  work_videos: WorkVideo[];
  interns: Intern[];
  coaches: Coach[];
  testimonials: Testimonial[];
}

/* ── Home Page ─────────────────────────────────────────── */

export interface HomePageContent {
  page_title: string;
  hero_heading?: string;
  hero_subheading?: string;
  hero_cta_label?: string;
  hero_cta_url?: string;
  [key: string]: unknown;
}
