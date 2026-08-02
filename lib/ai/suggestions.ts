import { PROJECTS } from "@/content/projects";

/**
 * Starter questions, chosen for the page the visitor is on. On a case study
 * the project's own questions come first, because that is what someone
 * reading it is most likely to ask next.
 */

const GENERAL = [
  "What kind of Business Analyst is Tony?",
  "What is MART?",
  "Which project best demonstrates end-to-end delivery?",
  "What AI products has Tony designed?",
  "What tools and methods does Tony use?",
  "How can I get in touch with Tony?",
];

const PER_PROJECT: Record<string, string[]> = {
  "ai-teacher-platform": [
    "How does the AI Teacher Growth Platform work?",
    "What was Tony's role on the teacher platform?",
    "Why is it not just an AI chatbot?",
  ],
  "enterprise-logistics-saas": [
    "What did Tony contribute to the enterprise SaaS project?",
    "How was the logistics platform specified?",
    "What did Tony do with Axure RP 9?",
  ],
  "early-childhood-educator-os": [
    "What is the Early Childhood Educator OS?",
    "How was the AI writing kept to a professional standard?",
    "What did Tony learn running it in production?",
  ],
  "calories-fitness-app": [
    "What was the Calories app?",
    "What design decisions shaped Calories?",
    "How did the collective total shape the design?",
  ],
  "product-discovery-feature-delivery": [
    "What did Tony do at Syaila?",
    "How were the two modules specified?",
    "When does Tony use A/B testing?",
  ],
  "digital-ticketing-experience": [
    "How does the ticketing app personalise events?",
    "What was Tony's design process here?",
    "Why is preference captured during onboarding?",
  ],
  "modular-landing-page-system": [
    "What makes the landing pages a system?",
    "What structure do the landing pages follow?",
    "Which products used this system?",
  ],
  "enterprise-ai-copilot-strategy": [
    "What is MART?",
    "How did this AI strategy differ from ChatGPT?",
    "What enterprise problems was it designed to solve?",
  ],
  "market-entry-business-analysis": [
    "How did Tony assess the market entry?",
    "What research methods did Tony use?",
    "What role did Tony play in the presentation?",
  ],
  "ux-design-evaluation": [
    "How did Tony run the usability evaluation?",
    "Why both moderated and unmoderated testing?",
    "What were the findings?",
  ],
};

const pick = (list: string[], n: number) => list.slice(0, n);

export function suggestionsFor(path = "/"): string[] {
  const slug = PROJECTS.find((p) => path.includes(`/work/${p.slug}`))?.slug;
  if (slug && PER_PROJECT[slug]) {
    return [...pick(PER_PROJECT[slug], 3), GENERAL[4]];
  }
  if (path.startsWith("/work")) {
    return [
      "Which project best demonstrates end-to-end delivery?",
      "What AI products has Tony designed?",
      "What did Tony contribute to the enterprise SaaS project?",
      "How does the AI Teacher Growth Platform work?",
    ];
  }
  if (path.startsWith("/about")) {
    return [
      "What kind of Business Analyst is Tony?",
      "How does Tony approach a new project?",
      "What tools and methods does Tony use?",
      "How can I get in touch with Tony?",
    ];
  }
  if (path.startsWith("/journey")) {
    return [
      "What is Tony's career path?",
      "What did Tony study?",
      "How did Tony fund his independent products?",
      "What does Tony do now?",
    ];
  }
  if (path.startsWith("/lab")) {
    return [
      "What has Tony built independently?",
      "How were the independent products funded?",
      "What is the Early Childhood Educator OS?",
      "What does building alone teach you?",
    ];
  }
  if (path.startsWith("/contact")) {
    return [
      "What kind of work is Tony available for?",
      "Which project best demonstrates end-to-end delivery?",
      "How can I get in touch with Tony?",
    ];
  }
  return pick(GENERAL, 4);
}
