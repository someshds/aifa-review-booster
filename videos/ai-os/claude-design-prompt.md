# Claude Design prompt — AIFA AI Operating Systems promo

Paste this into claude.ai's Claude Design (click "Design" in the sidebar → new project → choose "Animation" from templates) to get the authentic Claude Design build.

---

## The prompt

```
Build a 77.5-second landscape (1920x1080) animated promo video for my AI consultancy "AI Fusion Automations" (AIFA). The service is called "AI Operating Systems for Small Business."

Brand identity:
- Palette: deep purple #5b21b6, mid purple #7c3aed, light purple #a78bfa, cream #f5f3ff, canvas #0a0612 (purple-tinted black)
- Typography: Inter (900 for hero, 800 for body) with chrome gradient (white→light purple→mid purple) for all hero text
- Tone: confident, practical, premium — not gimmicky AI-hype
- Aesthetic: modern, minimalist, subtle perspective grid + purple halo on canvas

Narration file: I'll upload narration.mp3 (71.5s, Charlotte UK female voice). Narration plays 3s–74.5s inside the composition. Before and after narration, show intro and outro bumpers (3s each).

Scene-by-scene timeline (anchored to narration word-onsets):

1. INTRO BUMPER (0–3s): "AI Fusion Automations" wordmark + "AI Operating Systems" uppercase eyebrow, centered with animated concentric-ring mark above
2. OPENING HOOK (3–11.78s): "Most small businesses don't need another tool." then "They need the right A.I. — wired to the systems you already have."  Emphasize "right A.I." with purple glow
3. SERVICE NAME (11.78–14.70s): Eyebrow "This is", hero title "A.I. OPERATING SYSTEM", subtitle "— is what we build."
4. ANTI-CHATBOT (14.70–17.28s): Chat bubble icon with red X slam; label "NOT"; body "a chatbot bolted onto your website."
5. ANTI-DEMO (17.28–19.94s): Demo-screen icon (laptop window with play triangle) with red X slam; label "NOT"; body "a shiny demo you watched at a conference."
6. VISION (19.94–30.10s): Hero "ALWAYS-ON", subtitle "across your whole business —", then 4 staggered pill cards: Captures every lead · Books every call · Follows up every quote · Flags what matters
7. BUILD IT (30.10–31.89s): Eyebrow "Here's", huge title "HOW WE BUILD IT", triple arrow "→ → →"
8. MAP (31.90–39.30s): Left side — "01 / MAP" counter, huge "MAP" hero, subtitle about enquiries/handoffs/slipping through cracks. Right side — 5-node flow graph with one node broken (red) and ✗ crack marks
9. WIRE (39.30–53.72s): "02 / WIRE" + hero "WIRE IT IN"; 5 feature cards stagger in one by one: Voice AI, Lead Scoring, Workflows, Review Replies, Bookings; finale "— all of it, connected."
10. TRAIN (53.72–58.60s): Left — AI brain (pulsing purple orb with 2 rotating rings). Right — "03 / TRAIN", hero "TRAIN IT", 3 pills: Your services · Your tone · Your edge cases
11. RUNS (58.60–67.31s): Hero "IT RUNS." + day/night with sun + moon icons, then 3 red "STOP" cards: dropping leads / missing calls / losing revenue
12. SUMMARY (67.32–71.10s): "One operating system." + "Your whole business, covered." with "covered" glowing purple
13. CTA (71.10–74.50s): "Start here" eyebrow, "Book a free strategy call" headline, "Book a Call →" purple gradient pill button, URL "→ aifusionautomations.com", phone "+44 7480 488817 · grant@aifusionautomations.com"
14. OUTRO BUMPER (74.50–77.50s): Large wordmark "aifusionautomations.com" + AIFA tagline

Motion style:
- Each scene fades in with a subtle upward slide (y: 16px → 0px) over ~0.5s
- Stagger internal elements by 0.15s each
- Use a persistent subtle perspective grid + purple halo + vignette backdrop throughout
- No whip-streak transitions — keep it clean/corporate
- Scene transitions: fade + blur swap between adjacent slides

Please build this as a single timeline animation I can render to MP4 via the Claude Code hand-off.
```

---

## Why this prompt works

- Upfront **brand-system block** so Claude Design uses AIFA colors/fonts on every slide automatically.
- Scene-by-scene **timing table anchored to real narration onsets** (no guesses — Whisper-extracted).
- Explicit **aesthetic intent** ("no whip-streaks, keep it clean/corporate") so the output differs from the motion-graphics-heavy Hyperframes/Remotion builds.
- Narration file is attached separately (upload `narration.mp3` when prompted).
- Ends with the **render hand-off** request so Claude Design gives you the command to paste into Claude Code for an MP4.

## Compare to the local HTML version

The local file at `./index.html` mimics the Claude Design aesthetic — fade-in slides, Tailwind layout, purple gradient canvas, single-file standalone. Open it in Chrome (file://... or via `npx serve .`) and click play. The real Claude Design output will have smoother motion, better-placed elements, and can be iterated on inside the timeline editor — things I can't produce from Claude Code alone.
