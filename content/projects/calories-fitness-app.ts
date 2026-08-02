import type { CaseStudy } from "../types";

export const caloriesFitnessApp: CaseStudy = {
  slug: "calories-fitness-app",
  mission: "10",
  title: "Burnathon — Collective Fitness App",
  titleLines: ["Burnathon", "Collective Fitness"],
  summary:
    "A fitness product that turns individual exercise into a shared total: log what you did, and watch your calories join a community counter racing a countdown clock.",
  categories: ["UX & Product Design"],
  year: "2024 — 2025",
  status: "completed",
  statusLabel: "Completed · Mobile and web design",
  contribution: "Product positioning, interaction design and visual identity across mobile and web",
  role: "Designer",
  preview: "orbit",
  accent: "cyan",
  snapshot: {
    role: "Designer",
    projectType: "Mobile and web application · fitness and activity tracking",
    tools: ["Product positioning", "Interaction design", "Visual identity", "Mobile and desktop UI design"],
    team: "Client engagement",
    status: "Design delivered across mobile and web",
  },
  seoDescription:
    "Design case study for Burnathon by FoodSport: a collective fitness challenge where individual activity feeds a shared calorie total, designed across mobile and web with a high-contrast lime and black identity.",
  blocks: [
    {
      kind: "prose",
      id: "context",
      label: "Context",
      body: [
        "Most fitness apps are built around one person and their own numbers. Burnathon, designed under the FoodSport brand, starts from a different premise: your calories are a contribution. Everything you burn is added to a collective total that the whole community is pushing upward against a countdown clock.",
        "That single decision changes the product. A personal tracker competes with every other personal tracker on precision and feature depth. A collective challenge competes on whether people feel part of something — which is a design problem rather than a data problem.",
      ],
    },
    {
      kind: "pillars",
      id: "problem",
      label: "Design problem",
      items: [
        {
          k: "Effort disappears once it is done",
          tone: "cyan",
          body: "A workout logged into a private history has nowhere to go. The product needed somewhere for that effort to land where it would still matter tomorrow.",
        },
        {
          k: "Solo motivation runs out",
          tone: "orange",
          body: "Personal goals work until they do not. A shared target with a deadline supplies a reason to log today's session that a personal streak cannot.",
        },
        {
          k: "Logging has to be almost free",
          tone: "cyan",
          body: "Anything that takes more than a few taps after exercise will not get done. The entry flow had to be shorter than the temptation to skip it.",
        },
        {
          k: "The category looks clinical",
          tone: "orange",
          body: "Fitness interfaces trend calm, medical and neutral. This product needed to feel like exertion, not like a health record.",
        },
      ],
    },
    {
      kind: "prose",
      id: "role",
      label: "My role",
      body: [
        "Designer. The work covered product positioning, the interaction model, the visual identity and the interface across both mobile and web.",
        "The aesthetic direction came from the client, who wanted something with energy rather than something clinical. Resolving that against the usability goal — that anyone should be able to work out how to use the app without instruction — was the central design tension of the project.",
      ],
    },
    {
      kind: "features",
      id: "decisions",
      label: "Design decisions",
      items: [
        {
          name: "The collective number leads",
          desc: "The community total is the largest element on the home screen, above the user's own figure. The hierarchy states the proposition before any copy has to explain it.",
        },
        {
          name: "A countdown, not an open goal",
          desc: "A running clock sits directly beneath the total. A shared target with no deadline is an aspiration; a shared target with a deadline is an event.",
        },
        {
          name: "Simplicity as the first constraint",
          desc: "The simplest and most intuitive structure the product could carry, so a new user learns it in one session with nothing to read first.",
        },
        {
          name: "Lime on black",
          desc: "A sharp, high-contrast palette that carries the sensation of burning calories into the identity itself — unusual in a category that defaults to calm blues and whites.",
        },
        {
          name: "Logging in structured steps",
          desc: "Activity entry breaks into labelled steps beginning with the type of exercise, so each screen asks one question and the whole flow stays skimmable.",
        },
        {
          name: "Journey tracking",
          desc: "A personal record view alongside the collective total, so people can see their own accumulation building underneath the shared one.",
        },
      ],
    },
    {
      kind: "media",
      id: "screens",
      label: "The mobile product",
      layout: "devices",
      intro:
        "Four screens: the branded entry point, sign-in, the collective dashboard, and the first step of logging an activity.",
      items: [
        {
          src: "/work/calories-splash.webp",
          alt: "App splash screen in a phone frame showing the FoodSport logo in white on black, with pale blue flowing ribbon graphics sweeping across the lower half.",
          caption: "Entry point: the FoodSport identity, ribbon motif and near-black ground.",
          width: 620,
          height: 1274,
        },
        {
          src: "/work/calories-login.webp",
          alt: "Sign-in screen headed 'Burnathon Goooo' in a brush script typeface, with username and password fields, a lime green Login button, and links reading How To Join and More Info.",
          caption: "Sign-in: brush headline, lime call to action, two routes in for newcomers.",
          width: 620,
          height: 1366,
        },
        {
          src: "/work/calories-dashboard.webp",
          alt: "Dashboard showing a lime green panel headed 'Total Calorie Collected' with a large community figure, a dark panel below headed 'Time remaining' with a countdown, the user's own calorie total in large italic type, and buttons for Submit New Calorie, View My Record and Log out.",
          caption: "The proposition in one screen: collective total, countdown, personal contribution.",
          width: 620,
          height: 1372,
        },
        {
          src: "/work/calories-log.webp",
          alt: "Activity logging screen headed 'Step 1: Select which type of fitness you have done' with a search field and a grid of tiles for Cardio, Strength and Flexibility.",
          caption: "Logging: one question per step, tiles rather than a dropdown.",
          width: 620,
          height: 1382,
        },
      ],
    },
    {
      kind: "media",
      id: "web",
      label: "The web product",
      layout: "wide",
      intro:
        "The same identity carried onto desktop, where the collective total becomes the headline rather than a panel.",
      items: [
        {
          src: "/work/calories-web.webp",
          alt: "FoodSports website in a laptop frame with a deep navy background, navigation for Home, How To Join, About Us and MyJourney, a large brush-script headline reading 'Buranthon Gooo!', a mint green Login To Your Account button, flowing line graphics, and a strip below reading 'How Much We Have Collected'.",
          caption: "Web: same brush headline and ribbon motif, wider navigation, collective total below the fold.",
          width: 1500,
          height: 798,
        },
      ],
    },
    {
      kind: "prose",
      id: "solution",
      label: "Solution",
      body: [
        "A two-surface product with one identity. Mobile is where activity gets logged and the collective total gets checked — short sessions, large numbers, minimal chrome. Web is where the challenge is explained and joined, with room for the how-to-join and about material that would clutter a phone screen.",
        "The visual system does real work in both. The brush-script headline, the ribbon motif and the lime-on-black palette carry effort and momentum, which means the interface reinforces the product's proposition rather than staying neutral while the copy does the persuading.",
      ],
    },
    {
      kind: "prose",
      id: "lessons",
      label: "Reflection",
      body: [
        "The tension worth remembering is that a client asking for a strong aesthetic and a design goal demanding effortless comprehension are not automatically compatible. Resolving them into one sharp colour system that also reinforced the product's core action is the decision I would carry into another project.",
        "Placed alongside the later work in this portfolio, it also marks a starting point. The instinct visible here — find the one thing that differentiates, then design the whole product around it — is the same instinct applied at much larger scale in the enterprise and AI work that followed.",
      ],
    },
  ],
};
