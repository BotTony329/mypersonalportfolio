/** The contract between the assistant UI and whatever answers it. */

export type Emotion = "idle" | "purring" | "hiss";

export interface ChatSource {
  title: string;
  href: string;
  section: string;
}

export interface ChatReply {
  answer: string;
  emotion: Emotion;
  suggestedQuestions: string[];
  sources: ChatSource[];
  /** How the answer was produced — useful when debugging a deployment. */
  origin: "model" | "local" | "moderation";
}

export interface ChatRequest {
  question: string;
  /** Current route, so follow-up suggestions stay relevant to the page. */
  path?: string;
}

export const isEmotion = (v: unknown): v is Emotion =>
  v === "idle" || v === "purring" || v === "hiss";
