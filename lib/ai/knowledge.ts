import { PROJECTS } from "@/content/projects";
import { ABOUT, IDENTITY, JOURNEY, LAB, POSITIONING, SKILLS } from "@/lib/content";
import type { Block } from "@/content/types";

/**
 * The assistant's only source of truth.
 *
 * Every passage Moo can quote is derived from content already published on
 * this site. Nothing is authored here, which is what makes "never invent" an
 * architectural property rather than a hopeful instruction in a prompt: if a
 * fact is not on the site, it is not in the index, and retrieval returns
 * nothing for it.
 */

export interface Passage {
  /** Where this came from, shown to the user as a source. */
  title: string;
  /** Route the passage lives on, so answers can link out. */
  href: string;
  /** Section label within that page. */
  section: string;
  text: string;
  /** Extra terms that should match this passage but do not appear in `text`. */
  keywords: string[];
}

function blockToText(block: Block): string {
  switch (block.kind) {
    case "prose": return block.body.join(" ");
    /* Items carry the facts; the intro is framing and reads badly as an
       answer opener, so it trails rather than leads. */
    case "list": return [block.items.join(". "), block.intro].filter(Boolean).join(" ");
    case "pillars": return block.items.map((i) => `${i.k}: ${i.body}`).join(" ");
    case "flow": return [block.intro, ...block.steps.map((s) => `${s.name}: ${s.desc}`)].filter(Boolean).join(" ");
    case "features": return [block.intro, ...block.items.map((i) => `${i.name}: ${i.desc}`)].filter(Boolean).join(" ");
    case "stack": return [block.intro, ...block.layers.map((l) => `${l.k}: ${l.body}`)].filter(Boolean).join(" ");
    /* Alt text and captions are the only words a screenshot contributes. */
    case "media": return [block.intro, ...block.items.map((m) => m.caption ?? m.alt)].filter(Boolean).join(" ");
    case "note": return block.body;
  }
}

function buildIndex(): Passage[] {
  const out: Passage[] = [];

  out.push({
    title: "Tony Zhao",
    href: "/about",
    section: "Positioning",
    text: `${IDENTITY.name} is a ${IDENTITY.roles.join(", ")} based in ${IDENTITY.location}. ${POSITIONING.lede} ${POSITIONING.pillars.map((p) => `${p.k}: ${p.body}`).join(" ")}`,
    keywords: ["who is tony", "background", "positioning", "what does tony do", "summary", "profile"],
  });

  out.push({
    title: "About",
    href: "/about",
    section: "Profile & approach",
    text: `${ABOUT.lede} ${ABOUT.intro.join(" ")} ${ABOUT.approach.map((a) => `${a.k}: ${a.body}`).join(" ")}`,
    keywords: ["approach", "philosophy", "how does tony work", "method", "experience", "career"],
  });

  out.push({
    title: "Capabilities",
    href: "/about",
    section: "Capabilities",
    text: ABOUT.capabilities.map((c) => `${c.k}: ${c.items.join(", ")}`).join(". "),
    keywords: ["skills", "tools", "capabilities", "what can tony do", "software", "methods", "sql", "power bi", "axure"],
  });

  out.push({
    title: "Core skills",
    href: "/about",
    section: "Skills",
    text: SKILLS.map((s) => `${s.name} — ${s.note}`).join(". "),
    keywords: ["skills", "strengths", "expertise"],
  });

  out.push({
    title: "Education",
    href: "/about",
    section: "Education",
    text: ABOUT.education.map((e) => `${e.title}, ${e.org} (${e.period})`).join(". "),
    keywords: ["education", "degree", "study", "studies", "studied", "university", "masters", "bachelor", "degrees", "qualification", "qualifications", "certification", "school"],
  });

  out.push({
    title: "Experience",
    href: "/about",
    section: "Experience",
    text: ABOUT.experience.map((e) => `${e.period} — ${e.title} at ${e.role}: ${e.body}`).join(" "),
    keywords: ["experience", "roles", "jobs", "worked", "employer", "career history", "syaila", "sketchli", "freelance", "consultant"],
  });

  out.push({
    title: "Journey",
    href: "/journey",
    section: "Career path",
    text: `${JOURNEY.lede} The arc runs ${JOURNEY.arc.join(" then ")}. ${JOURNEY.primary.map((s2) => `${s2.period}: ${s2.title} at ${s2.org} — ${s2.body}`).join(" ")}`,
    keywords: ["journey", "path", "career", "timeline", "how did tony get here", "progression", "story"],
  });

  out.push({
    title: "Journey",
    href: "/journey",
    section: "How it was funded",
    text: `${JOURNEY.support.lede} ${JOURNEY.support.steps.map((s2) => `${s2.name}: ${s2.desc}`).join(" ")} ${JOURNEY.support.note}`,
    keywords: ["forklift", "warehouse", "funded", "funding", "fund", "self-funded", "part-time", "pay", "paid", "investment", "investor", "money", "independence"],
  });

  out.push({
    title: "Independent Product Lab",
    href: "/lab",
    section: "Independent products",
    text: `${LAB.lede} Cycle: ${LAB.cycle.map((c) => `${c.k} — ${c.body}`).join(" ")} Products: ${LAB.products.map((pr) => `${pr.k} (${pr.status}): ${pr.body}`).join(" ")} ${LAB.principles.map((pr) => `${pr.k}: ${pr.body}`).join(" ")}`,
    keywords: ["lab", "independent", "side projects", "etsy", "shopify", "e-commerce", "saas", "built alone", "own products", "driftdecostudio"],
  });

  out.push({
    title: "Contact",
    href: "/contact",
    section: "Contact",
    text: `Tony can be reached by email at ${IDENTITY.email}. He is available for business analysis, AI product design and digital transformation work, and is based in ${IDENTITY.location}.`,
    keywords: ["contact", "email", "hire", "available", "reach", "get in touch", "collaborate", "work together"],
  });

  PROJECTS.forEach((p) => {
    const href = `/work/${p.slug}`;

    out.push({
      title: p.title,
      href,
      section: "Overview",
      text: [
        p.summary,
        `Role: ${p.role}.`,
        `Category: ${p.categories.join(", ")}.`,
        `Status: ${p.statusLabel}.`,
        p.snapshot.timeline ? `Timeline: ${p.snapshot.timeline}.` : "",
        p.snapshot.team ? `Team: ${p.snapshot.team}.` : "",
        p.snapshot.tools?.length ? `Tools: ${p.snapshot.tools.join(", ")}.` : "",
        `Key contribution: ${p.contribution}.`,
      ].filter(Boolean).join(" "),
      keywords: [p.title.toLowerCase(), p.slug, ...p.categories.map((c) => c.toLowerCase())],
    });

    p.blocks.forEach((b) => {
      out.push({
        title: p.title,
        href,
        section: b.label,
        text: blockToText(b),
        keywords: [p.title.toLowerCase(), p.slug, b.label.toLowerCase()],
      });
    });
  });

  return out;
}

export const KNOWLEDGE: Passage[] = buildIndex();

/** Words too common to carry signal in a portfolio-shaped corpus. */
const STOP = new Set([
  "the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "with", "is", "are", "was",
  "were", "be", "been", "it", "its", "that", "this", "these", "those", "as", "at", "by",
  "from", "what", "how", "who", "which", "does", "did", "do", "you", "your", "he", "his",
  "tony", "zhao", "me", "my", "i", "about", "tell", "can", "could", "would", "please",
]);

const tokenize = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter((t) => t.length > 2 && !STOP.has(t));

/**
 * Term-overlap retrieval. Small corpus, no embeddings, no network — which
 * means the assistant still answers when there is no AI key configured at all.
 */
export function retrieve(question: string, limit = 5): Passage[] {
  const terms = tokenize(question);
  if (!terms.length) return [];

  const scored = KNOWLEDGE.map((p) => {
    const haystack = `${p.title} ${p.section} ${p.text} ${p.keywords.join(" ")}`.toLowerCase();
    let score = 0;
    terms.forEach((t) => {
      if (haystack.includes(t)) score += 1;
      /* An exact keyword hit is a much stronger signal than a substring
         appearing somewhere in a long passage — without this, "what did Tony
         study?" matched the phrase "case study" in half the corpus and lost
         to prose that merely contained the word. */
      if (p.keywords.includes(t)) score += 4;
      else if (p.keywords.some((k) => k.includes(t))) score += 1.5;
      if (p.title.toLowerCase().includes(t)) score += 1.5;
      if (p.section.toLowerCase().includes(t)) score += 1;
    });
    return { p, score };
  });

  return scored
    .filter((s) => s.score >= 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.p);
}

export const FALLBACK_ANSWER =
  "That one is outside what I can speak to — Tony can answer it directly.";

/** Trimmed context for the model — enough to answer, small enough to stay cheap. */
export function buildContext(passages: Passage[], budget = 4200): string {
  let used = 0;
  const parts: string[] = [];
  for (const p of passages) {
    const chunk = `## ${p.title} — ${p.section} (${p.href})\n${p.text}`;
    if (used + chunk.length > budget) break;
    parts.push(chunk);
    used += chunk.length;
  }
  return parts.join("\n\n");
}
