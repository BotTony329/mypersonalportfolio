/**
 * Site-level copy: identity, navigation, capabilities and the About page.
 *
 * Project copy does not live here — each case study owns its own file under
 * `content/projects/`, so a project can be added or edited without this file
 * changing at all.
 */

export const IDENTITY = {
  name: "Tony Zhao",
  roles: ["Business Analyst", "AI Product Designer", "Digital Transformation"],
  headline: ["Building intelligent systems that connect", "business strategy, user needs, and AI."],
  email: "tonyzhao32965@gmail.com",
  /* TODO Tony: replace with your real profile URL before sharing widely. */
  linkedin: "#",
  location: "Melbourne · AUS",
} as const;

export const SITE_NAV = [
  { href: "/", n: "01", label: "Home" },
  { href: "/work", n: "02", label: "Work" },
  { href: "/about", n: "03", label: "About" },
  { href: "/contact", n: "04", label: "Contact" },
];

export const POSITIONING = {
  eyebrow: "Professional Positioning",
  heading: ["The translator between", "intent and system"],
  lede:
    "Most projects do not fail on technology. They fail in the gap between what a business meant, what a user needed, and what got built. That gap is the work.",
  pillars: [
    {
      k: "Business analysis",
      tone: "orange" as const,
      body: "Turning ambiguity into specification — surfacing the process nobody wrote down, resolving the contradictions between teams, and holding one source of truth steady through delivery.",
    },
    {
      k: "AI product design",
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
  { name: "Business Analysis", level: 95, note: "Ambiguity → specification" },
  { name: "Digital Transformation", level: 90, note: "Process → platform" },
  { name: "AI Product Design", level: 92, note: "Model capability → usable product" },
  { name: "UX", level: 86, note: "Flows, states, decision moments" },
  { name: "SQL", level: 82, note: "Data models & query layers" },
  { name: "Power BI", level: 80, note: "Metrics people act on" },
  { name: "System Design", level: 88, note: "Modules, contracts, boundaries" },
  { name: "Prompt Engineering", level: 93, note: "Structured, testable reasoning" },
];

export const ABOUT = {
  eyebrow: "Professional Profile",
  heading: ["Business analyst.", "AI product designer."],
  lede:
    "I work where business strategy, user need and technical possibility have to be reconciled — and I stay with a system from the first ambiguous conversation through to the handover.",
  intro: [
    "My work sits between two groups that rarely speak the same language. On one side, stakeholders who know their business but describe it in exceptions and shorthand. On the other, engineers who need precision before they can build anything. The value I add is in converting one into the other without losing what mattered.",
    "That has taken me across enterprise SaaS delivery for aerospace logistics, an AI platform for teacher development, and a production AI product for early childhood education that I designed and built end to end. Different sectors, same underlying job: find the real problem, specify it honestly, and stay accountable for what ships.",
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
    { k: "Analysis", items: ["Requirement elicitation", "Business process modelling", "Stakeholder facilitation", "Gap and impact analysis", "Functional decomposition"] },
    { k: "Product", items: ["Product strategy", "PRD authoring", "User-flow design", "Prototyping (Axure RP 9)", "UX planning"] },
    { k: "AI", items: ["AI workflow design", "Prompt and agent behaviour", "Structured output schemas", "Guardrails and evaluation", "Knowledge-base design"] },
    { k: "Delivery", items: ["Sprint and delivery support", "Functional testing", "Defect tracking", "Data dictionaries", "User documentation & handover"] },
    { k: "Data", items: ["SQL data modelling", "Query layers", "Power BI dashboards", "Metric definition"] },
    { k: "Build", items: ["Next.js / TypeScript", "Full-stack web applications", "API and integration design", "Containerised deployment"] },
  ],
  experience: [
    {
      period: "2025 — present",
      title: "AI Teacher Growth Platform",
      role: "Business Analyst & AI Product Designer",
      body: "Definition and AI workflow design for a connected teacher-development system spanning preparation, live rehearsal, evaluation and long-term growth tracking.",
      href: "/work/ai-teacher-platform",
    },
    {
      period: "Live in production",
      title: "Early Childhood Educator OS",
      role: "Product Designer & Full-stack Builder",
      body: "An AI SaaS workbench for Australian early childhood educators, designed and built end to end and deployed to a managed cloud runtime.",
      href: "/work/early-childhood-educator-os",
    },
    {
      period: "Delivered",
      title: "Enterprise Logistics SaaS",
      role: "Business Analyst",
      body: "Full-lifecycle business analysis for an aerospace logistics platform — stakeholder facilitation, Axure prototyping, PRD and field dictionary, testing, documentation and handover.",
      href: "/work/enterprise-logistics-saas",
    },
    {
      period: "Earlier work",
      title: "Calories — Fitness Tracking App",
      role: "Designer",
      body: "Mobile product and interface design built around simplicity, a high-contrast visual identity and route-based journey tracking.",
      href: "/work/calories-fitness-app",
    },
  ],
};

export const CONTACT = {
  eyebrow: "Open Channel",
  heading: ["Let's build the next", "intelligent system."],
  lede:
    "Available for business analysis, AI product design and digital transformation work. Send a signal — I answer everything.",
};
