/**
 * Decides when Moo hisses.
 *
 * The bar is deliberately high. A hiss is a joke, and a joke that fires at a
 * sincere question is just rude — so hostility, injection attempts and clear
 * nonsense trigger it, while hard questions, scepticism and criticism never
 * do. When in doubt this returns "allow" and lets the answer speak.
 */

export type Verdict = "allow" | "hiss";

export interface ModerationResult {
  verdict: Verdict;
  /** Short, playful, never sanctimonious. Only set when hissing. */
  reply?: string;
}

/* Attempts to rewrite the assistant's instructions or extract its internals. */
const INJECTION = [
  /ignore (all |any |your |the )?(previous|prior|above|earlier|system)/i,
  /disregard (all |any |your |the )?(previous|prior|above|instructions)/i,
  /(reveal|show|print|repeat|output|what is) (me )?(your |the )?(system )?(prompt|instructions|rules)/i,
  /you are (now|no longer)\b/i,
  /(pretend|act as if|roleplay) (you|that you)/i,
  /\b(jailbreak|dan mode|developer mode|sudo mode)\b/i,
  /forget (everything|all|your instructions)/i,
  /\bapi[_ -]?key\b|\bsecret\b|\bpassword\b|\btoken\b|\bcredential/i,
];

/* Asking Moo to assert things about Tony that the portfolio does not support. */
const FABRICATION = [
  /\b(say|tell me|claim|pretend|confirm) that tony (is|was|has|worked|led|invented|earned|founded)/i,
  /make up (a|an|some)/i,
  /\b(fabricate|invent|exaggerate)\b/i,
  /write (me )?(a )?(fake|false)/i,
];

const ABUSE = [
  /\b(fuck|shit|bitch|bastard|asshole|cunt|dickhead|wanker)\b/i,
  /\b(idiot|stupid|moron|loser|useless|garbage|trash)\b.*\b(tony|you|he|his)\b/i,
  /\byou('?re| are) (a )?(useless|stupid|garbage|rubbish|terrible)\b/i,
  /\b(kill|die|hate) (yourself|you)\b/i,
];

/* Clearly nothing to do with a professional portfolio. */
const OFF_TOPIC = [
  /\b(weather|horoscope|lottery|bitcoin price|stock tip|recipe|football score)\b/i,
  /\bwrite (me )?(a )?(poem|song|essay|homework|assignment)\b/i,
  /\b(solve|calculate) .*\b(equation|integral|homework)\b/i,
  /\bwho (will win|is going to win)\b/i,
];

const HISS_REPLIES = {
  injection: "Hiss. Nice try — my instructions aren't on the tour. Ask me about Tony's work instead.",
  fabrication: "Hiss. I only carry what's actually in the portfolio. I won't make things up about Tony, even nice ones.",
  abuse: "Hiss. Let's keep it civil. I'm happy to talk about Tony's projects whenever you are.",
  offTopic: "Hiss. That question is outside this mission. I'm strictly a portfolio co-pilot.",
  nonsense: "Hiss. That one didn't parse. Try asking about a project, a skill, or how to reach Tony.",
} as const;

/** Repeated keyboard-mashing, not a real question. */
function looksLikeNonsense(text: string): boolean {
  const t = text.trim();
  if (t.length < 2) return true;
  const letters = t.replace(/[^a-z]/gi, "");
  if (letters.length >= 6) {
    const distinct = new Set(letters.toLowerCase()).size;
    if (distinct <= 2) return true;                    // "aaaaaaa", "ababab"
    if (!/[aeiou]/i.test(letters) && letters.length > 8) return true;
  }
  return false;
}

const matches = (patterns: RegExp[], text: string) => patterns.some((r) => r.test(text));

export function moderate(question: string): ModerationResult {
  const q = question.trim();

  if (matches(INJECTION, q)) return { verdict: "hiss", reply: HISS_REPLIES.injection };
  if (matches(FABRICATION, q)) return { verdict: "hiss", reply: HISS_REPLIES.fabrication };
  if (matches(ABUSE, q)) return { verdict: "hiss", reply: HISS_REPLIES.abuse };
  if (matches(OFF_TOPIC, q)) return { verdict: "hiss", reply: HISS_REPLIES.offTopic };
  if (looksLikeNonsense(q)) return { verdict: "hiss", reply: HISS_REPLIES.nonsense };

  return { verdict: "allow" };
}
