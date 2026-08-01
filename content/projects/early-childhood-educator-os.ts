import type { CaseStudy } from "../types";

/**
 * Translated and restructured from the project's Chinese technical
 * documentation (README.md for "ECE OS — Early Childhood Educator Operating
 * System"). Developer setup instructions, seeded credentials and internal
 * environment identifiers from that document are deliberately excluded from
 * the public narrative.
 */
export const earlyChildhoodEducatorOs: CaseStudy = {
  slug: "early-childhood-educator-os",
  mission: "03",
  title: "Early Childhood Educator OS",
  titleLines: ["Early Childhood", "Educator OS"],
  summary:
    "A production SaaS workbench for Australian early childhood educators that turns a teacher's raw observation into an EYLF-aligned Learning Story and weekly plan, with AI writing held to professional documentation standards.",
  categories: ["AI Products", "Enterprise SaaS", "UX & Product Design"],
  year: "Live in production",
  status: "live",
  statusLabel: "Live · In production",
  contribution: "Full-stack AI product: architecture, AI pipeline design, UX and production hardening",
  role: "Product Designer & Full-stack Builder",
  preview: "wave",
  accent: "orange",
  snapshot: {
    role: "Product design, system architecture and full-stack implementation",
    projectType: "AI SaaS · early childhood education · web application",
    timeline: "Not publicly disclosed",
    tools: [
      "Next.js (App Router)",
      "TypeScript (strict)",
      "React",
      "Tailwind CSS",
      "SQLite",
      "Cloud document database",
      "Containerised cloud runtime",
      "LLM API",
    ],
    team: "Not publicly disclosed",
    status: "Deployed and running in production",
  },
  seoDescription:
    "A production AI SaaS workbench for Australian early childhood educators: EYLF-aligned Learning Story generation, weekly teaching plans, a dual-database architecture and an AI pipeline built for professional documentation standards.",
  blocks: [
    {
      kind: "prose",
      id: "context",
      label: "Context",
      body: [
        "Australian early childhood educators are required to document children's learning against the Early Years Learning Framework. In practice that means writing Learning Stories: structured observations of what a child did, an analysis of the learning it demonstrates, and concrete next steps — written to a professional standard, and readable by parents.",
        "It is genuinely skilled writing, and it competes for time with actually supervising children. Existing tools in this space help educators store and share observations, but the path from a hurried note taken on the floor of a playroom to a finished, framework-aligned, parent-ready story is still mostly manual.",
      ],
    },
    {
      kind: "pillars",
      id: "problem",
      label: "Problem",
      items: [
        {
          k: "Documentation competes with teaching",
          tone: "orange",
          body: "Every minute spent writing up an observation is a minute not spent with children. The cost is real, recurring, and falls on the same people every day.",
        },
        {
          k: "Framework alignment is skilled work",
          tone: "cyan",
          body: "Mapping an observation to the right learning outcomes, with evidence, is a professional judgement that takes training — and it has to be made for every story.",
        },
        {
          k: "Generic AI writing fails here",
          tone: "cyan",
          body: "Unconstrained AI produces warm, adjective-heavy prose. Professional early childhood documentation requires third-person, observable fact, with subjective and emotional language removed.",
        },
        {
          k: "Half-finished output is worse than none",
          tone: "orange",
          body: "A generation step that sometimes returns an empty or truncated section leaves the educator with cleanup work and no trust in the tool.",
        },
      ],
    },
    {
      kind: "list",
      id: "objectives",
      label: "Objectives",
      items: [
        "Take an educator from raw observation to a finished, framework-aligned Learning Story in as few steps as possible",
        "Constrain AI writing so its output meets professional documentation conventions rather than sounding pleasant",
        "Guarantee complete output every time, even when the model is unavailable",
        "Cover weekly planning in the same workbench, not a separate tool",
        "Support English and Chinese, since the workforce is multilingual",
        "Never lose an educator's work in progress",
      ],
    },
    {
      kind: "list",
      id: "users",
      label: "Users & stakeholders",
      dense: true,
      items: [
        "Early childhood educators writing daily observations and Learning Stories",
        "Room leaders and service coordinators responsible for weekly programme planning",
        "Service administrators moderating shared activity content",
        "Families, as the readers of the finished Learning Story",
      ],
    },
    {
      kind: "prose",
      id: "role",
      label: "My role",
      body: [
        "This is a product I designed and built end to end: the product decisions, the information architecture, the AI pipeline, the data model, the interface, and the production deployment.",
        "The most interesting part of the role was not the code but the constraint design — deciding what the AI is allowed to write, how the system behaves when it fails, and which of the many possible features actually shorten the path from observation to finished story.",
      ],
    },
    {
      kind: "list",
      id: "responsibilities",
      label: "Responsibilities",
      dense: true,
      items: [
        "Product definition and scope",
        "Information architecture and user flows",
        "Interaction and interface design",
        "AI pipeline and prompt architecture",
        "Framework knowledge-base integration",
        "Data modelling",
        "Database and persistence architecture",
        "Authentication and session security",
        "Full-stack implementation",
        "Containerised production deployment",
        "End-to-end regression testing",
        "Accessibility implementation",
      ],
    },
    {
      kind: "prose",
      id: "discovery",
      label: "Discovery & analysis",
      body: [
        "Benchmarking against established products in the category showed they were strong at storage and family communication, but that the specific chain — capture an observation, produce a professional written story, hand it to a parent — was longer than it needed to be. Shortening that chain became the product thesis.",
        "The second finding shaped the AI design. Early childhood documentation has explicit conventions: write in third person, record only what was observable, avoid interpreting a child's emotional state, and tie learning to named framework outcomes with evidence. A general-purpose model does almost the opposite by default. Meeting the convention was going to require constraint, not prompting alone.",
        "A third observation came from watching how the writing actually happens: rarely in one sitting, often interrupted. Any wizard that lost state on interruption would be abandoned regardless of output quality.",
      ],
    },
    {
      kind: "prose",
      id: "solution",
      label: "Solution",
      body: [
        "A single web workbench with two core surfaces — Learning Stories and weekly teaching plans — supported by a shared activity library, drafts that survive interruption, and output pages designed to be copied or printed for families.",
        "The Learning Story wizard was reduced from eight steps to six, structured so the educator supplies observable facts and the system does the professional writing. The output is deliberately three separate sections rather than one block of prose, each independently editable, because educators want to accept the structure and adjust the wording.",
      ],
    },
    {
      kind: "flow",
      id: "workflow",
      label: "Learning Story workflow",
      variant: "vertical",
      intro:
        "Six steps of structured input, three sequential AI generations, one reviewable artefact. Drafts save continuously throughout.",
      steps: [
        { name: "About the child", desc: "Name, age and observation date collected on a single screen rather than spread across three." },
        { name: "Activity type", desc: "A single choice from a small set of activity cards, which also seeds the framework outcomes the analysis will consider." },
        { name: "Place and actions", desc: "Where it happened and what the child did, captured as selectable chips with a free-text option so unusual cases are never blocked." },
        { name: "Observation", desc: "The educator's own account, required and validated for minimum substance, plus three optional prompts — what the child said, what challenged them, how they reacted — that measurably improve the generated writing." },
        { name: "Photos", desc: "Optional supporting images, uploaded to object storage rather than held in the application database." },
        { name: "Review and generate", desc: "A final check of the captured context, then generation of the finished story." },
        { name: "Observation section generated", desc: "Third person, observable fact only, with emotional and evaluative adjectives prohibited and filtered after generation." },
        { name: "Analysis of learning generated", desc: "One to three framework outcomes identified, each with an evidence-based rationale and a reference to the specific sub-outcome." },
        { name: "Next steps generated", desc: "Three to five low-cost extension suggestions an educator could actually run in their own room." },
        { name: "Review, edit and share", desc: "Each section is independently editable inline, then copied or printed for families." },
      ],
    },
    {
      kind: "stack",
      id: "architecture",
      label: "System architecture",
      intro:
        "A single full-stack application, layered so that business code never knows which database it is talking to.",
      layers: [
        {
          k: "01 · Presentation",
          tone: "orange",
          body: "Server and client components handling the wizard, story pages, planning and community surfaces. No direct database access from the UI layer.",
        },
        {
          k: "02 · Route handlers",
          tone: "cyan",
          body: "Authentication, input validation, rate limiting, and orchestration of the repository and AI layers.",
        },
        {
          k: "03 · Repository",
          tone: "orange",
          body: "Business-shaped data operations — create story, update story, save draft. The only layer the application code calls.",
        },
        {
          k: "04 · Data driver",
          tone: "cyan",
          body: "One interface, two implementations: an embedded SQL database for local and single-container use, a cloud document database in production. Switching is configuration, not a rewrite.",
        },
        {
          k: "05 · AI engine",
          tone: "orange",
          body: "Model calls, framework knowledge-base injection, banned-term post-filtering, per-section quality gates and deterministic fallbacks. Server-side only.",
        },
        {
          k: "06 · Storage",
          tone: "cyan",
          body: "Photographs held in object storage with time-limited access URLs, keeping large binaries out of the document database entirely.",
        },
      ],
    },
    {
      kind: "features",
      id: "features",
      label: "Key features",
      items: [
        { name: "Six-step Learning Story wizard", desc: "Reduced from eight steps, with validation that asks for substance rather than length." },
        { name: "Three-part AI generation", desc: "Observation, analysis and next steps generated separately so each can be gated, filtered and edited independently." },
        { name: "Framework outcome tagging", desc: "Learning outcomes extracted from the analysis and attached to the story for filtering and display." },
        { name: "Weekly teaching plans", desc: "A Monday-to-Friday planning grid with themes, learning areas and framework coverage." },
        { name: "Shared activity library", desc: "Educators submit activities, administrators moderate them, and approved entries become a browsable, likeable resource." },
        { name: "Continuous draft saving", desc: "Debounced autosave with forced flush when the tab is hidden or closed, restoring every field, image and step position." },
        { name: "Bilingual interface", desc: "English and Chinese throughout, including generated content, with framework outcome identifiers left untranslated." },
        { name: "Parent-ready output", desc: "Finished stories formatted for one-click copy or print." },
      ],
    },
    {
      kind: "prose",
      id: "aidesign",
      label: "Designing AI that meets a professional standard",
      body: [
        "The generation pipeline runs three calls in sequence, each with its own constraints. The observation prompt forbids emotional and evaluative language and requires third-person observable fact. Because instructions alone are not reliable enough, generated text is then scanned for a banned vocabulary — warm adjectives that would fail a professional review — and regenerated once with a corrective instruction if any are found.",
        "The analysis stage receives the full framework knowledge base and is required to produce a constrained structure: one to three outcomes, each with an evidence-based rationale and a cited sub-outcome, in a fixed format the interface can parse reliably.",
        "Every section passes a completeness gate before it is accepted. If a section fails, a deterministic template built from the educator's own captured inputs is used instead, and the response is marked as having come from the fallback. The educator never sees a half-written story — which was the single most important reliability property for a tool people are meant to trust with professional documentation.",
      ],
    },
    {
      kind: "prose",
      id: "testing",
      label: "Testing & iteration",
      body: [
        "A twenty-two case end-to-end regression suite covers the combinations that matter: different age bands, different activity types, short and long observations, optional fields present and absent, and stories with and without photographs. Each case asserts that all sections are present and pass their length gates.",
        "Draft behaviour is tested as its own flow — save, close, reopen, and confirm that free-text fields, selections, images and step position all return. The inline edit path has its own coverage, added after a production defect made clear why it needed it.",
        "Accessibility was implemented alongside rather than retrofitted: keyboard reachability, visible focus rings, ARIA labelling, mobile-first layout, and live-region announcements while generation is running.",
      ],
    },
    {
      kind: "features",
      id: "incidents",
      label: "What production taught me",
      intro:
        "Six documented incidents from running this system in production. These are the notes I would want from anyone I was hiring.",
      items: [
        {
          name: "Configuration vanished on every redeploy",
          desc: "The container platform replaced the environment configuration wholesale rather than merging it. The fix was procedural — always resubmit the complete configuration — and the lesson was to check whether a platform merges or replaces before assuming.",
        },
        {
          name: "Cold starts returned server errors",
          desc: "A credential embedded at deploy time carried a 24-hour expiry, so the database driver failed to initialise after it lapsed. Reissuing it as a non-expiring credential removed a recurring, confusing failure.",
        },
        {
          name: "Every AI generation silently fell back",
          desc: "A placeholder key had been deployed, and container environment variables took precedence over the local configuration file that held the real one. The fallback design meant users still got complete stories — but it also meant the failure was invisible until the response source field was checked. Observability of a graceful degradation matters as much as the degradation.",
        },
        {
          name: "A partial update wiped required fields",
          desc: "Merging a patch object over the current record spread undefined values across fields the edit had not touched, violating not-null constraints. Applying only defined keys fixed it; the general lesson is that object spread is not a safe partial update.",
        },
        {
          name: "The local test run was killed by the OS",
          desc: "Running the full regression suite locally exhausted memory and the process was terminated. Not a product defect at all — but a reminder to confirm where a failure lives before debugging the wrong system.",
        },
        {
          name: "Model calls occasionally exceeded the timeout",
          desc: "Individual generations could run past a minute. Resolved with a longer explicit timeout, a raised route duration limit, and a per-user hourly rate limit that also bounds cost.",
        },
      ],
    },
    {
      kind: "list",
      id: "security",
      label: "Security & data handling",
      dense: true,
      items: [
        "Passwords hashed with bcrypt; email addresses normalised and case-insensitively unique",
        "Cryptographically random session tokens in HTTP-only, secure, same-site cookies with server-side expiry",
        "Uploaded photographs served only to their owner, with unauthenticated and cross-user access refused",
        "All model and platform credentials confined to the server — never in the client bundle, logs or responses",
        "Per-user rate limiting on AI endpoints to prevent abuse and bound cost",
        "Production fails loudly if the cloud database cannot initialise, rather than silently falling back to local storage",
        "TypeScript strict mode throughout, with the data driver interface constraining every persistence method",
      ],
    },
    {
      kind: "pillars",
      id: "outcome",
      label: "Delivery outcome",
      items: [
        {
          k: "Running in production",
          tone: "orange",
          body: "Deployed as a container on a managed cloud runtime with HTTPS access, cloud document persistence and object storage for media.",
        },
        {
          k: "Deliberately small dependency surface",
          tone: "cyan",
          body: "No ORM and no UI component library. Six production dependencies, which keeps upgrade and audit cost proportionate to a product this size.",
        },
        {
          k: "Portable persistence",
          tone: "cyan",
          body: "One driver interface lets the same business code run against an embedded SQL database or a cloud document store, with the schema shaped to allow a later move to managed SQL.",
        },
        {
          k: "AI that fails safely",
          tone: "orange",
          body: "Quality gates and deterministic fallbacks mean the wizard always produces a complete story, whether or not the model responds.",
        },
      ],
    },
    {
      kind: "note",
      id: "verification",
      label: "On the numbers",
      tone: "cyan",
      body: "User counts, adoption and commercial results for this product are not publicly disclosed and are not claimed here. The outcomes above describe what was built and deployed.",
    },
    {
      kind: "prose",
      id: "lessons",
      label: "Lessons learned",
      body: [
        "One abstraction can be worth a great deal when it sits at a genuine seam. The data driver interface exists because local development and production have irreconcilable persistence needs — and because it exists, moving between them costs nothing in business code. That is the shape of an abstraction that pays for itself.",
        "Constraining AI output is product work, not prompt tuning. The professional standard was reached through a combination of instruction, a domain knowledge base, post-generation filtering, per-section quality gates and deterministic fallbacks — five mechanisms, because any one of them alone is unreliable.",
        "Most of what I now do differently came from production rather than from design. Whether a platform merges or replaces configuration, whether a credential expires, which environment source wins, and whether a partial update is really partial are not questions that occur to you at the whiteboard.",
      ],
    },
  ],
};
