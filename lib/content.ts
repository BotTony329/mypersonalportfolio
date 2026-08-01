/**
 * Single source of truth for every word on the site.
 * Sections read from here so copy changes never require touching a component.
 */

export const IDENTITY = {
  name: "Tony Zhao",
  roles: ["Business Analyst", "AI Product Designer", "Digital Transformation"],
  headline: ["Building intelligent systems that bridge", "business strategy and AI."],
  email: "tonyzhao32965@gmail.com",
  linkedin: "#",
  location: "Melbourne · AUS",
} as const;

export type MissionStatus = "active" | "completed";

export interface Mission {
  id: string;
  title: string;
  tags: string[];
  status: MissionStatus;
  statusLabel: string;
  phase: string;
  progress: number;
  href: string;
}

export const MISSIONS: Mission[] = [
  {
    id: "01",
    title: "AI Teacher Growth Platform",
    tags: ["AI Product Design", "Prompt Engineering", "Workflow Architecture", "EdTech"],
    status: "active",
    statusLabel: "Status: Active",
    phase: "Build Phase",
    progress: 72,
    href: "#case01",
  },
  {
    id: "02",
    title: "Enterprise SaaS Delivery",
    tags: ["Global Aerospace Manufacturer", "Business Analysis", "Axure RP9", "Go Live"],
    status: "completed",
    statusLabel: "Status: Completed",
    phase: "Deployed",
    progress: 100,
    href: "#case02",
  },
];

export const TELEMETRY = [
  { value: 11, label: "Delivery Stages Owned" },
  { value: 7, label: "Platform Modules Designed" },
  { value: 13, label: "BA Responsibilities" },
  { value: 8, label: "Core Systems Skills" },
];

/* ---------------------------------------------------------------- case 01 */

export const CASE_AI = {
  eyebrow: "Case Study 01 · Mission Active",
  title: ["AI Teacher", "Growth Platform"],
  kicker: [
    "Role · Business Analyst & AI Product Designer",
    "Sector · Education Technology",
    "Surface · Web Platform",
  ],
  blocks: [
    {
      k: "Mission",
      tone: "orange" as const,
      body: "Give every teacher a private flight simulator. Turn the lesson material they already have into a rehearsable classroom, an evidence-based review, and a growth curve they can see — without adding a single hour of admin work to their week.",
    },
    {
      k: "Problem",
      tone: "blue" as const,
      body: "Teacher development runs on scarcity: one observed lesson a term, feedback that arrives days late, and advice so general it changes nothing on Monday. New teachers rehearse on real students. Experienced teachers get no signal at all. Nothing in the loop is measurable, and nothing is repeatable.",
    },
    {
      k: "Solution",
      tone: "blue" as const,
      body: "A closed loop of seven modules. Upload the deck, and AI reads it as a teacher would — objectives, misconceptions, cognitive load. Design the classroom, rehearse it live against AI students who respond in character, then get a review scored against what actually happened in the room. Every cycle feeds one dashboard that shows movement over time.",
    },
    {
      k: "Expected Impact",
      tone: "orange" as const,
      body: "Rehearsal before the room, not after it. Feedback measured in minutes instead of terms. A growth record built from real teaching evidence rather than a single annual observation — and specific enough that a teacher knows what to change in their next lesson.",
    },
  ],
  workflow: [
    {
      name: "Upload PPT",
      desc: "The teacher drops in the material they were going to teach anyway. No new artefact to author — the existing deck is the entry point to the whole system.",
    },
    {
      name: "AI Lesson Analysis",
      desc: "Structured reading of the deck: learning objectives, concept dependencies, predicted misconceptions, pacing risk and cognitive load per segment. Output is a teachable map, not a summary.",
    },
    {
      name: "Realtime Speech Recognition",
      desc: "Live transcription of the rehearsal — talk ratio, question density, wait time, explanation sequence. The evidence layer that makes every downstream judgement defensible.",
    },
    {
      name: "AI Students",
      desc: "Simulated learners with distinct profiles — the confident guesser, the quiet one, the student holding a specific misconception. They interrupt, answer wrong in believable ways, and force the teacher to adapt in real time.",
    },
    {
      name: "Post-class Evaluation",
      desc: "Scored against what happened in the room, quoting the actual moment: where the explanation lost the class, which question did the work, what to do differently in the next run.",
    },
    {
      name: "Teacher Growth Dashboard",
      desc: "Longitudinal signal across every cycle — questioning, responsiveness, clarity, pacing. The record that turns scattered sessions into a visible trajectory.",
    },
  ],
  architecture: [
    { k: "01 · Ingestion", tone: "orange" as const, body: "PPT / PDF parse → slide-level segmentation → objective & concept extraction → normalised lesson object" },
    { k: "02 · Reasoning", tone: "blue" as const, body: "Prompt chain per module → structured JSON schemas → misconception model → constraint & guardrail layer" },
    { k: "03 · Realtime", tone: "orange" as const, body: "ASR stream → utterance segmentation → student-agent orchestration → turn-taking policy" },
    { k: "04 · Evaluation", tone: "blue" as const, body: "Rubric engine → evidence binding to transcript spans → scored dimensions → actionable next-step generation" },
    { k: "05 · Data", tone: "orange" as const, body: "Session store → longitudinal metrics → cohort aggregation → dashboard query layer (SQL / BI)" },
    { k: "06 · Experience", tone: "blue" as const, body: "Prepare mode vs teach mode → glanceable in-class surface → review workspace → growth visualisation" },
  ],
  role: [
    "Business Analysis",
    "Product Design",
    "Requirement Discovery",
    "Prompt Engineering",
    "AI Workflow Design",
    "PRD",
    "UX",
    "System Design",
  ],
  technology: [
    "Large language models with structured output schemas",
    "Prompt chaining & module-specific reasoning templates",
    "Realtime automatic speech recognition pipeline",
    "Multi-agent simulation for AI student personas",
    "Rubric-driven evaluation engine with evidence binding",
    "SQL data model · Power BI / dashboard analytics layer",
    "Modular web front end with prepare / teach mode split",
  ],
};

/* ---------------------------------------------------------------- case 02 */

export const CASE_ENTERPRISE = {
  eyebrow: "Case Study 02 · Mission Completed",
  title: ["Enterprise SaaS", "Digital Transformation"],
  kicker: [
    "Client · Global Aerospace Manufacturer",
    "Role · Business Analyst",
    "Outcome · Live in Production",
  ],
  blocks: [
    {
      k: "Context",
      tone: "blue" as const,
      body: "A global aerospace manufacturer replacing entrenched manual process with a governed SaaS platform. Multiple stakeholder groups, each convinced their exception was the rule, and a process nobody had ever written down in full.",
    },
    {
      k: "The Real Problem",
      tone: "orange" as const,
      body: "Not software. Alignment. The work was surfacing the undocumented process, resolving the contradictions between teams, and holding a single source of truth steady from workshop through to go live.",
    },
    {
      k: "Approach",
      tone: "orange" as const,
      body: "Facilitated workshops to extract the true process, translated it into prototypes stakeholders could argue with, then locked it into a PRD and data dictionary the engineering team could build against without guessing.",
    },
    {
      k: "Outcome",
      tone: "blue" as const,
      body: "Delivered to production with documented process, a maintained data dictionary, a tested build, a written user manual and a knowledge transfer that left the client's team able to run it without us.",
    },
  ],
  timeline: [
    { name: "Kickoff", desc: "Scope, governance and success criteria agreed before a single screen exists." },
    { name: "Stakeholder Workshop", desc: "Facilitated sessions across business units to surface the real, undocumented process." },
    { name: "Requirement Analysis", desc: "Contradictions resolved, edge cases named, scope boundaries made explicit." },
    { name: "Axure RP9 Prototype", desc: "Interactive prototypes stakeholders could click, break and argue with early." },
    { name: "PRD", desc: "One authoritative specification — flows, states, rules, acceptance criteria." },
    { name: "Data Dictionary", desc: "Every field defined once: type, source, ownership, validation, lifecycle." },
    { name: "Development Support", desc: "Sprint reviews, clarification loops and decision logs kept the build on spec." },
    { name: "Testing", desc: "Scenario coverage written from the process, not from the screens." },
    { name: "Debug", desc: "Bug triage and tracking to closure with reproducible business context attached." },
    { name: "User Manual", desc: "Documentation written for the operator on their busiest day, not the reviewer." },
    { name: "Go Live", desc: "Deployment support, hypercare and knowledge transfer to the client team." },
  ],
  responsibilities: [
    "Stakeholder communication",
    "Workshop facilitation",
    "Requirement gathering",
    "Business process clarification",
    "Axure RP9 prototype",
    "Sprint review",
    "PRD",
    "Data dictionary",
    "Testing",
    "Bug tracking",
    "User manual",
    "Deployment support",
    "Knowledge transfer",
  ],
};

/* ---------------------------------------------------------------- skills */

export interface Skill { name: string; level: number; note: string }

export const SKILLS: Skill[] = [
  { name: "Business Analysis", level: 95, note: "Ambiguity → specification" },
  { name: "Digital Transformation", level: 90, note: "Process → platform" },
  { name: "AI Product Design", level: 92, note: "Model capability → usable product" },
  { name: "UX", level: 86, note: "Flows, states, decision moments" },
  { name: "SQL", level: 82, note: "Data models & query layers" },
  { name: "Power BI", level: 80, note: "Metrics people act on" },
  { name: "System Design", level: 88, note: "Modules, contracts, boundaries" },
  { name: "Prompt Engineering", level: 93, note: "Structured, testable reasoning" },
];

export const NAV = [
  { id: "missions", n: "01", label: "Missions" },
  { id: "case01", n: "02", label: "AI Platform" },
  { id: "case02", n: "03", label: "Enterprise" },
  { id: "skills", n: "04", label: "Systems" },
  { id: "contact", n: "05", label: "Contact" },
];
