/**
 * The case-study content model.
 *
 * Pages are data, not markup. A case study declares an ordered list of blocks
 * and the renderer switches on `kind` — so adding a project never means
 * touching a component, and the seventeen-part template is a convention the
 * content follows rather than seventeen mandatory fields most projects would
 * leave empty.
 *
 * Two rules hold everywhere in this directory:
 *   1. No invented metrics. Where a number was not verified, the copy says
 *      what was intended or delivered, never what it achieved.
 *   2. No client identities. Public labels only — see `confidentiality`.
 */

export type Accent = "orange" | "cyan";

/** A short titled paragraph — the workhorse block. */
export interface ProseBlock {
  kind: "prose";
  id: string;
  label: string;
  body: string[];
}

/** Bulleted facts: responsibilities, objectives, stakeholders. */
export interface ListBlock {
  kind: "list";
  id: string;
  label: string;
  intro?: string;
  items: string[];
  /** Renders as two columns on wide screens when the list is long. */
  dense?: boolean;
}

/** Side-by-side statements, each with its own accent. */
export interface PillarBlock {
  kind: "pillars";
  id: string;
  label: string;
  items: { k: string; body: string; tone: Accent }[];
}

/** An ordered, animated sequence — workflow, timeline, delivery lifecycle. */
export interface FlowBlock {
  kind: "flow";
  id: string;
  label: string;
  intro?: string;
  /** "vertical" for workflows, "timeline" for delivery stages. */
  variant: "vertical" | "timeline";
  steps: { name: string; desc: string }[];
}

/** Named capabilities with a sentence each. */
export interface FeatureBlock {
  kind: "features";
  id: string;
  label: string;
  intro?: string;
  items: { name: string; desc: string }[];
}

/** Layered system architecture. */
export interface StackBlock {
  kind: "stack";
  id: string;
  label: string;
  intro?: string;
  layers: { k: string; body: string; tone: Accent }[];
}

/** Screenshots. Sized so the browser reserves the box and nothing shifts. */
export interface MediaBlock {
  kind: "media";
  id: string;
  label: string;
  intro?: string;
  /** "wide" for desktop mockups, "devices" for phone frames side by side. */
  layout: "wide" | "devices";
  items: {
    src: string;
    alt: string;
    caption?: string;
    width: number;
    height: number;
  }[];
}

/** A callout — confidentiality, verification status, scope limits. */
export interface NoteBlock {
  kind: "note";
  id: string;
  label: string;
  body: string;
  tone: Accent;
}

export type Block =
  | ProseBlock
  | ListBlock
  | PillarBlock
  | FlowBlock
  | FeatureBlock
  | StackBlock
  | MediaBlock
  | NoteBlock;

export type ProjectStatus = "active" | "completed" | "live";

export const CATEGORIES = [
  "Enterprise Consulting",
  "Business Analysis",
  "AI Products",
  "Enterprise SaaS",
  "UX & Product Design",
  "Digital Transformation",
] as const;

export type Category = (typeof CATEGORIES)[number];

/**
 * The at-a-glance panel at the top of every case study.
 *
 * Everything except `role` is optional. A project that cannot state a timeline
 * simply omits the row — the renderer skips absent fields, so the panel never
 * has to announce what it does not know.
 */
export interface Snapshot {
  role: string;
  projectType?: string;
  timeline?: string;
  tools?: string[];
  team?: string;
  status?: string;
}

export interface CaseStudy {
  slug: string;
  /** Two-digit mission number used across the HUD. */
  mission: string;
  title: string;
  /** Split across lines in the hero. */
  titleLines: string[];
  /** One sentence, used on cards and in the assistant's knowledge base. */
  summary: string;
  categories: Category[];
  /** Omitted when a project has no publishable date. */
  year?: string;
  status: ProjectStatus;
  statusLabel: string;
  /** The single most important thing Tony did — shown on cards. */
  contribution: string;
  role: string;
  snapshot: Snapshot;
  /** Decorative preview built from SVG, so cards cost no image bytes. */
  preview: "silicon" | "grid" | "wave" | "orbit" | "ticket" | "layers" | "graph" | "arch";
  /** Shown on the homepage. The archive shows everything regardless. */
  featured?: boolean;
  accent: Accent;
  blocks: Block[];
  /** Rendered as a footnote wherever the project is named. */
  confidentiality?: string;
  /** Metadata description. Falls back to `summary`. */
  seoDescription?: string;
}
