import type { CaseStudy } from "../types";

/**
 * Sourced from Tony's published UI-design page for this project plus the two
 * high-fidelity screens he supplied. The page documents the role, the two-phase
 * process and the product intent; anything beyond that is marked as not
 * disclosed rather than inferred.
 */
export const digitalTicketingExperience: CaseStudy = {
  slug: "digital-ticketing-experience",
  mission: "04",
  title: "Digital Ticketing Experience",
  titleLines: ["Digital Ticketing", "Experience"],
  summary:
    "A sports ticketing app designed around personal preference and group plans — pick the sports you follow, get events surfaced to match, and organise going with friends.",
  categories: ["UX & Product Design"],
  year: "Not publicly disclosed",
  status: "completed",
  statusLabel: "Completed · Delivered to client",
  contribution: "UI design from competitor research through to high-fidelity prototype",
  role: "User Interface Designer",
  preview: "ticket",
  accent: "cyan",
  featured: true,
  snapshot: {
    role: "User Interface Designer",
    projectType: "Mobile application · sports event ticketing",
    timeline: "Not publicly disclosed",
    tools: ["Market and competitor research", "Mind mapping", "Low-fidelity prototyping", "High-fidelity prototyping"],
    team: "Client engagement — team composition not publicly disclosed",
    status: "Prototypes delivered and refined against client feedback",
  },
  seoDescription:
    "UI design case study for a sports ticketing app: competitor research, user journey mind-mapping, low- and high-fidelity prototypes, and preference-driven event discovery.",
  blocks: [
    {
      kind: "prose",
      id: "context",
      label: "Context",
      body: [
        "Buying a ticket to a live sports event is rarely a solo decision. People follow particular sports and particular teams, and the moment that matters is usually not \"find a ticket\" but \"work out what's on that we would actually go to, and get everyone to agree.\"",
        "The brief was to design an app that handled both halves of that: buying tickets according to personal preference, and organising the outing with friends.",
      ],
    },
    {
      kind: "pillars",
      id: "problem",
      label: "Design problem",
      items: [
        {
          k: "Generic listings bury the relevant",
          tone: "cyan",
          body: "A ticketing platform that treats every event equally makes the user do the filtering. Someone who only follows rugby and cricket should not have to skim past everything else.",
        },
        {
          k: "Going is a group decision",
          tone: "orange",
          body: "Ticketing tools are built around a single buyer, while the actual behaviour is a group deciding together. The product had to hold both.",
        },
        {
          k: "A crowded category",
          tone: "cyan",
          body: "Competitor analysis was part of the brief precisely because this is a well-served market — the design needed a reason to exist beyond parity.",
        },
      ],
    },
    {
      kind: "prose",
      id: "role",
      label: "My role",
      body: [
        "User Interface Designer. My responsibility covered researching design ideas and competitors, developing the user journey, and designing the prototypes.",
        "This was client work, and the design was refined against client feedback rather than delivered as a single proposal.",
      ],
    },
    {
      kind: "list",
      id: "responsibilities",
      label: "Responsibilities",
      items: [
        "Researched design ideas and competitor products",
        "Identified business needs and contributed to business strategy",
        "Conducted market research",
        "Created a mind-map of the user journey and required functions",
        "Designed low-fidelity prototypes",
        "Designed high-fidelity prototypes",
        "Refined the design according to client feedback",
      ],
    },
    {
      kind: "flow",
      id: "process",
      label: "Design process",
      variant: "timeline",
      intro: "Two phases, as documented at the time.",
      steps: [
        { name: "Business needs", desc: "Identified what the product had to achieve commercially before any interface work started." },
        { name: "Business strategy", desc: "Developed the strategy the design would need to support." },
        { name: "Market research", desc: "Researched the ticketing market to understand what users already expect from the category." },
        { name: "Competitor analysis", desc: "Analysed existing products to find where the design could differentiate rather than duplicate." },
        { name: "User journey mind-map", desc: "Mapped the journey and the functions it required — the artefact that turned research into a feature set." },
        { name: "Low-fidelity prototype", desc: "Established structure and flow before committing to any visual decisions." },
        { name: "High-fidelity prototype", desc: "Built out the full interface, including the preference onboarding and event discovery screens." },
        { name: "Client refinement", desc: "Enhanced the design according to feedback from the client." },
      ],
    },
    {
      kind: "media",
      id: "screens",
      label: "The interface",
      layout: "devices",
      intro:
        "Two screens from the high-fidelity prototype: preference capture during onboarding, and the personalised discovery surface it feeds.",
      items: [
        {
          src: "/work/ticketing-sports.webp",
          alt: "Onboarding screen titled 'Pick your favourite sports' showing a grid of hexagonal sport icons — golf, swimming, cricket, baseball, basketball, football, boxing, rugby, motor sport, soccer, tennis, volleyball, surfing, hockey, kabaddi, martial arts and handball — with football selected in green, above Skip and Next buttons.",
          caption: "Preference capture: seventeen sports, one tap, skippable.",
          width: 760,
          height: 1451,
        },
        {
          src: "/work/ticketing-events.webp",
          alt: "Home screen greeting 'Hello John!' with an event search bar, tabs for Events, Venues, Sports and Teams, and recommended event cards for National Rugby League 2024 and a women's cricket fixture showing venue, date and distance.",
          caption: "Discovery: recommendations, distance, and four ways to browse.",
          width: 760,
          height: 1455,
        },
      ],
    },
    {
      kind: "features",
      id: "decisions",
      label: "Interface decisions",
      items: [
        {
          name: "Preference before browsing",
          desc: "Onboarding asks which sports get your heart racing before showing a single event, so the first screen a user sees is already filtered to them.",
        },
        {
          name: "Skippable, not mandatory",
          desc: "The preference step carries a Skip control. Onboarding that blocks the product is onboarding people abandon.",
        },
        {
          name: "Four ways in",
          desc: "Events, Venues, Sports and Teams sit as peer tabs, because people arrive with different starting points — a team they follow, or a stadium they can get to.",
        },
        {
          name: "Distance on the card",
          desc: "Each recommendation carries how far away it is, surfacing the constraint that usually decides whether an outing happens.",
        },
        {
          name: "Squads as a primary destination",
          desc: "The group half of the product sits in the main navigation rather than inside a share menu, matching the reality that going is a group decision.",
        },
      ],
    },
    {
      kind: "note",
      id: "gaps",
      label: "What is not documented",
      tone: "orange",
      body: "The published source does not record the timeline, team composition, design tooling, the research findings themselves, or whether the app was built and shipped. Those are left out rather than reconstructed.",
    },
    {
      kind: "prose",
      id: "lessons",
      label: "Reflection",
      body: [
        "The strongest decision here is the cheapest one: asking a single question during onboarding and letting it reshape the entire discovery surface. Personalisation that requires behavioural data takes weeks to become useful, while one tap works on the first session.",
        "Looking back at it now, the piece I would push harder on is the group flow. Squads earned a place in the primary navigation, which was right, but the journey from \"I found an event\" to \"we all have tickets\" is where this product would either win or lose, and it deserved as much design attention as discovery received.",
      ],
    },
  ],
};
