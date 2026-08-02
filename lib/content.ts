/**
 * Site-level copy: identity, navigation, positioning, the journey, the
 * independent product lab, and the About page.
 *
 * Project copy does not live here — each case study owns its own file under
 * `content/projects/`, so a project can be added or edited without this file
 * changing at all.
 *
 * One narrative rule governs everything below. The story is:
 *
 *   Information Systems → UX & product thinking → enterprise digital
 *   transformation → business analysis → AI product development →
 *   independent SaaS builder
 *
 * Warehouse and forklift work is a *supporting thread* — it funded the
 * learning and the products. It is never the starting point of the career and
 * never the thing Tony is defined by. Nothing here should imply outside
 * investment: every independent product was self-funded.
 */

export const IDENTITY = {
  name: "Tony Zhao",
  roles: ["Business Analyst", "AI Product Builder", "Digital Transformation"],
  headline: ["Building intelligent systems that connect", "business strategy, user needs, and AI."],
  email: "tonyzhao32965@gmail.com",
  /* TODO Tony: replace with your public profile URL. */
  linkedin: "https://www.linkedin.com/in/tonyzhao329/",
  etsy: "https://www.etsy.com/shop/DriftDecoStudio",
  location: "Melbourne · AUS",
} as const;

export const SITE_NAV = [
  { href: "/", n: "01", label: "Home" },
  { href: "/work", n: "02", label: "Work" },
  { href: "/journey", n: "03", label: "Journey" },
  { href: "/lab", n: "04", label: "Lab" },
  { href: "/about", n: "05", label: "About" },
  { href: "/contact", n: "06", label: "Contact" },
];

export const POSITIONING = {
  eyebrow: "Professional Positioning",
  heading: ["Information Systems,", "end to end"],
  lede:
    "I studied Information Systems, built enterprise product experience across consulting and SaaS delivery, and have kept building real digital products outside work through disciplined, self-funded experimentation.",
  pillars: [
    {
      k: "Business analysis",
      tone: "orange" as const,
      body: "Turning ambiguity into specification — surfacing the process nobody wrote down, resolving the contradictions between teams, and holding one source of truth steady through delivery.",
    },
    {
      k: "AI product development",
      tone: "cyan" as const,
      body: "Making model capability into product. Workflow design, structured output, guardrails and evaluation — treating AI behaviour as a surface to be specified rather than configured.",
    },
    {
      k: "Digital transformation",
      tone: "cyan" as const,
      body: "Process to platform, end to end. Discovery, prototyping, specification, development support, testing, documentation and handover that leaves a team able to run it alone.",
    },
  ],
};

export interface Skill { name: string; level: number; note: string }

export const SKILLS: Skill[] = [
  { name: "Requirements Analysis", level: 95, note: "Ambiguity → specification" },
  { name: "Product Thinking", level: 92, note: "Intent → scoped modules" },
  { name: "UX", level: 88, note: "Flows, states, decision moments" },
  { name: "Enterprise SaaS", level: 90, note: "Discovery → delivery → handover" },
  { name: "AI Workflow Design", level: 93, note: "Model capability → usable product" },
  { name: "Testing", level: 86, note: "Functional, usability, A/B" },
  { name: "Delivery", level: 89, note: "Specification that survives the build" },
  { name: "System Thinking", level: 88, note: "Modules, contracts, boundaries" },
];

/* ─────────────────────────────────────────────────────────── journey ──── */

export interface JourneyStage {
  phase: string;
  period: string;
  title: string;
  org: string;
  body: string;
  href?: string;
}

export const JOURNEY = {
  eyebrow: "The Journey",
  heading: ["From Information Systems", "to independent builder"],
  lede:
    "Six phases, one direction. Each stage added a capability the next one needed — and the whole thing was paid for along the way.",
  arc: [
    "Information Systems",
    "UX & Product Thinking",
    "Enterprise Digital Transformation",
    "Business Analysis",
    "AI Product Development",
    "Independent SaaS Builder",
  ],
  /* Chronological, because a timeline that reorders itself to fit a story is
     a story rather than a timeline. The capability arc above is the shape;
     this is what actually happened and when. */
  primary: [
    {
      phase: "Information Systems",
      period: "2018 — 2022",
      title: "Bachelor of Commerce, Information Systems",
      org: "Victoria University of Wellington",
      body: "The foundation: how organisations actually use technology, and why most system failures are really organisational failures. Club president of the Asian English Speaking Club and marketing staff at AIESEC alongside the degree.",
    },
    {
      phase: "Information Systems",
      period: "2019",
      title: "Exchange semester, Arts",
      org: "Akita International University, Japan",
      body: "A semester abroad, tutoring Chinese and English alongside study. Working across three languages with students is where the habit of checking that both sides mean the same thing by a word started.",
    },
    {
      phase: "Information Systems",
      period: "2022 — 2024",
      title: "Master of Information Systems",
      org: "University of Melbourne",
      body: "Deepened the systems side and added the analytical toolkit — data modelling, process analysis and the structured methods that underpin business analysis.",
    },
    {
      phase: "Business Analysis",
      period: "2022",
      title: "Business Analysis certification",
      org: "LaiOffer",
      body: "Business analysis with Python and machine learning — taken alongside the master's, and the first formal step toward the analyst side of the work.",
    },
    {
      phase: "Enterprise Digital Transformation",
      period: "2023 — 2024",
      title: "Assistant Consultant",
      org: "Global technology consultancy · Shanghai",
      body: "Enterprise transformation at scale, inside a consultancy that does it for a living. This is where the enterprise logistics SaaS delivery sat — stakeholder facilitation, prototyping, specification, testing and handover.",
      href: "/work/enterprise-logistics-saas",
    },
    {
      phase: "UX & Product Thinking",
      period: "2024",
      title: "Digital Product Designer Intern",
      org: "Sketchli",
      body: "A design agency doing UI/UX and software delivery. Conceptualising, prototyping, user testing and design implementation — the craft layer underneath everything since.",
    },
    {
      phase: "UX & Product Thinking",
      period: "2024 — 2025",
      title: "Freelance UI/UX Designer",
      org: "Self-employed",
      body: "Client work designing web and mobile applications, including the ticketing app, the landing-page system and the usability evaluation published here.",
      href: "/work/digital-ticketing-experience",
    },
    {
      phase: "Business Analysis",
      period: "2024 — 2025",
      title: "Digital Product Designer",
      org: "Syaila Pty Ltd",
      body: "Full-time product work with consultants and clients: gathering project insight, prototyping in Figma, presenting to clients, and analysing requirements for new modules delivered into an existing platform.",
      href: "/work/product-discovery-feature-delivery",
    },
    {
      phase: "Independent SaaS Builder",
      period: "2024 — present",
      title: "Online shop owner",
      org: "DriftDecoStudio · Etsy",
      body: "An independent e-commerce business, self-funded and self-run. Product listings, pricing, fulfilment and customer service — commercial reality rather than a case study.",
      href: "/lab",
    },
    {
      phase: "AI Product Development",
      period: "2026 — present",
      title: "Independent AI SaaS builder",
      org: "Self-employed · Melbourne, remote",
      body: "Building AI-powered SaaS products that help organisations streamline workflows and accelerate digital transformation — working the full lifecycle from business analysis and solution design through to delivery.",
      href: "/lab",
    },
  ] as JourneyStage[],
  support: {
    heading: "The thread that funded it",
    lede:
      "Alongside study and professional work, I kept working part-time in warehouse and forklift operations. It is not the start of the career — it is what paid for the rest of it.",
    steps: [
      {
        name: "Part-time warehouse & forklift work",
        desc: "Shifts around study and full-time roles. Physical, scheduled, unglamorous, and completely reliable as income.",
      },
      {
        name: "Financial independence",
        desc: "No money from a full-time salary went into the experiments, and no outside investment was ever involved. The warehouse income was the budget.",
      },
      {
        name: "Continuous learning",
        desc: "That budget bought certifications, software subscriptions, AI API credits, cloud hosting and domains — the unglamorous line items that make self-teaching possible.",
      },
      {
        name: "Independent product development",
        desc: "And then prototypes, an e-commerce business, and production SaaS. Earn, invest, build, launch, learn, improve.",
      },
    ],
    note:
      "Every independent product on this site was funded this way. No venture funding, no investment, no commercial backing.",
  },
};

/* ─────────────────────────────────────────────── independent product lab ── */

export const LAB = {
  eyebrow: "Independent Product Lab",
  heading: ["Built after work,", "paid for in advance"],
  lede:
    "Real products, shipped independently, funded by part-time warehouse and forklift shifts rather than by a salary or an investor. This is where the learning compounds.",
  cycle: [
    { k: "Earn", body: "Part-time warehouse and forklift shifts around study and full-time work." },
    { k: "Invest", body: "Into certifications, subscriptions, AI API credits, cloud hosting and domains." },
    { k: "Build", body: "Prototypes, storefronts and full-stack products, built end to end." },
    { k: "Launch", body: "Into production, where real users and real constraints apply." },
    { k: "Learn", body: "From what breaks — deployment, cost, reliability, and what nobody uses." },
    { k: "Improve", body: "Feed it back in. The next build starts further along than the last." },
  ],
  products: [
    {
      k: "Early Childhood Educator OS",
      status: "Live in production",
      body: "An AI SaaS workbench for Australian early childhood educators, designed and built end to end and deployed to a managed cloud runtime. The flagship of this lab — and the project that taught me the most about running software rather than writing it.",
      href: "/work/early-childhood-educator-os",
    },
    {
      k: "AI Teacher Growth Platform",
      status: "In development",
      body: "A connected teacher-development system covering preparation, live rehearsal, evaluation and long-term growth tracking.",
      href: "/work/ai-teacher-platform",
    },
    {
      k: "DriftDecoStudio",
      status: "Trading since 2024",
      body: "An independent Etsy storefront. Listings, pricing, fulfilment and customer service — the part of product work that only becomes real when someone pays.",
      href: IDENTITY.etsy,
      external: true,
    },
    {
      k: "E-commerce experiments",
      status: "Ongoing",
      body: "Storefront and platform experiments run to understand conversion, merchandising and the mechanics of selling online first-hand rather than from a case study.",
    },
    {
      k: "This portfolio",
      status: "Live",
      body: "Next.js, TypeScript, Three.js and a retrieval-based AI assistant — built as a product rather than a page, with its own content architecture and deployment pipeline.",
    },
    {
      k: "Experimental prototypes",
      status: "Continuous",
      body: "Smaller AI workflow prototypes built to test an idea quickly. Most are never shown to anyone; that is what makes them cheap enough to be useful.",
    },
  ],
  principles: [
    {
      k: "Ship it, or it did not happen",
      body: "A prototype that never reaches a user teaches you about building. Getting it into production teaches you about hosting, cost, credentials, failure modes and the gap between working and reliable.",
    },
    {
      k: "Constraint is the point",
      body: "A budget that comes from shifts rather than a salary forces genuine prioritisation. You do not add a service because it might be useful when you are personally paying for it monthly.",
    },
    {
      k: "Build the thing you can maintain",
      body: "Independent products have no team behind them. Every dependency, every abstraction and every clever decision is one you will be maintaining alone at some point.",
    },
  ],
};

/* ───────────────────────────────────────────────────────────── about ──── */

export const ABOUT = {
  eyebrow: "Professional Profile",
  heading: ["Business Analyst.", "AI Product Builder."],
  lede:
    "I studied Information Systems, developed enterprise product experience across consulting and SaaS delivery, and have continuously built real digital products outside work through disciplined, self-funded experimentation.",
  intro: [
    "My work sits between two groups that rarely speak the same language. On one side, stakeholders who know their business but describe it in exceptions and shorthand. On the other, engineers who need precision before they can build anything. The value I add is in converting one into the other without losing what mattered.",
    "The path there ran through an Information Systems degree in Wellington, a master's at the University of Melbourne, enterprise transformation work inside a global consultancy, UI/UX design in an agency and freelance, and product delivery at a consultancy in Melbourne. Different contexts, same underlying job: find the real problem, specify it honestly, and stay accountable for what ships.",
    "Alongside all of it I kept working part-time in warehouse and forklift operations, and used that income to fund the learning and the products — certifications, subscriptions, AI credits, hosting, an e-commerce business and, eventually, production SaaS. Nothing on this site was built with outside investment.",
  ],
  approach: [
    {
      k: "Start with the process nobody wrote down",
      body: "The documented process and the real one are rarely the same. The first job is always to surface the difference, because every requirement built on the documented version inherits its gaps.",
    },
    {
      k: "Make it tangible before making it final",
      body: "Written requirements get agreement; prototypes get argument. A clickable screen surfaces constraints that weeks of workshops leave unspoken, which is why prototyping is analysis rather than decoration.",
    },
    {
      k: "Specify AI behaviour like a product surface",
      body: "For an AI product, prompt design, output schema and failure behaviour are what the user experiences. They deserve acceptance criteria, not configuration files.",
    },
    {
      k: "Stay through delivery",
      body: "Writing requirements you will later test yourself, and documenting a system you will later hand over, produces noticeably more honest specification than writing a document you never meet again.",
    },
  ],
  capabilities: [
    { k: "Analysis", items: ["Requirements engineering", "Business process modelling", "Stakeholder discovery & facilitation", "Gap and impact analysis", "Functional decomposition"] },
    { k: "Product", items: ["Product strategy & roadmaps", "PRD authoring", "User journeys & flows", "Prototyping (Figma, Axure RP 9, Sketch)", "Product management"] },
    { k: "AI", items: ["AI workflow design", "Prompt & agent behaviour", "Structured output schemas", "Guardrails and evaluation", "Knowledge-base design"] },
    { k: "Delivery", items: ["Agile delivery support", "Functional testing", "UX A/B testing", "Defect tracking", "Data dictionaries", "User documentation & handover"] },
    { k: "Data", items: ["SQL data modelling", "Query layers", "Power BI dashboards", "Metric definition"] },
    { k: "Build", items: ["Next.js / TypeScript", "Full-stack web applications", "API and integration design", "Containerised deployment"] },
  ],
  education: [
    { period: "2022 — 2024", title: "Master of Information Systems", org: "University of Melbourne" },
    { period: "2018 — 2022", title: "Bachelor of Commerce, Information Systems", org: "Victoria University of Wellington" },
    { period: "2019", title: "Exchange semester, Arts", org: "Akita International University, Japan" },
    { period: "2023", title: "Community Languages certification", org: "Monash University" },
    { period: "2022", title: "Business Analysis certification — Python & machine learning", org: "LaiOffer" },
  ],
  experience: [
    {
      period: "2026 — present",
      title: "Independent AI SaaS builder",
      role: "Self-employed · Melbourne, remote",
      body: "Building AI-powered SaaS products across the full lifecycle — business analysis, solution design, AI workflow prototyping, system architecture, testing and delivery.",
      href: "/lab",
    },
    {
      period: "2024 — present",
      title: "Online shop owner",
      role: "DriftDecoStudio · Etsy",
      body: "An independent e-commerce business, self-funded and self-operated.",
      href: "/lab",
    },
    {
      period: "2024 — 2025",
      title: "Digital Product Designer",
      role: "Syaila Pty Ltd",
      body: "Product discovery and requirement analysis for new modules delivered into an existing digital platform, with prototyping in Figma and client presentation.",
      href: "/work/product-discovery-feature-delivery",
    },
    {
      period: "2024 — 2025",
      title: "Freelance UI/UX Designer",
      role: "Self-employed",
      body: "Web and mobile application design for clients — ticketing, landing-page systems and usability evaluation.",
      href: "/work/digital-ticketing-experience",
    },
    {
      period: "2024",
      title: "Digital Product Designer Intern",
      role: "Sketchli",
      body: "UI/UX design and software delivery in an agency: conceptualising, prototyping, user testing and design implementation.",
      href: "/work/ux-design-evaluation",
    },
    {
      period: "2023 — 2024",
      title: "Assistant Consultant",
      role: "Global technology consultancy · Shanghai",
      body: "Enterprise business transformation, including full-lifecycle business analysis on an aerospace logistics SaaS platform.",
      href: "/work/enterprise-logistics-saas",
    },
    {
      period: "2022 — 2024",
      title: "Administrative Assistant",
      role: "Education provider · Melbourne",
      body: "Customer service and CRM work for a tutoring organisation operating across several Melbourne locations.",
    },
    {
      period: "2022",
      title: "Market Research Interviewer",
      role: "EY",
      body: "Data collection and entry for market research engagements.",
    },
  ],
};

export const CONTACT = {
  eyebrow: "Open Channel",
  heading: ["Let's build the next", "intelligent system."],
  lede:
    "Available for business analysis, AI product design and digital transformation work. Send a signal — I answer everything.",
};
