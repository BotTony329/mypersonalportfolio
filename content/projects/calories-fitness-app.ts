import type { CaseStudy } from "../types";

/**
 * Built from the evidence published on Tony's earlier portfolio page for this
 * project. That page documents the app name, its positioning line, three
 * design decisions and two interface screenshots — and nothing else.
 *
 * ⚠ NEEDS CONFIRMATION before this page can claim more. Everything listed in
 * the "gaps" note block below is genuinely absent from the source and must be
 * supplied by Tony rather than inferred:
 *   · timeline, team composition, design tools used
 *   · who the client was and what brief they gave
 *   · target users and any research performed
 *   · the full feature set and user journey
 *   · whether the app was built, shipped or remained a design concept
 *   · any testing, iteration or outcome
 * Do not fill these in from assumption.
 */
export const caloriesFitnessApp: CaseStudy = {
  slug: "calories-fitness-app",
  mission: "04",
  title: "Calories — Fitness Tracking App",
  titleLines: ["Calories", "Fitness App"],
  summary:
    "A mobile fitness app design built around a deliberately simple interface, a high-contrast visual identity, and a route-tracking feature that lets people see their effort accumulate over time.",
  categories: ["UX & Product Design"],
  year: "Not publicly disclosed",
  status: "completed",
  statusLabel: "Design work · Earlier portfolio",
  contribution: "Product and interface design, from positioning through to visual identity",
  role: "Designer",
  preview: "orbit",
  accent: "cyan",
  snapshot: {
    role: "Designer",
    projectType: "Mobile application · fitness and activity tracking",
    timeline: "Not publicly disclosed",
    tools: ["Not publicly disclosed"],
    team: "Client engagement — team composition not publicly disclosed",
    status: "Design work completed",
  },
  seoDescription:
    "Design case study for Calories, a mobile fitness tracking app: simplicity-first interaction design, a lime-green and black visual identity, and route-based journey tracking.",
  blocks: [
    {
      kind: "note",
      id: "provenance",
      label: "Source & scope",
      tone: "cyan",
      body: "This case study is reconstructed from Tony's earlier published portfolio page for the project. That page documents the product positioning, three design decisions and two interface screenshots. Fields not evidenced there are marked as not publicly disclosed rather than filled in.",
    },
    {
      kind: "prose",
      id: "context",
      label: "Context",
      body: [
        "Calories is a mobile fitness application designed around a single positioning line: burn calories for society. The framing puts individual effort in a collective context rather than treating exercise as a purely personal metric.",
        "The work was done for a client, who brought a clear aesthetic expectation alongside the functional brief. The published design journey records how those two pressures — make it effortless to use, and make it feel striking — were resolved.",
      ],
    },
    {
      kind: "pillars",
      id: "problem",
      label: "Design problem",
      items: [
        {
          k: "Fitness apps ask too much too early",
          tone: "cyan",
          body: "The stated design goal was that every user should be able to work out how to use the app quickly, which points at onboarding friction as the problem being solved.",
        },
        {
          k: "The category looks the same",
          tone: "orange",
          body: "The client explicitly wanted the product to feel cool rather than clinical — a differentiation problem as much as a usability one.",
        },
        {
          k: "Effort disappears once it is done",
          tone: "orange",
          body: "Existing alternatives did not let people see their activity accumulate, which is the gap the route-tracking feature was designed to fill.",
        },
      ],
    },
    {
      kind: "features",
      id: "decisions",
      label: "Design decisions",
      intro: "Three decisions documented in the original design journey.",
      items: [
        {
          name: "Simple design",
          desc: "The simplest and most intuitive interface the product could carry, with the explicit aim that all users could learn how to use the app without instruction.",
        },
        {
          name: "Make it cool",
          desc: "A sharp lime-green and black colour scheme, chosen to carry the sensation of burning calories into the visual identity itself rather than leaving the aesthetic neutral.",
        },
        {
          name: "Track their journey",
          desc: "A route journey feature so people can follow their own path and watch their accumulations build — the capability positioned as the difference from existing alternatives.",
        },
      ],
    },
    {
      kind: "prose",
      id: "role",
      label: "My role",
      body: [
        "Designer. The published work covers product positioning, interaction design and visual identity, delivered as mobile interface designs with a desktop counterpart.",
        "The client relationship is visible in the design record: the aesthetic direction came from the client, and the design work resolved it against the usability goal rather than treating the two as separate requirements.",
      ],
    },
    {
      kind: "list",
      id: "artefacts",
      label: "Artefacts produced",
      items: [
        "Mobile application interface designs",
        "A desktop version of the interface",
        "A documented design journey covering positioning, simplicity, visual identity and the tracking feature",
      ],
    },
    {
      kind: "prose",
      id: "solution",
      label: "Solution",
      body: [
        "A mobile-first fitness product whose visual identity does part of the motivational work. The high-contrast lime-and-black palette is not decoration — it was chosen so that the interface itself communicates exertion, which is unusual in a category that tends towards calm, clinical design.",
        "Underneath that, the interaction model was pushed towards immediate legibility, and the route journey view gives the effort somewhere to accumulate so that using the app repeatedly produces something to look back at.",
      ],
    },
    {
      kind: "note",
      id: "gaps",
      label: "What is not documented",
      tone: "orange",
      body: "The original source does not record the timeline, team, design tools, target user research, the complete feature set, the full user journey, whether the app was built and shipped, or any testing or measured outcome. Rather than invent those, this page stops where the evidence stops — they can be added once Tony confirms them.",
    },
    {
      kind: "prose",
      id: "lessons",
      label: "Reflection",
      body: [
        "The interesting tension in this project is one that recurs constantly in product work: a client asking for a strong aesthetic and a design goal demanding effortless comprehension are not automatically compatible. Resolving them into a single sharp colour system that also happened to reinforce the product's core action is the decision worth carrying forward.",
        "Placed alongside the later work in this portfolio, it also marks a starting point. The instinct visible here — find the one capability that differentiates, then design the whole product around it — is the same instinct applied at much larger scale in the enterprise and AI projects that followed.",
      ],
    },
  ],
};
