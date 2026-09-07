# AIFA Website Standard v1.0

This is the canonical quality standard for public AI Fusion Automations websites.

## Audience and promise

The primary visitor is a UK owner-led service business losing time, leads, or customer trust between inboxes, calendars, CRM records, spreadsheets, and repetitive admin. Within five seconds the page must say what AIFA fixes, who it helps, and what the visitor should do next.

Canonical positioning: **AIFA designs and builds practical AI systems that stop leads, customer messages, and important work falling through the gaps.**

## Measurable release gates

1. **Comprehension:** the homepage hero names the audience, problem, approach, and primary action without jargon; its CTA is visible at 320px, 768px, and 1440px.
2. **Brand:** canonical pages use the Fusion Flow mark, ink/navy surfaces, magenta primary and cyan accent, consistent typography, spacing, controls, navigation, and footer.
3. **Conversion:** every indexed commercial page has one clear route to the 15-minute opportunity call; no CTA returns 4xx; conversion clicks emit `book_call_click` or `generate_lead` to `dataLayer`.
4. **Credibility:** claims are specific and traceable to existing evidence; no invented metrics, credentials, team size, guarantees, or customer identities.
5. **Responsive:** no horizontal overflow or clipped primary content at 320, 375, 768, 1024, and 1440 CSS pixels; tap targets are at least 44px.
6. **Accessibility:** keyboard-visible focus, skip link, semantic `main`, one H1, labelled navigation and frames, reduced-motion support, and Lighthouse accessibility >=95 on key routes.
7. **SEO:** every indexable page has a unique title, description, self-canonical, index directive, and sitemap entry; legacy/noindex pages are excluded. Homepage has valid Organization, WebSite, and ProfessionalService JSON-LD.
8. **Performance:** homepage mobile Lighthouse performance >=90, LCP <=2.5s, CLS <=0.1, and TBT <=200ms; no autoplay media or render-blocking third-party widget in the first viewport.
9. **Privacy/security:** HTTPS only; no customer data in source, analytics payloads, URLs, or logs; forms disclose their CRM destination and link to privacy policy; external tabs use `noopener`; browser-exposed integration keys are domain/API restricted.
10. **Analytics:** preserve GTM `GTM-5JSZNZ4Q`, Meta Pixel `630094975903061`, and AIFA's event layer; verify page view, CTA, booking, email, telephone, and form-view events without creating test leads.
11. **Reliability:** zero broken internal links, zero console errors on representative journeys, a helpful 404, and working form/calendar embeds without production submissions.
12. **Maintainability:** shared tokens/navigation/footer, automated static and browser tests, CI quality gates, documented deployment, and rollback to the preceding `main` SHA.

## Visual system

- Ink `#070b18`; navy `#0d1427`; elevated navy `#141d34`; white `#f8fafc`; muted `#a9b4c8`.
- Primary magenta `#e60ba0`; light magenta `#ff7acb`; cyan `#22d3ee`; success `#34d399`.
- Text measure: 68 characters. Content width: 1180px. Section rhythm: `clamp(4rem, 8vw, 7rem)`.
- Radius: 12px controls, 20px cards. Motion communicates state and is disabled under `prefers-reduced-motion`.

## Intentional exceptions

- Interactive tools and BoxLeague Pro retain product-specific working surfaces; the AIFA shell, privacy rules, and conversion tracking still apply.
- Video-player routes may omit the global footer, but require canonical metadata and an accessible return route.
- Historical editorial pages may retain article styling, but receive the shared shell, accessibility foundation, analytics, canonical metadata, and conversion path.
- GitHub Pages controls response headers. Unsupported security headers are recorded as hosting limitations rather than simulated with brittle meta policies.
