import type { CaseStudy } from "../types";

export const aiTeacherPlatform: CaseStudy = {
  slug: "ai-teacher-platform",
  mission: "01",
  title: "AI Teacher Growth Platform",
  titleLines: ["AI Teacher", "Growth Platform"],
  summary:
    "A connected teacher-development system that turns an ordinary lesson deck into a rehearsable classroom, an evidence-based review, and a growth record that spans terms.",
  categories: ["AI Products", "UX & Product Design"],
  year: "2025 — present",
  status: "active",
  statusLabel: "Active · Build Phase",
  contribution: "End-to-end AI product definition, from business analysis through AI workflow and PRD",
  role: "Business Analyst & AI Product Designer",
  preview: "silicon",
  accent: "orange",
  featured: true,
  snapshot: {
    role: "Business Analyst & AI Product Designer",
    projectType: "AI product · web platform · education technology",
    timeline: "2025 — present",
    tools: [
      "Large language models with structured output",
      "Prompt chaining",
      "Automatic speech recognition",
      "Multi-agent simulation",
      "SQL",
      "Power BI",
      "Axure / wireframing",
    ],
    team: "Cross-functional product and engineering team; I own analysis, definition and AI workflow design",
    status: "In active development",
  },
  seoDescription:
    "An AI-assisted teacher development platform covering lesson preparation, live classroom rehearsal, post-class evaluation and long-term growth tracking. Business analysis, product strategy and AI workflow design by Tony Zhao.",
  blocks: [
    {
      kind: "prose",
      id: "context",
      label: "Context",
      body: [
        "Teacher development is one of the few professional disciplines where the feedback loop is measured in terms rather than days. A teacher may be formally observed once or twice a year, by one colleague, for one lesson — and the notes arrive long after the class they describe.",
        "Meanwhile the tooling that has arrived in classrooms tends to solve a single slice: a lesson-plan generator here, a transcription tool there, a quiz builder somewhere else. Each is useful on its own and none of them talk to each other, so nothing accumulates. The teacher does the integration work by hand, or the tools go unused.",
      ],
    },
    {
      kind: "pillars",
      id: "problem",
      label: "Problem",
      items: [
        {
          k: "Feedback is late and subjective",
          tone: "orange",
          body: "Observation notes arrive days after the lesson and reflect one observer's reading of one session. By the time advice lands, the class it referred to is gone.",
        },
        {
          k: "Preparation and reflection are disconnected",
          tone: "cyan",
          body: "What a teacher planned and what actually happened in the room live in different places, so the review can rarely point at a specific decision and say what to do differently.",
        },
        {
          k: "Observation does not scale",
          tone: "cyan",
          body: "Traditional classroom observation costs another experienced person's time for every lesson watched. That constraint, not a lack of will, is what caps how often it happens.",
        },
        {
          k: "Growth has no evidence base",
          tone: "orange",
          body: "Development is recorded as impressions rather than measurable, comparable signal, so there is no way to show movement across a year.",
        },
      ],
    },
    {
      kind: "list",
      id: "objectives",
      label: "Objectives",
      intro:
        "The product had to earn its place in a week that is already full, which set the boundaries early.",
      items: [
        "Let a teacher rehearse a lesson before it is taught, not review it afterwards",
        "Return feedback in minutes, tied to specific moments rather than general impressions",
        "Require no new artefact — the existing lesson material is the only input",
        "Produce a record that accumulates across lessons instead of resetting each time",
        "Connect preparation, delivery, review and growth into one workflow rather than four tools",
        "Keep every judgement traceable to something that was actually said in the room",
      ],
    },
    {
      kind: "list",
      id: "users",
      label: "Users & stakeholders",
      dense: true,
      items: [
        "Early-career teachers who currently rehearse on live students",
        "Experienced teachers who receive little developmental signal at all",
        "Teaching mentors and lesson observers whose time is the scarce resource",
        "Faculty and programme leads responsible for teaching quality",
        "School and institution administrators accountable for development records",
      ],
    },
    {
      kind: "prose",
      id: "role",
      label: "My role",
      body: [
        "I work as the Business Analyst and AI Product Designer on this platform: the person sitting between what teachers actually need and what the models can reliably produce.",
        "That means the ambiguity arrives with me. I take a broad ambition — make teachers better, using AI — and turn it into module boundaries, data contracts, prompt behaviour, acceptance criteria and screens an engineering team can build against without guessing.",
      ],
    },
    {
      kind: "list",
      id: "responsibilities",
      label: "Responsibilities",
      dense: true,
      items: [
        "Business analysis",
        "Product strategy",
        "Requirement definition",
        "User-flow design",
        "AI workflow design",
        "Prompt and agent behaviour design",
        "Functional decomposition",
        "PRD preparation",
        "UX planning",
        "Testing logic",
        "Modular platform planning",
      ],
    },
    {
      kind: "prose",
      id: "discovery",
      label: "Discovery & analysis",
      body: [
        "The framing question was not \"where can AI help a teacher?\" but \"which part of the teaching cycle currently has no feedback at all?\" That reframing is what moved the product away from a lesson-plan generator and towards rehearsal and evaluation, where the gap is real.",
        "Decomposing a lesson into its observable behaviours — talk ratio, question density, wait time, the order an explanation is built in — gave the platform something measurable to work with. Those became the evidence layer that every downstream judgement has to cite.",
        "The second decision was to treat the existing deck as the only required input. Any product that asks a teacher to author something new before they get value will lose to the Sunday-evening version of that teacher.",
      ],
    },
    {
      kind: "prose",
      id: "solution",
      label: "Solution",
      body: [
        "A closed loop of connected modules rather than a chat assistant. The teacher uploads the material they were already going to teach; the system reads it the way a mentor would, builds a classroom around it, listens to the rehearsal, then scores what happened against what was planned.",
        "The important design property is that each stage produces structured output the next stage consumes. Lesson analysis is not a summary for a human to read — it is a map the classroom simulation is built from. Evaluation is not a grade — it is bound to transcript spans so a teacher can see the exact moment being described.",
      ],
    },
    {
      kind: "flow",
      id: "workflow",
      label: "System workflow",
      variant: "vertical",
      intro:
        "Ten stages, one continuous loop. Every stage hands structured data to the next, which is what makes the record comparable across lessons.",
      steps: [
        {
          name: "Upload teaching materials",
          desc: "The teacher drops in the deck they were going to teach anyway. No new artefact to author — the existing material is the entry point to the whole system.",
        },
        {
          name: "AI analyses the lesson content",
          desc: "Structured reading of the material: learning objectives, concept dependencies, predicted misconceptions, pacing risk and cognitive load per segment. The output is a teachable map, not a summary.",
        },
        {
          name: "AI prepares classroom context",
          desc: "The analysis is turned into a rehearsable room — student profiles, likely sticking points, and the questions this particular material tends to provoke.",
        },
        {
          name: "Microphone captures classroom speech",
          desc: "The rehearsal runs live. Audio capture is the point at which the system starts observing rather than predicting.",
        },
        {
          name: "Speech is transcribed in real time",
          desc: "Live transcription produces the evidence layer — talk ratio, question density, wait time, explanation sequence — that makes every later judgement defensible rather than impressionistic.",
        },
        {
          name: "AI students ask and answer questions",
          desc: "Simulated learners with distinct profiles: the confident guesser, the quiet one, the student holding a specific misconception. They interrupt, answer wrong in believable ways, and force the teacher to adapt in real time.",
        },
        {
          name: "The lesson ends",
          desc: "The session closes and the transcript, the plan and the interaction record are bound together as one reviewable artefact.",
        },
        {
          name: "AI analyses classroom performance",
          desc: "Scored against what actually happened in the room, quoting the moment: where the explanation lost the class, which question did the work, what to change on the next run.",
        },
        {
          name: "Teacher competency scores are visualised",
          desc: "Dimensions such as questioning, responsiveness, clarity and pacing are surfaced as a readable profile rather than a single overall mark.",
        },
        {
          name: "Progress is compared across previous lessons",
          desc: "The current session is placed against the teacher's own history, turning scattered sessions into a visible trajectory.",
        },
      ],
    },
    {
      kind: "stack",
      id: "architecture",
      label: "System architecture",
      intro:
        "Six layers, each with a contract the next one depends on. The boundaries are drawn where the failure modes differ — a bad transcription is a different problem from a bad rubric.",
      layers: [
        {
          k: "01 · Ingestion",
          tone: "orange",
          body: "Deck and document parsing → slide-level segmentation → objective and concept extraction → a normalised lesson object every later stage reads",
        },
        {
          k: "02 · Reasoning",
          tone: "cyan",
          body: "Prompt chain per module → structured output schemas → misconception model → constraint and guardrail layer",
        },
        {
          k: "03 · Realtime",
          tone: "orange",
          body: "Speech recognition stream → utterance segmentation → student-agent orchestration → turn-taking policy",
        },
        {
          k: "04 · Evaluation",
          tone: "cyan",
          body: "Rubric engine → evidence bound to transcript spans → scored dimensions → actionable next-step generation",
        },
        {
          k: "05 · Data",
          tone: "orange",
          body: "Session store → longitudinal metrics → cohort aggregation → dashboard query layer",
        },
        {
          k: "06 · Experience",
          tone: "cyan",
          body: "Prepare mode and teach mode split → glanceable in-class surface → review workspace → growth visualisation",
        },
      ],
    },
    {
      kind: "features",
      id: "features",
      label: "Key features",
      items: [
        {
          name: "Lesson analysis from existing material",
          desc: "Objectives, dependencies and predicted misconceptions extracted from the deck the teacher already has.",
        },
        {
          name: "AI student cohort",
          desc: "Simulated learners with persistent characteristics who respond in character rather than agreeing with everything.",
        },
        {
          name: "Live rehearsal with transcription",
          desc: "Speak the lesson to a room that answers back, with the transcript captured as evidence.",
        },
        {
          name: "Evidence-bound evaluation",
          desc: "Every point in the review cites the moment it came from, so feedback can be checked rather than trusted.",
        },
        {
          name: "Competency visualisation",
          desc: "A profile across teaching dimensions instead of a single score, readable at a glance.",
        },
        {
          name: "Longitudinal growth record",
          desc: "Comparison against the teacher's own previous sessions — the part that makes development visible.",
        },
      ],
    },
    {
      kind: "prose",
      id: "process",
      label: "Design & delivery process",
      body: [
        "The platform is specified module by module, each with its own PRD section, data contract and acceptance criteria. Keeping the modules separately specifiable is deliberate: the classroom simulation and the evaluation engine have very different reliability characteristics and should be able to change independently.",
        "AI behaviour is treated as product surface rather than configuration. Prompt design, output schemas and guardrails are specified with the same care as screens, because for this product they are what the user actually experiences.",
      ],
    },
    {
      kind: "prose",
      id: "testing",
      label: "Testing & iteration",
      body: [
        "Testing logic focuses on whether generated output is usable in a real classroom rather than whether it reads well. A lesson analysis that sounds articulate but produces no teachable decision is a failure, even though it would pass a casual review.",
        "The recurring iteration is towards specificity: early outputs described teaching in general terms, and each pass has pushed the system to cite the actual moment, name the actual misconception, and propose something a teacher could do on Monday.",
      ],
    },
    {
      kind: "pillars",
      id: "impact",
      label: "Expected impact",
      items: [
        {
          k: "Rehearsal before the room",
          tone: "orange",
          body: "Intended value: the first run of a difficult lesson happens somewhere that costs nothing, rather than in front of thirty students.",
        },
        {
          k: "Feedback in minutes",
          tone: "cyan",
          body: "Product objective: shorten the loop from a term to a single session, so advice arrives while the lesson is still recoverable.",
        },
        {
          k: "Evidence instead of impressions",
          tone: "cyan",
          body: "Intended value: a development record built from what was actually said in class, reviewable by the teacher and their mentor.",
        },
        {
          k: "Observation that scales",
          tone: "orange",
          body: "Potential operational benefit: developmental feedback that no longer consumes another experienced teacher's hour per lesson.",
        },
      ],
    },
    {
      kind: "note",
      id: "verification",
      label: "On the numbers",
      tone: "cyan",
      body: "This platform is in active development. Everything above describes intended value and product objectives — there are no adoption, performance or outcome figures to report yet, and none are claimed.",
    },
    {
      kind: "prose",
      id: "lessons",
      label: "Lessons learned",
      body: [
        "The hardest requirement work was not eliciting features but resisting them. Almost every stakeholder conversation surfaced a plausible new AI capability, and most of them would have made the loop longer without making it better.",
        "Designing AI behaviour turned out to be closer to writing acceptance criteria than to writing prompts. The useful question is never \"does this output look good?\" but \"what decision does a teacher make differently after reading it?\" — and that question kills a lot of impressive-looking output.",
        "Framing matters commercially as well as technically. Described as an AI chatbot for teachers, this product competes with everything. Described as a connected system covering before, during, after and over time, it occupies a space most tools do not attempt.",
      ],
    },
  ],
};
