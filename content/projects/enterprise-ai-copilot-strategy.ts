import type { CaseStudy } from "../types";

/** 2023 consulting proposal. Consultancy and prospective client by sector only. */
export const enterpriseAiCopilotStrategy: CaseStudy = {
  slug: "enterprise-ai-copilot-strategy",
  mission: "03",
  title: "Enterprise AI Copilot Strategy",
  titleLines: ["Enterprise AI", "Copilot Strategy"],
  summary:
    "A 2023 consulting proposal designing an enterprise AI operating model — MART-GPT — that connects internal knowledge, external information, workflow automation and decision support into one assistant rather than a chatbot.",
  categories: ["Enterprise Consulting", "AI Products", "Digital Transformation"],
  year: "2023",
  status: "completed",
  statusLabel: "Strategy · Consulting proposal",
  contribution: "Enterprise AI capability framework, platform concept and business case",
  role: "Business Analyst · Enterprise AI Strategy",
  preview: "graph",
  accent: "orange",
  featured: true,
  snapshot: {
    role: "Business Analyst — enterprise AI strategy and solution design",
    projectType: "Consulting proposal · enterprise AI operating model",
    timeline: "2023",
    tools: ["Generative AI capability mapping", "Retrieval-based assistant design", "Use-case modelling", "Market and vendor research", "Business case development"],
    team: "Consulting bid team — I contributed the capability framework, platform concept and supporting analysis",
    status: "Delivered as a strategic proposal. Not implemented, not deployed.",
  },
  confidentiality: "Consultancy and prospective client described by sector only",
  seoDescription:
    "A 2023 enterprise AI strategy proposal: the MART framework, a retrieval-grounded assistant spanning knowledge, analysis, automation and content generation, designed for a large retail property operator.",
  blocks: [
    {
      kind: "prose",
      id: "context",
      label: "Business context",
      body: [
        "In 2023, generative AI had arrived in public consciousness but almost nowhere in enterprise operating models. Most organisations were looking at it as a novelty — a chatbot on a website, a writing tool for the marketing team — rather than as something that could change how the business itself ran.",
        "The engagement was a bid to a large retail property operator: a shopping centre business with tenants, consumers, internal staff, marketing, leasing, operations and customer service all generating and needing information. The question was not whether AI could answer questions. It was what an AI-enabled version of that whole operation would look like.",
      ],
    },
    {
      kind: "pillars",
      id: "problem",
      label: "Problem",
      items: [
        {
          k: "Knowledge is trapped in the organisation",
          tone: "orange",
          body: "Operating data, tenant records, historical campaigns and internal documents existed, but retrieving and combining them was manual. Research quoted in the proposal put roughly a fifth of working time into simply looking things up.",
        },
        {
          k: "Point tools do not change operations",
          tone: "cyan",
          body: "An AI customer-service bot improves customer service. It does not improve leasing, forecasting, marketing production or risk. Deploying one tool per function produces no compounding advantage.",
        },
        {
          k: "Consumer and staff needs diverge",
          tone: "cyan",
          body: "A shopper wants wayfinding, queue times and recommendations in seconds. An analyst wants a document synthesised against internal data. The same underlying capability, two very different surfaces.",
        },
        {
          k: "Generic models do not know the business",
          tone: "orange",
          body: "A public model has no knowledge of this centre's tenants, floor plans, contracts or history. Without grounding in internal data, output is fluent and useless.",
        },
      ],
    },
    {
      kind: "prose",
      id: "why",
      label: "Why enterprise AI, and why then",
      body: [
        "The proposal opened with the case for acting rather than waiting, built on published research rather than assertion: Goldman Sachs projecting generative AI could lift global GDP by around 7% and productivity by around 1.5%, and McKinsey's finding on time spent retrieving information.",
        "The argument was deliberately structured around four business outcomes rather than four technologies — accurate forecasting, operational efficiency, cost reduction, and IT and digital security. Each was then mapped down to specific capabilities, so the proposal read as a business case with an AI implementation rather than an AI pitch looking for a justification.",
      ],
    },
    {
      kind: "prose",
      id: "role",
      label: "My role",
      body: [
        "I worked as a Business Analyst on the bid team, contributing the enterprise AI capability framework, the platform concept and the supporting analysis that connected AI capability to business value.",
        "The analytical work was structuring: taking a broad and fashionable technology and decomposing it into named capabilities, mapped to named business functions, each with an articulated mechanism and value. That decomposition is what turned a general enthusiasm for AI into something a client could evaluate, price and decide on.",
      ],
    },
    {
      kind: "list",
      id: "research",
      label: "Research performed",
      dense: true,
      intro: "All of it feeding the capability model rather than sitting in an appendix.",
      items: [
        "Generative AI capability analysis — what the technology was genuinely good at in 2023",
        "Macroeconomic and productivity research on AI's projected business impact",
        "Sector application analysis for large retail and shopping centre operations",
        "Demand forecasting, consumer preference and pricing optimisation use cases",
        "Workflow automation opportunities across analytics, service, supply chain and marketing",
        "Cost reduction analysis covering inventory and labour",
        "IT and digital security applications — application modelling, fraud detection, vulnerability monitoring",
        "Benchmark review of published third-party vendor deployments",
        "User scenario analysis split between external consumers and internal staff",
      ],
    },
    {
      kind: "stack",
      id: "capabilities",
      label: "AI capability framework",
      intro:
        "Four business outcomes, each decomposed into the specific capabilities that would produce it. This structure is what let the client evaluate the proposal by business function rather than by technology.",
      layers: [
        {
          k: "01 · Forecasting",
          tone: "orange",
          body: "Demand forecasting from historical sales and event data → consumer preference modelling for personalised recommendation → pricing optimisation against market, trend and competitor data",
        },
        {
          k: "02 · Efficiency",
          tone: "cyan",
          body: "Data analysis and interactive visualisation → automated customer service → supply chain monitoring and issue prediction → marketing content automation → tenant and merchant vetting from background data",
        },
        {
          k: "03 · Cost",
          tone: "orange",
          body: "Inventory optimisation against seasonality and event-driven demand → reduction of manual effort in the highly automatable functions rather than across the board",
        },
        {
          k: "04 · Security & IT",
          tone: "cyan",
          body: "Application requirement modelling against current IT trends → fraud detection modelling → network vulnerability monitoring with real-time threat detection",
        },
      ],
    },
    {
      kind: "prose",
      id: "mart",
      label: "The MART framework",
      body: [
        "MART is the organising idea of the proposal. Rather than presenting a list of features, it groups AI capability into four modes of assistance — because the question a business actually asks is not \"what can the model do?\" but \"what kind of help am I asking for right now?\"",
        "Each mode has a distinct input, a distinct output and a distinct owner inside the organisation, which is what makes it a framework rather than an acronym.",
      ],
    },
    {
      kind: "features",
      id: "mart-modes",
      label: "MART · four modes of assistance",
      items: [
        {
          name: "M — Metamorphosis · optimisation",
          desc: "Structural and operational improvement. Combines internal records with external information to recommend changes to organisation, IT and staffing. Asked as \"optimise our staffing structure\" or \"how do we make recruitment more efficient?\", answered with analysis plus a concrete plan — including which processes and roles are candidates, and why.",
        },
        {
          name: "A — Art · design",
          desc: "Generation grounded in brand values and audience. Combines a brief with company values and target-segment data to produce logos, campaign imagery, promotional copy and interface prototypes — each returned with the reasoning and, for campaigns, a channel recommendation.",
        },
        {
          name: "R — Rapid · efficiency",
          desc: "Speed of retrieval and response. Gathers information across sources and returns comparable, consolidated data — and handles inbound customer issues automatically, which is where the consumer-facing service capability sits.",
        },
        {
          name: "T — Talent · analysis",
          desc: "Judgement support. Analyses large data volumes for trends, and identifies and manages risk. Asked as \"which digital transformation direction should we take?\", answered with an evaluated option list, success likelihood and modelled outcomes. Asked as \"what risks should we guard against?\", answered with an internal and external risk register.",
        },
      ],
    },
    {
      kind: "prose",
      id: "grounding",
      label: "How it was designed to work",
      body: [
        "Every interaction flow in the proposal follows the same shape: extract the key terms from what the user asked, match them against the organisation's internal database, then generate a response grounded in what came back. External web sources and the model's own knowledge are layered on top, never used in place of the internal record.",
        "That pattern is retrieval-augmented generation, designed in 2023 before the term was in common enterprise use. It is also the part of the proposal that has aged best — grounding a general model in proprietary data is now the standard architecture for exactly this class of product, and it was the right answer to the \"a public model does not know our business\" problem.",
      ],
    },
    {
      kind: "list",
      id: "scenarios",
      label: "User scenarios",
      intro:
        "Two audiences, modelled separately, because their needs share a capability layer but nothing else.",
      dense: true,
      items: [
        "Consumer — shopping inspiration and conversational product discovery",
        "Consumer — wayfinding by text description or by image, with a mapped route",
        "Consumer — finding food and services, with live queue and wait times",
        "Consumer — complaints and enquiries handled 24/7",
        "Tenant merchant — partnership and leasing enquiries",
        "Staff — data analysis and interactive visualisation",
        "Staff — summarising and classifying internal documents",
        "Staff — repetitive task generation, including templated correspondence",
        "Staff — idea generation and structured brainstorming",
        "Staff — text-to-video production for internal training and communication",
        "Staff — poster generation, and targeted edits to an existing poster without regenerating it",
        "Staff — multi-source research with source links and a written synthesis",
        "Staff — browser extension for in-place analysis of any page",
      ],
    },
    {
      kind: "pillars",
      id: "platforms",
      label: "Two platforms, one capability layer",
      items: [
        {
          k: "Mobile — the consumer surface",
          tone: "orange",
          body: "Built for speed and for people already inside the building: conversational shopping, image-based wayfinding, queue times, and always-available service. Every flow resolves in one exchange, because a shopper standing in a corridor will not conduct a dialogue.",
        },
        {
          k: "Desktop — the operator surface",
          tone: "cyan",
          body: "Built for depth: document ingestion and classification, analysis and visualisation, content production, multi-source research and report generation. Sessions are long, files are large, and history matters.",
        },
      ],
    },
    {
      kind: "prose",
      id: "value",
      label: "Enterprise value",
      body: [
        "The proposal argued value in the terms the client would be measured on: customer satisfaction from always-available service and faster in-centre navigation; internal efficiency from automated analysis, summarisation and repetitive production; and external effectiveness from faster, better-targeted marketing.",
        "The comparison slides made the argument concrete by contrasting the existing path — many steps, long cycles, multiple departments, high coordination cost and variable output — against the proposed one. That framing is the reason the proposal reads as operating-model change rather than tool adoption.",
      ],
    },
    {
      kind: "prose",
      id: "reflection",
      label: "Reflection",
      body: [
        "The most useful discipline in this project was refusing to lead with the technology. Structuring the whole proposal around four business outcomes, and only then mapping capabilities underneath them, forced every feature to answer \"what does this change about how the business runs?\" A number of genuinely impressive capabilities did not survive that question.",
        "MART was the same instinct applied to communication. Four modes of assistance is a structure a client executive can hold in their head and use to interrogate a proposal; a list of nineteen features is not. Choosing a framework people can argue with beats presenting a catalogue people politely accept.",
        "It also holds up technically better than I expected. The grounding pattern designed here — extract intent, retrieve from internal data, generate from what came back — is the architecture I now use routinely in AI product work. The 2023 version was reasoned from first principles about what the model did not know.",
      ],
    },
    {
      kind: "prose",
      id: "future",
      label: "Future outlook",
      body: [
        "Two things have changed since. The capability side has become easier — retrieval, tool use, image understanding and structured output are now standard rather than speculative, so much of what the proposal described as achievable is now straightforward to build.",
        "The hard part has moved. What decides whether an enterprise assistant is useful is no longer model capability but knowledge architecture: whether the organisation's information is retrievable, current and trustworthy enough to ground answers in. The proposal treated the internal database as a given. Doing this work now, that assumption would be the first thing I examined.",
      ],
    },
  ],
};
