# DEEP FIELD — Tony Zhao

A portfolio built as a cinematic product experience rather than a resume.
The home page flies a camera around the TZ-100 — an invented neural
accelerator rendered as real geometry, orbited by a ring of data packets and a
field of tumbling silicon. Case studies live on their own routes with a
lighter CSS backdrop, and Moo, a tuxedo-cat astronaut AI co-pilot, rides along
on every page.

**Reference language:** Interstellar · NASA mission control · Apple product
pages · Love, Death & Robots · Awwwards-grade motion.

---

## Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | Static export-friendly, first-class metadata & font pipeline |
| Styling | Tailwind CSS + a bespoke design system in `app/globals.css` | Tailwind for layout; the HUD/typographic system is too custom for utilities alone |
| 3D | Three.js (raw, no wrapper) | One WebGL context, two passes, zero reconciliation overhead in the render loop |
| Scroll choreography | GSAP + ScrollTrigger | Pinning, scrubbing and the camera flight need timeline control |
| Element motion | Framer Motion | Declarative viewport reveals live closer to the JSX |
| Type | `next/font/local` (self-hosted woff2) | No third-party requests, no build-time network dependency |

Deliberately mixed: GSAP owns anything **scrubbed against scroll position**
(the pipeline spine, the pinned timeline, the camera). Framer Motion owns
anything **triggered by entering the viewport** (reveals, counters, meters).

---

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start
```

Deploys to Vercel with zero configuration.

---

## Architecture

```
app/
  layout.tsx              metadata, JSON-LD, fonts, nav, Moo
  page.tsx                home
  work/page.tsx           mission archive
  work/[slug]/page.tsx    case study (prerendered per project)
  about/  contact/        standalone pages
  api/chat/route.ts       Moo's model call (server builds only)
  globals.css             design tokens + component layer
components/
  home/HomeExperience.tsx composition root for the home page
  background/
    Silicon.tsx           Three.js renderer, imperative flyTo handle
    Atmosphere.tsx        veil / dimmer / grid / scanlines / grain
  hud/
    Boot.tsx  Nav.tsx  Rails.tsx  Cursor.tsx
  primitives/
    Reveal.tsx  SplitHeading.tsx  Counter.tsx  Meter.tsx
  case/                   shared case-study renderer + block components
  cards/                  project card + SVG project previews
  work/MissionArchive.tsx filterable archive
  assistant/              Moo
  layout/PageShell.tsx    frame for non-home routes
  sections/               Hero · Skills · Contact
lib/
  content.ts              site-level copy (identity, nav, about, contact)
  ai/                     Moo's knowledge, moderation, provider, answering
  basePath.ts             asset prefixing for GitHub Pages
  camera.ts               the flight path (one state per sector)
  rendererStore.ts        imperative handle registry
  silicon/
    palette.ts            seeded RNG + canvas helpers
    textures.ts           procedural die, substrate, pad array, env
    scene.ts              hero package, data ring, chip field, dust
    rig.ts                uniforms → real camera move
    background.glsl.ts    deep-field + dust shaders
  useSectorDirector.ts    scroll → camera + HUD binding
```

### Why the renderer isn't in React state

The WebGL loop runs at 60fps and mutates uniforms every frame. Routing that
through React would mean 60 renders a second for values no component reads.
`Silicon.tsx` registers a small imperative handle (`flyTo`, `setDust`) in
`lib/rendererStore.ts`; `useSectorDirector` calls it from ScrollTrigger.
React only ever holds the two values the HUD actually displays.

### The silicon

Nothing on the TZ-100 is an image asset. `lib/silicon/textures.ts` draws every
surface into a canvas at runtime — compute clusters, the cache fabric seam,
PHY teeth, routing traces, the gold pad ring, discretes, silkscreen, and the
LGA pad array on the underside. A seeded RNG means the die is identical on
every load, so the package reads as one designed part rather than noise.

The package is real geometry: substrate, interposer, die and eight memory
lids. Around it, an instanced ring of data packets orbits in the XZ plane —
which is why a low camera elevation reads edge-on, the one gesture carried
over from the original accretion-disk composition. A second instanced mesh
streams smaller chips past the camera; `uWarp` drives how hard.

Metal needs something to reflect, so `studioEnvironment()` bakes a 6×64px cube
map — a warm key strip, a cool fill, a dark floor. A real HDR would triple the
bundle for no visible gain at these sizes.

### Why the uniforms are still called uZoom / uTilt / uWarp

They were shader uniforms before the subject became geometry. `lib/silicon/rig.ts`
now maps them onto an actual camera: `uZoom` to dolly distance, `uOffset` to a
pan in camera space (so it still means "screen half-heights"), `uTilt` to
elevation. Keeping the contract meant the flight path in `lib/camera.ts` and
the whole scroll choreography survived the change of subject untouched.

---

## Routes

| Route | What it is |
|---|---|
| `/` | Cinematic overview: hero, positioning, four project cards, capabilities, Moo, about preview, contact |
| `/work` | Mission archive — filterable database view of every case study |
| `/work/ai-teacher-platform` | AI Teacher Growth Platform |
| `/work/early-childhood-educator-os` | Early Childhood Educator OS |
| `/work/enterprise-logistics-saas` | Enterprise Logistics SaaS |
| `/work/calories-fitness-app` | Calories — Fitness Tracking App |
| `/about` | Profile, approach, capabilities, strengths, experience |
| `/contact` | Contact detail and what Tony is available for |
| `/api/chat` | Moo's model call — **server builds only**, see below |

Every case study is prerendered via `generateStaticParams`, so direct URLs and
refreshes work without a router fallback.

---

## Content architecture

Case-study copy is data, never markup:

```
content/
  types.ts                 the CaseStudy model and the block union
  projects/
    index.ts               display order, lookup, prev/next, categories
    ai-teacher-platform.ts
    early-childhood-educator-os.ts
    enterprise-logistics-saas.ts
    calories-fitness-app.ts
```

Each project declares an ordered list of blocks — `prose`, `list`, `pillars`,
`flow`, `features`, `stack`, `note` — and `components/case/Blocks.tsx` switches
on `kind`. **Adding a project is one content file plus one line in
`index.ts`.** No component changes, no new route file.

Two rules hold across the whole directory:

1. **No invented metrics.** Where a number was never verified the copy says
   what was intended or delivered, never what it achieved. Several case
   studies carry an explicit "On the numbers" note saying so.
2. **No client identities.** Public sector labels only.

---

## Moo, the AI co-pilot

```
lib/ai/
  knowledge.ts    builds a passage index from content/ + lib/content — the
                  assistant's only source of truth
  moderation.ts   decides when Moo hisses (injection, abuse, fabrication,
                  off-topic, nonsense) — deliberately hard to trigger
  provider.ts     provider-agnostic OpenAI-compatible client + response
                  validation
  answer.ts       moderation → retrieval → model, with local fallback
  suggestions.ts  starter questions, chosen per route
components/assistant/
  Moo.tsx           orchestration and art states
  ChatPanel.tsx     the console UI, focus trap, sources
  useMooEmotion.ts  idle / purring / hiss state machine
  useMooAudio.ts    synthesised purr and meow (no audio files)
```

**It works with no API key.** Without one, answers come from the local
retrieval index in the browser — which is exactly what happens on GitHub
Pages, since a static export has no server. Setting a key upgrades those
answers from retrieved passages to generated prose; nothing else changes.

The model can only ever see passages built from published site content, so
"never invent" is a property of the architecture rather than a hopeful line in
a prompt.

Audio is **muted by default**, synthesised with WebAudio rather than shipped
as files, and the AudioContext is not constructed until the visitor's first
click — so autoplay is impossible by construction. The mute preference
persists in `localStorage`.

### Environment variables

Copy `.env.example` to `.env.local`. All of them are optional.

| Variable | Purpose |
|---|---|
| `AI_API_KEY` | Server-side model key. No `NEXT_PUBLIC_` prefix, so Next refuses to inline it into the browser bundle. |
| `AI_BASE_URL` | Any OpenAI-compatible endpoint. Defaults to `https://api.deepseek.com`. |
| `AI_MODEL` | Model name. Defaults to `deepseek-chat`. |
| `AI_TIMEOUT_MS` | Milliseconds before falling back to local retrieval. Defaults to 20000. |

**Never commit a real key.** `.env` and `.env.local` are git-ignored.

### Cat assets

`public/assistant/moo-{idle,purring,hissing}.{webp,png}` — cut from a single
supplied sprite sheet, background removed to transparency, trimmed and scaled
to 320px tall. 84 KB total for all three WebPs.

---

## Build modes

The site is static by default and needs a server only for Moo's model call, so
`next.config.mjs` has two modes:

| Mode | Trigger | Result |
|---|---|---|
| Static | default, and what the Pages workflow runs | `output: "export"`, `/api/chat` excluded, Moo answers locally |
| Server | `NEXT_STATIC_EXPORT=false`, or `VERCEL` | normal build, `/api/chat` included, Moo can call a model |

A static export cannot contain a route handler. Pages here are all `.tsx` and
the chat route is the only `.ts` file under `app/`, so the static build drops
`ts` from `pageExtensions` and excludes exactly that file — without moving it
out of the repository.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export into ./out
```

`npm run build` writes plain HTML/CSS/JS to `out/` — no server, no runtime.
You can open `out/index.html` behind any static host.

---

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
static export and publishes it to GitHub Pages. Nothing else to run.

**Live:** https://bottony329.github.io/mypersonalportfolio/

The workflow enables Pages on first run (`actions/configure-pages` with
`enablement: true`), so there is no manual switch to flip in Settings. If the
first run fails on permissions, set *Settings → Actions → General → Workflow
permissions* to **Read and write**, then re-run it from the Actions tab.

### The basePath

A GitHub project site is served from `/<repo>/`, not `/`. `next.config.mjs`
adds that prefix only when `GITHUB_PAGES=true` (which the workflow sets), so
local dev and local builds stay at `/`.

Switching to a custom domain later is two changes: put the domain in
`public/CNAME`, and set `NEXT_PUBLIC_BASE_PATH: ""` in the workflow's build
step. Nothing in the components refers to the prefix directly.

### Hosting somewhere else

The same repo deploys to Vercel or Netlify with no changes — point them at it
and they will run `npm run build`. On those hosts drop `basePath`, since they
serve from the root.

---

## Adding a page

App Router, statically exported, so a new page is one file:

```
app/about/page.tsx     ->  /about/
app/writing/page.tsx   ->  /writing/
```

```tsx
export const metadata = { title: "About — Tony Zhao" };

export default function About() {
  return <main className="wrap">…</main>;
}
```

Push it and the workflow publishes it. Three things worth knowing:

- **Keep the shared chrome.** `components/Experience.tsx` is the composition
  root for the home page and owns the renderer, HUD and scroll director. A new
  page that wants the same background should mount `<Silicon />` and
  `<Atmosphere />` itself, or lift them into `app/layout.tsx`.
- **The scroll director expects its sectors.** `lib/useSectorDirector.ts`
  resolves the camera from section ids listed in `lib/camera.ts`. On a page
  without those sections it simply holds the hero state — harmless — but if
  you want its own flight path, add sector entries and ids to match.
- **`trailingSlash: true`** means links should point at `/about/`, not
  `/about`. Next handles this for `<Link>`; only hand-written `<a href>` needs
  care.

---

### Editing content

Site-level copy lives in `lib/content.ts`. Project copy lives in
`content/projects/*.ts`. Both are data — adding a mission, a workflow step or
a timeline stage never requires a component edit.

### Tuning the flight path

`lib/camera.ts` holds one `CameraState` per sector: zoom, offset, disk
intensity, tilt, lensing warp and how much the dimming veil closes. Narrow
viewports scale the whole path via `viewportScale()` rather than re-authoring it.

---

## Accessibility & performance

- `prefers-reduced-motion` disables the renderer and every animation.
- Pixel ratio capped at 1.6; particle count halves below 760px; rendering pauses
  when the tab is hidden.
- Semantic landmarks, real heading order, focusable nav, `aria-expanded` on the
  mobile menu, decorative layers marked `aria-hidden`.
- Person JSON-LD, OpenGraph and Twitter metadata in `app/layout.tsx`.
- First load JS ≈ 308 kB (Three.js dominates); zero third-party requests.

---

## Before publishing

1. Replace the LinkedIn placeholder in `lib/content.ts` (`IDENTITY.linkedin`).
2. Add `public/og.jpg` (1200×630) and point `metadata.openGraph.images` at it.
3. Set the canonical URL in `app/layout.tsx` once the domain is live.

---

## Also included

`tony-zhao-deep-field.html` — the entire experience as one self-contained file
with Three.js, GSAP and the fonts inlined. No build step, no server, no network.
Useful for emailing, USB handoff, or opening on a machine with nothing installed.
