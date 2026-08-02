import type { CaseStudy } from "../types";

/**
 * Sourced from Tony's published landing-page design work plus four supplied
 * screens covering two products. The source documents the role, the overview
 * and a three-phase process; the "system" framing below is drawn from what the
 * screens visibly share, not invented.
 */
export const modularLandingPageSystem: CaseStudy = {
  slug: "modular-landing-page-system",
  mission: "05",
  title: "Modular Landing Page System",
  titleLines: ["Modular Landing", "Page System"],
  summary:
    "One landing-page structure serving multiple app launches — functions, reviews and FAQs in a repeatable layout that re-themes per product instead of being redesigned each time.",
  categories: ["UX & Product Design"],
  year: "Not publicly disclosed",
  status: "completed",
  statusLabel: "Completed · Delivered to development",
  contribution: "Feature analysis, prototype, theme and content design across multiple product launches",
  role: "User Interface Designer",
  preview: "layers",
  accent: "orange",
  featured: true,
  snapshot: {
    role: "User Interface Designer",
    projectType: "Marketing landing pages for mobile app launches",
    timeline: "Not publicly disclosed",
    tools: ["Marketing trend research", "Feature analysis", "Prototyping", "Theme and content design"],
    team: "Client engagement; designs handed to an IT development team for build",
    status: "Delivered to the development team",
  },
  seoDescription:
    "A repeatable landing-page structure for promoting new mobile apps — feature analysis, prototype, theme and content design across multiple product launches.",
  blocks: [
    {
      kind: "prose",
      id: "context",
      label: "Context",
      body: [
        "New apps need somewhere to land. Not a full marketing site — a single page that explains what the product does, shows it working, answers the obvious objections and gets someone to the download button.",
        "The brief covered more than one product, which changes the problem. Designing one landing page is a layout exercise. Designing the second one for a different product is where you find out whether the first was a structure or just a picture.",
      ],
    },
    {
      kind: "pillars",
      id: "problem",
      label: "Design problem",
      items: [
        {
          k: "Different products, same job",
          tone: "orange",
          body: "A campus food app and a fitness app share almost no content, but they need to answer the same sequence of questions in the same order.",
        },
        {
          k: "Redesigning every time is waste",
          tone: "cyan",
          body: "Treating each launch as a blank page means re-solving hierarchy, rhythm and conversion placement for every product.",
        },
        {
          k: "Identity still has to differ",
          tone: "cyan",
          body: "Shared structure cannot mean shared personality. Each product needed to look like itself.",
        },
      ],
    },
    {
      kind: "prose",
      id: "role",
      label: "My role",
      body: [
        "User Interface Designer. My responsibility was analysing the features of the apps, then designing the prototype, the theme and the content.",
        "The finished designs were refined against client feedback and handed to an IT development team to build.",
      ],
    },
    {
      kind: "list",
      id: "responsibilities",
      label: "Responsibilities",
      items: [
        "Conducted marketing trend research",
        "Analysed the features of each app to decide what the page needed to communicate",
        "Conducted design idea research",
        "Designed the page prototype",
        "Designed the theme for each product",
        "Designed the page content and copy structure",
        "Enhanced the design according to client feedback",
        "Delivered the designs to the IT development team",
      ],
    },
    {
      kind: "flow",
      id: "process",
      label: "Design process",
      variant: "timeline",
      intro: "Three phases: research, design, and enhancement to handover.",
      steps: [
        { name: "Marketing trend research", desc: "Looked at how comparable products were presenting themselves before deciding how these should." },
        { name: "Feature analysis", desc: "Worked through each app's features to identify the few worth putting on a landing page — the ones that would make someone download." },
        { name: "Design idea research", desc: "Gathered visual and structural directions to work from rather than starting from a blank canvas." },
        { name: "Prototype design", desc: "Established the page structure: hero, functions, reviews, FAQ, conversion." },
        { name: "Theme design", desc: "Gave each product its own palette and personality within that structure." },
        { name: "Content design", desc: "Wrote and arranged the content so the page argues rather than just lists." },
        { name: "Client enhancement", desc: "Refined the designs according to client feedback." },
        { name: "Development handover", desc: "Delivered the finished designs to the IT development team for build." },
      ],
    },
    {
      kind: "media",
      id: "screens",
      label: "The system across two products",
      layout: "wide",
      intro:
        "The same structural sequence, themed twice: a campus food discovery app in bright cyan and blue, and a fitness app in near-black and teal.",
      items: [
        {
          src: "/work/landing-fitness-hero.webp",
          alt: "Dark landing page for an app called F Fitness, with a teal and white headline reading 'Find fitness near you — Fitness As Your Wish', a Download now button, a tilted phone showing a live map with a Stop control, and a strip reading 'Register Today To Find Your Fit'.",
          caption: "Fitness product: same hero structure, near-black theme, teal accent.",
          width: 1500,
          height: 963,
        },
        {
          src: "/work/landing-taste-hero.webp",
          alt: "Bright landing page for TasteUnimelb with the headline 'Find food with inspiration — Eat As Your Wish', a Download now button, a phone showing the app's food discovery home screen, and a banner reading 'Register Today To Find Your Fit'.",
          caption: "Food product: identical hero skeleton, cyan and blue theme.",
          width: 1500,
          height: 964,
        },
        {
          src: "/work/landing-taste-functions.webp",
          alt: "A functions section headed 'Our Functions' explaining 'Search Like Tinder' — swiping right on dishes from around the university — with a phone mockup showing the swipe interface, followed by a 'Pick-up in 1 second' section with a QR code screen.",
          caption: "Functions: alternating text and device, one capability per row.",
          width: 1500,
          height: 961,
        },
        {
          src: "/work/landing-taste-reviews.webp",
          alt: "A reviews section headed 'Our Review' with two testimonial cards showing photographs and placeholder text attributed to Jack and Austin, above a 'Frequent asked question' section with an expandable question reading 'Can I change my preference?'.",
          caption: "Social proof then objection handling — the last two blocks before conversion.",
          width: 1500,
          height: 960,
        },
      ],
    },
    {
      kind: "stack",
      id: "structure",
      label: "The page structure",
      intro:
        "The sequence every page follows. It is deliberately an argument, not a list — each block answers the question the previous one raises.",
      layers: [
        { k: "01 · Hero", tone: "orange", body: "Product name, a claim in two lines, a supporting line, and the download action — visible without scrolling" },
        { k: "02 · Conversion strip", tone: "cyan", body: "A full-width band restating the invitation, catching anyone already convinced" },
        { k: "03 · Functions", tone: "orange", body: "One capability per row, alternating text and device mockup, so the page has rhythm rather than a wall of features" },
        { k: "04 · Reviews", tone: "cyan", body: "Social proof, placed after the product has been explained and not before" },
        { k: "05 · FAQ", tone: "orange", body: "Expandable answers to the objections that stop a download" },
        { k: "06 · Close", tone: "cyan", body: "Final conversion and contact" },
      ],
    },
    {
      kind: "features",
      id: "decisions",
      label: "What makes it a system",
      items: [
        {
          name: "Structure is fixed, theme is not",
          desc: "Both products run the identical block sequence. What changes is palette, typography weight and imagery — which is why the second page took a fraction of the effort of the first.",
        },
        {
          name: "Feature analysis decides the content",
          desc: "Each row of the functions section comes from the analysis step, so the page shows the capabilities that sell the product rather than everything it does.",
        },
        {
          name: "Devices carry the proof",
          desc: "Every claim is paired with a screen showing it. The page never asks the visitor to take a feature on trust.",
        },
        {
          name: "Objections handled last",
          desc: "The FAQ sits immediately before the final call to action, where the remaining hesitation actually is.",
        },
        {
          name: "Built to hand over",
          desc: "A repeating block structure is far easier for a development team to implement as components than a bespoke layout per product.",
        },
      ],
    },
    {
      kind: "note",
      id: "gaps",
      label: "What is not documented",
      tone: "orange",
      body: "The source does not record the timeline, team, design tooling, conversion results, or whether the pages went live. Review content in the supplied screens is placeholder text from the design stage, not real testimonials.",
    },
    {
      kind: "prose",
      id: "lessons",
      label: "Reflection",
      body: [
        "The second product is where a layout becomes a system. Designing the food app's page raised a set of decisions — where proof goes, when to ask for the download, how many features is too many — and the fitness page tested whether those decisions were about landing pages generally or about that one product specifically. Most of them held.",
        "The other thing it taught me is that handover shapes design. Knowing an IT team would build this from the designs pushed me towards a repeating block structure, which was better for them to implement and, as it turned out, better for the visitor to read.",
      ],
    },
  ],
};
