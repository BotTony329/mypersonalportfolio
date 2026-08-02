import type { CaseStudy } from "../types";

/** Market entry analysis. Client described by sector; team members unnamed. */
export const marketEntryBusinessAnalysis: CaseStudy = {
  slug: "market-entry-business-analysis",
  mission: "04",
  title: "Market Entry Business Analysis",
  titleLines: ["Market Entry", "Business Analysis"],
  summary:
    "Business analysis for a manufacturer entering a crowded new category — industry research, capability assessment, and a redesigned business and operating model built on what the analysis actually supported.",
  categories: ["Enterprise Consulting", "Business Analysis"],
  year: "Delivered",
  status: "completed",
  statusLabel: "Completed · Recommendations presented",
  contribution: "Industry research, internal business analysis and the market entry strategy",
  role: "Business Analyst",
  preview: "arch",
  accent: "cyan",
  featured: true,
  snapshot: {
    role: "Business Analyst — industry research, internal assessment and recommendations",
    projectType: "Consulting engagement · market entry analysis and business model redesign",
    tools: ["PEST analysis", "Porter value chain", "Stakeholder analysis", "Business capability analysis", "Gap analysis", "SWOT", "VRIO", "4P competitor analysis"],
    team: "Five-person consulting team. I led the entry strategy; colleagues covered pricing, branding, marketing and employee training.",
    status: "Analysis and recommendations delivered and presented",
  },
  confidentiality: "Client described by sector only",
  seoDescription:
    "Business analysis for a manufacturer entering a competitive new category: PEST and value chain industry research, stakeholder and capability assessment, SWOT, VRIO and gap analysis, and a redesigned business model.",
  blocks: [
    {
      kind: "note",
      id: "confidentiality",
      label: "Confidentiality",
      tone: "cyan",
      body: "The client is described by sector — an established ice-cream manufacturer — rather than named. Team members are not named. Everything below concerns the analysis and the method.",
    },
    {
      kind: "prose",
      id: "context",
      label: "Business context",
      body: [
        "The client was an FMCG manufacturer whose business was built on ice cream: a strong single product line, and all the exposure that comes with one. Ice cream is seasonal, competition was intensifying, and consumer tastes were fragmenting.",
        "Their proposition was to enter the modern tea beverage market — an adjacent category with a young customer base, higher margin potential and, critically, year-round demand. The engagement was to establish whether that was a good idea, and if so, what would have to change inside the business for it to work.",
        "The question is more interesting than it first appears. Entering a new category is not a marketing exercise; it touches supply chain, store operations, staffing, capital allocation and brand. Answering it properly means rebuilding how the business makes money, not just adding a product to the menu.",
      ],
    },
    {
      kind: "pillars",
      id: "problem",
      label: "Problem",
      items: [
        {
          k: "Single-product dependency",
          tone: "orange",
          body: "Revenue concentrated in one seasonal category, leaving the business exposed to weather, to taste shifts and to a narrow competitive front.",
        },
        {
          k: "An unfamiliar market",
          tone: "cyan",
          body: "The tea beverage market is a fully competitive one — low barriers to entry, free movement of participants, and consumers with little loyalty to any seller. Attractive margins and brutal dynamics in the same category.",
        },
        {
          k: "Capability was unproven",
          tone: "cyan",
          body: "Ambition to enter the premium tier had to be tested against what the organisation could actually do — its people, its funding, its channels and its existing product performance.",
        },
        {
          k: "A budget that constrains strategy",
          tone: "orange",
          body: "The client's own stated plan was to test the market through a limited number of stores on a modest budget. Any recommendation had to be executable at that scale, not at the scale the category leaders operate.",
        },
      ],
    },
    {
      kind: "prose",
      id: "role",
      label: "My role",
      body: [
        "I worked as a Business Analyst across both halves of the engagement — the external industry research and the internal business assessment — and led the entry strategy in the final presentation.",
        "This was a five-person team and the work was shared. I led approximately an hour of the final presentation covering the entry strategy and the operating model it implied; colleagues presented the supporting workstreams of pricing, branding, marketing and employee training. Those were team contributions, not mine.",
      ],
    },
    {
      kind: "flow",
      id: "lifecycle",
      label: "Engagement lifecycle",
      variant: "timeline",
      intro:
        "Outside in, then inside out. Understanding the market first meant the internal assessment could measure capability against a real standard rather than against ambition.",
      steps: [
        { name: "Industry research", desc: "Category definition, profit models, market structure and lifecycle stage for the modern tea beverage industry." },
        { name: "PEST analysis", desc: "Political, economic, social and technological forces — including food safety regulation, disposable income trends and the shift toward health-conscious consumption." },
        { name: "Customer analysis", desc: "Demographic and income profiling of the actual buyer, which turned out to be considerably more specific than the client assumed." },
        { name: "Competitor analysis", desc: "Deep-dive on a premium-tier category leader using a 4P framework — product, price, place and promotion." },
        { name: "Industry value chain", desc: "Upstream materials, midstream production and brand operation, downstream retail and delivery — mapped to find where value is actually captured." },
        { name: "Stakeholder analysis", desc: "Identification, attitude, expectations and contribution for every affected party, internal and external." },
        { name: "Business capability analysis", desc: "Human resources, financial capacity and operational capability assessed against what the target market demands." },
        { name: "Porter value chain", desc: "The client's own primary and support activities, mapped to locate genuine advantage and genuine weakness." },
        { name: "Gap analysis", desc: "Current state against target state — pricing position, investment posture, marketing reach and channel breadth." },
        { name: "SWOT", desc: "Strengths, weaknesses, opportunities and threats, built from the preceding analysis rather than from a workshop." },
        { name: "VRIO", desc: "Which resources are valuable, rare, hard to imitate and organisationally exploitable — the test of whether any advantage is durable." },
        { name: "Strategy presentation", desc: "Conclusions and recommendations delivered to the client as a market entry strategy and a redesigned operating model." },
      ],
    },
    {
      kind: "features",
      id: "external",
      label: "External research",
      intro: "The 78-slide industry report. Every method below appears in the delivered work.",
      items: [
        { name: "Industry definition and profit models", desc: "How modern tea beverage differs from traditional milk tea — ingredient quality, store format, and the shift from a takeaway counter to a leisure space. Revenue streams mapped across product range, food service extension, franchising, co-branding and delivery." },
        { name: "Market structure", desc: "A fully competitive market, segmented into premium, mid and value tiers with named category leaders in each. Consumers select on quality and value rather than on brand allegiance, which sets a high bar for differentiation." },
        { name: "Customer profile", desc: "Predominantly female, young to middle-aged, concentrated in tier-one and tier-two cities, in a defined income band. Specific enough to direct product development and channel strategy rather than just describe a market." },
        { name: "Industry lifecycle", desc: "Positioning the category across introduction, growth, maturity and decline — which determines whether entry is early enough to matter." },
        { name: "PEST analysis", desc: "Including the regulatory reality that food safety enforcement has tightened materially, making compliance a genuine risk rather than a checklist item." },
        { name: "Supply chain and ecosystem", desc: "Upstream tea, dairy, fruit and packaging; midstream processing and brand operation; downstream physical stores and delivery platforms. Barriers to entry found to be low — which cuts both ways." },
        { name: "Competitor 4P deep-dive", desc: "A premium category leader analysed across product architecture, pricing, channel mix and promotional strategy — including co-branding mechanics and experiential flagship formats." },
      ],
    },
    {
      kind: "features",
      id: "internal",
      label: "Internal assessment",
      intro: "The 22-slide internal report. Where the ambition met the organisation.",
      items: [
        { name: "Stakeholder analysis", desc: "Each stakeholder group mapped against identification, attitude, expectations and contribution. Support for the move was broad, which removed political risk as a blocker and moved the question squarely onto capability." },
        { name: "Human resource capability", desc: "Staff supportive of the move and willing to participate; service and production capability modestly ahead of category norms; structured training in place; a deliberately young workforce." },
        { name: "Financial capability", desc: "Client-stated intent to test the market through a limited store count on a modest budget. Read against their existing conservative store footprint, this set a hard ceiling on how ambitious any recommendation could responsibly be." },
        { name: "Porter value chain", desc: "The client's primary and support activities mapped to identify where they genuinely add value and where they depend on others." },
        { name: "Gap analysis", desc: "Current state characterised by premium pricing, cautious and budget-limited investment, limited marketing reach and a single sales channel — each measured against what the target position requires." },
        { name: "SWOT and VRIO", desc: "SWOT to consolidate the position; VRIO to test whether anything in it constitutes durable advantage rather than a temporary edge." },
        { name: "Product and service assessment", desc: "Existing product found to have strong visual and brand appeal, unremarkable taste, and a single distribution channel — a combination that shapes what can credibly be extended into a new category." },
      ],
    },
    {
      kind: "prose",
      id: "findings",
      label: "What the analysis showed",
      body: [
        "The two halves of the engagement pointed in different directions, and reconciling them was the actual consulting work. The external research made the premium tier look attractive — rising spend, calmer competition than the crowded value segment, and a customer profile that matched the client's existing brand character.",
        "The internal assessment made premium entry look difficult. A modest budget, a small planned store footprint, a single channel and a product whose appeal rested more on presentation than on taste are not the foundations of a premium play, where the entire proposition rests on ingredient quality and experience.",
        "The research also flagged that the value and mid tiers, while more competitive, were growing considerably faster than premium — which meant abandoning them entirely to chase margin carried its own opportunity cost.",
      ],
    },
    {
      kind: "stack",
      id: "model",
      label: "Rebuilding the business model",
      intro:
        "Entering the category meant more than adding a product. Each dimension below came out of the gap between where the business was and what the target position demanded.",
      layers: [
        {
          k: "01 · Revenue model",
          tone: "orange",
          body: "The category earns across a wider base than a single product line — extended food service, franchising, co-branded ranges and delivery all sit alongside core sales. A single-product revenue model had to widen to compete.",
        },
        {
          k: "02 · Positioning tier",
          tone: "cyan",
          body: "Premium, mid and value tiers demand different things: ingredient quality and experience at the top, price and reach below. Choosing a tier is the decision every other decision follows from — and the analysis argued against choosing on margin alone.",
        },
        {
          k: "03 · Channel model",
          tone: "orange",
          body: "The existing business ran a single sales channel. The category runs physical stores, delivery platforms and mini-programme ordering in parallel, which changes store format, staffing and operating hours.",
        },
        {
          k: "04 · Value chain position",
          tone: "cyan",
          body: "Upstream materials, midstream processing and brand operation, downstream retail. Mapping the client's own primary and support activities against that chain showed where they could genuinely add value and where they would be dependent.",
        },
        {
          k: "05 · Store operating model",
          tone: "orange",
          body: "Category leaders treat the store as a leisure space rather than a takeaway counter. That reshapes format, layout, dwell time and service process — an operational change, not a marketing one.",
        },
        {
          k: "06 · Investment posture",
          tone: "cyan",
          body: "A limited-store, limited-budget pilot is a legitimate strategy, but only for some of the tiers above. Making that constraint explicit is what kept the recommendation executable rather than aspirational.",
        },
      ],
    },
    {
      kind: "prose",
      id: "presentation",
      label: "The presentation",
      body: [
        "The engagement closed with a strategy presentation to the client. I led approximately an hour of it: the market position, the capability gap, and what would have to change in the business model and the operating process for entry to succeed.",
        "The remaining workstreams — pricing, branding, marketing and employee training — were presented by colleagues. The value of splitting it that way is that each presenter had actually done the analysis they were defending, which matters the moment a client asks a follow-up question.",
      ],
    },
    {
      kind: "prose",
      id: "reflection",
      label: "Reflection",
      body: [
        "This project is where business capability modelling stopped being an academic framework for me and became a practical instrument. Running a capability assessment against a specific market position produces an uncomfortable, useful answer: not \"are we good?\" but \"are we good enough for this, at this budget?\" Those are very different questions, and only the second one is actionable.",
        "It also taught me that the honest consulting answer is often not the exciting one. The premium tier was the attractive story and the analysis kept undercutting it. Presenting research that complicates the client's preferred direction — while still giving them something to act on — is a distinct skill from doing the analysis.",
        "Sequencing mattered more than I expected. Doing the external work first gave the internal assessment a standard to measure against. Reversed, capability assessment becomes self-referential: you conclude the organisation is fine, because you never established what it needed to be fine at.",
        "Finally, the presentation itself. An hour on transformation strategy in front of a client is a different discipline from writing it up — you cannot hide behind a document, and every claim has to be one you can defend when questioned.",
      ],
    },
  ],
};
