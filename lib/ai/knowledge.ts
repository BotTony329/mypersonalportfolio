import { PROJECTS } from "@/content/projects";
import { ABOUT, IDENTITY, POSITIONING, SKILLS } from "@/lib/content";
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
      text: `${p.summary} Role: ${p.role}. Category: ${p.categories.join(", ")}. Status: ${p.statusLabel}. Timeline: ${p.snapshot.timeline}. Team: ${p.snapshot.team}. Tools: ${p.snapshot.tools.join(", ")}. Key contribution: ${p.contribution}.`,
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
      if (p.keywords.some((k) => k.includes(t))) score += 1.5;
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
  "I don't have verified information about that yet, but you can contact Tony directly.";

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
