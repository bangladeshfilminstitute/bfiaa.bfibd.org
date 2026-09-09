# SEO Action Plan

## Prioritized Fixes

1. **Schema.org Integration** (Completed)
   - *Impact*: High (Improves Knowledge Graph appearance and rich snippets).
   - *Fix*: Added `Organization` JSON-LD schema markup to `<head>` detailing association name, logo, URL, and contact email.

2. **Open Graph Metadata** (Completed)
   - *Impact*: Medium (Improves social sharing previews).
   - *Fix*: Added `og:image` meta tags to ensure sharing the site link populates a thumbnail (the BFIAA logo). Added explicit OG tags for the constitution page.

3. **Favicon Integration** (Completed)
   - *Impact*: Low (Brand visibility on SERPs and browser tabs).
   - *Fix*: Added `<link rel="icon" type="image/png" href="images/bfiaa-logo.png"/>` to all pages.

4. **Mobile Responsiveness Verification** (Completed)
   - *Impact*: High (Mobile-First Indexing).
   - *Status*: Verified. Grid components (`about-grid`, `gallery-grid`, `membership-types`, `contact-grid`) gracefully degrade to `1fr` structures on smaller viewports.

5. **Sitemap & Robots.txt** (Completed)
   - *Impact*: High (Crawlability).
   - *Status*: Already present with optimal configurations (`changefreq` and `priority` directives).
