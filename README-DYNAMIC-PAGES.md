# Dynamic Laravel + Next.js Page System

This system allows your Next.js frontend to dynamically handle any page from your Laravel backend without duplicating code. When you add a new page in Laravel, you won't need to write new logic in Next.js.

---

## 📁 Folder Structure

```
src/
├── lib/
│   ├── api.ts          # API client (fetchPageData)
│   ├── meta.ts         # MetaGenerator (generatePageMetadata)
│   └── image.ts        # Image helper (resolveImageUrl)
├── types/
│   └── pages.ts        # TypeScript types for page content
└── app/
    ├── home/
    │   └── page.tsx    # Example: Home page using the system
    └── [any-page]/
        └── page.tsx    # Add more pages here
```

---

## 🚀 How It Works

### 1. **API Client** (`src/lib/api.ts`)

The `fetchPageData()` function is your single source of truth for all Laravel communication.

```typescript
import { fetchPageData } from "@/lib/api";

const data = await fetchPageData("home-page");
// Fetches: http://127.0.0.1:8000/api/home-page
// Headers: { lang: "eng" }
```

**Key Features:**
- Automatically appends page name to base URL
- Sends `lang: eng` header
- Returns `null` for 404s (triggers Next.js `notFound()`)
- Throws errors for other failures
- Built-in ISR (revalidates every 60 seconds)

**Configuration:**
Change the base URL in `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

---

### 2. **MetaGenerator** (`src/lib/meta.ts`)

Converts Laravel's `meta_desc` object into Next.js `Metadata`.

```typescript
import { generatePageMetadata } from "@/lib/meta";

export async function generateMetadata() {
  const data = await fetchPageData("home-page");
  if (!data) return { title: "Not Found" };
  
  return generatePageMetadata(data.meta_desc);
}
```

**What It Handles:**
- ✅ Page title & description
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card tags
- ✅ Canonical URLs
- ✅ Automatic fallbacks for missing fields

**Laravel API Response Example:**
```json
{
  "meta_desc": {
    "meta_title": "TNT Creators - Join 47,000+ Creators",
    "meta_description": "Get paid to post. Access viral blueprints.",
    "og_image": "/storage/images/og-home.jpg",
    "og_type": "website",
    "canonical_url": "/home"
  }
}
```

---

### 3. **Image Helper** (`src/lib/image.ts`)

Prefixes relative image paths with your Laravel backend URL.

```typescript
import { resolveImageUrl } from "@/lib/image";

<Image 
  src={resolveImageUrl("/storage/images/hero.jpg")} 
  alt="Hero"
  width={800}
  height={450}
/>
// Result: http://127.0.0.1:8000/storage/images/hero.jpg
```

**Smart Behavior:**
- Relative paths → prefixed with backend URL
- Absolute URLs (http/https) → returned unchanged
- Null/undefined → returns empty string

---

### 4. **Dynamic Content Renderer**

See `src/app/home/page.tsx` for a complete example.

**Pattern:**
```typescript
export default async function HomePage() {
  const data = await fetchPageData<HomePageContent, HomePageSection[]>("home-page");
  
  if (!data) notFound(); // Trigger 404 if page doesn't exist
  
  const { content, sections } = data;
  
  return (
    <main>
      <h1>{content.hero_heading}</h1>
      
      {sections?.map((section, i) => (
        <DynamicSection key={i} section={section} />
      ))}
    </main>
  );
}
```

---

## 🎯 Adding a New Page

Let's say you add a **Services** page in Laravel at `/api/services`.

### Step 1: Define Types (Optional but Recommended)

Add to `src/types/pages.ts`:

```typescript
export interface ServicesPageContent {
  page_title: string;
  services_heading: string;
  services_description: string;
}

export interface ServicesPageSection {
  type: "service-list" | "pricing" | string;
  items?: Array<{
    id: number;
    name: string;
    price: string;
    description: string;
  }>;
}
```

### Step 2: Create the Page

Create `src/app/services/page.tsx`:

```typescript
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchPageData } from "@/lib/api";
import { generatePageMetadata } from "@/lib/meta";
import { resolveImageUrl } from "@/lib/image";
import type { ServicesPageContent, ServicesPageSection } from "@/types/pages";

const PAGE_NAME = "services"; // ← Laravel endpoint slug

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageData<ServicesPageContent, ServicesPageSection[]>(PAGE_NAME);
  if (!data) return { title: "Not Found" };
  return generatePageMetadata(data.meta_desc);
}

export default async function ServicesPage() {
  const data = await fetchPageData<ServicesPageContent, ServicesPageSection[]>(PAGE_NAME);
  if (!data) notFound();

  const { content, sections } = data;

  return (
    <main>
      <h1>{content.services_heading}</h1>
      <p>{content.services_description}</p>
      
      {sections?.map((section, i) => (
        <div key={i}>
          {section.type === "service-list" && (
            <ul>
              {section.items?.map((item) => (
                <li key={item.id}>
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </main>
  );
}
```

### Step 3: Done! 🎉

That's it. No API configuration changes needed. The system automatically:
- Fetches from `http://127.0.0.1:8000/api/services`
- Sends the `lang: eng` header
- Generates SEO metadata
- Handles 404s

---

## 🔧 Configuration

All configuration is centralized in `.env.local`:

```env
# Laravel backend URL (no trailing slash)
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000

# Your Next.js site URL (for canonical URLs and OG images)
NEXT_PUBLIC_SITE_URL=https://www.tntcreators.com

# Site name (used in metadata fallbacks)
NEXT_PUBLIC_SITE_NAME=TNT Creators
```

**Production Example:**
```env
NEXT_PUBLIC_API_BASE_URL=https://api.tntcreators.com
NEXT_PUBLIC_SITE_URL=https://www.tntcreators.com
```

---

## 🛡️ Error Handling

### 404 (Page Not Found)
```typescript
const data = await fetchPageData("non-existent-page");
if (!data) notFound(); // Triggers Next.js 404 page
```

### 500 (Server Error)
```typescript
try {
  const data = await fetchPageData("home-page");
} catch (error) {
  console.error("API Error:", error);
  // Handle error (show error UI, retry, etc.)
}
```

### Missing Images
```typescript
// Safe: returns empty string if path is null/undefined
<Image src={resolveImageUrl(item.image)} alt="" />
```

---

## 📊 Laravel API Response Structure

Every Laravel endpoint should return this shape:

```json
{
  "content": {
    "page_title": "Home",
    "hero_heading": "Welcome to TNT",
    "hero_subheading": "Join 47,000+ creators",
    "hero_cta_label": "Get Started",
    "hero_cta_url": "/apply"
  },
  "meta_desc": {
    "meta_title": "TNT Creators - Home",
    "meta_description": "Join the creator economy",
    "og_image": "/storage/images/og-home.jpg",
    "og_type": "website",
    "canonical_url": "/home",
    "twitter_card": "summary_large_image"
  },
  "sections": [
    {
      "type": "slider",
      "title": "Featured Creators",
      "items": [
        {
          "id": 1,
          "title": "Creator 1",
          "description": "Made $22K in month 3",
          "image": "/storage/images/creator1.jpg"
        }
      ]
    },
    {
      "type": "testimonials",
      "items": [...]
    }
  ]
}
```

---

## 🎨 Styling

The example page (`src/app/home/page.tsx`) uses semantic HTML. Add your styles:

### Option 1: Tailwind CSS
```typescript
<h1 className="text-4xl font-bold text-gray-900">
  {content.hero_heading}
</h1>
```

### Option 2: CSS Modules
```typescript
import styles from "./page.module.css";

<h1 className={styles.heroHeading}>
  {content.hero_heading}
</h1>
```

### Option 3: Styled Components
```typescript
import styled from "styled-components";

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 900;
`;

<Heading>{content.hero_heading}</Heading>
```

---

## 🚀 Performance

### ISR (Incremental Static Regeneration)
Pages revalidate every 60 seconds by default. Change in `src/lib/api.ts`:

```typescript
next: { revalidate: 60 }, // Seconds
```

**Options:**
- `revalidate: 0` → No cache (always fetch fresh)
- `revalidate: 3600` → Revalidate every hour
- Remove `next` option → Full static caching (build time only)

### Image Optimization
Next.js automatically optimizes images. Use the `Image` component:

```typescript
import Image from "next/image";

<Image 
  src={resolveImageUrl(item.image)} 
  alt={item.title}
  width={800}
  height={450}
  priority // For above-the-fold images
/>
```

---

## 🧪 Testing

### Test API Connection
```bash
curl -H "lang: eng" http://127.0.0.1:8000/api/home-page
```

### Test Next.js Page
```bash
npm run dev
# Visit: http://localhost:3000/home
```

### Test 404 Handling
Visit a non-existent page: `http://localhost:3000/fake-page`

---

## 🔄 Migration from Existing Code

If you have existing pages (like the current `src/app/page.tsx`), you can:

1. **Keep the old page** and gradually migrate sections
2. **Create a new route** (e.g., `/home`) using the dynamic system
3. **Replace the old page** entirely once tested

**Example: Gradual Migration**
```typescript
// src/app/page.tsx (existing)
export default function OldHomePage() {
  // Keep existing hardcoded content
}

// src/app/home/page.tsx (new dynamic version)
export default async function NewHomePage() {
  const data = await fetchPageData("home-page");
  // Use Laravel data
}
```

---

## 📝 Best Practices

1. **Type Safety**: Always define TypeScript types in `src/types/pages.ts`
2. **Error Boundaries**: Wrap pages in error boundaries for production
3. **Loading States**: Add `loading.tsx` files for better UX
4. **Accessibility**: Use semantic HTML and ARIA labels
5. **SEO**: Always implement `generateMetadata()`
6. **Images**: Use Next.js `Image` component for optimization
7. **Environment Variables**: Never commit `.env.local` to git

---

## 🐛 Troubleshooting

### "Failed to fetch page"
- Check Laravel backend is running: `php artisan serve`
- Verify `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
- Check CORS settings in Laravel

### Images not loading
- Verify image paths in Laravel response
- Check `NEXT_PUBLIC_API_BASE_URL` is correct
- Ensure Laravel storage is publicly accessible

### Metadata not showing
- Check `meta_desc` object in Laravel response
- Verify `generateMetadata()` is exported
- Test with browser dev tools (View Page Source)

### TypeScript errors
- Run `npm run build` to check for type errors
- Ensure types in `src/types/pages.ts` match Laravel response

---

## 🎓 Summary

**What You Built:**
- ✅ Single API client for all Laravel pages
- ✅ Automatic SEO metadata generation
- ✅ Image URL resolution
- ✅ Type-safe page content
- ✅ 404 handling
- ✅ Scalable architecture

**What You Gained:**
- 🚀 Add new pages without touching Next.js API logic
- 🔧 Change backend URL in one place
- 📈 SEO-optimized by default
- 🛡️ Type-safe development
- ⚡ Built-in performance optimization (ISR)

**Next Steps:**
1. Test the `/home` route
2. Add your second page (e.g., `/services`)
3. Customize styling
4. Deploy to production

---

## 📚 Additional Resources

- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [TypeScript with Next.js](https://nextjs.org/docs/app/building-your-application/configuring/typescript)

---

**Questions?** Check the example implementation in `src/app/home/page.tsx` for a complete working reference.
