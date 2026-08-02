import type { CaseStudy } from "../types";

/**
 * Sourced from Tony's published UX-design page. That page documents the
 * subject, the role and the three-stage method. It does not publish the
 * findings or the recommendations themselves, and this case study does not
 * invent them.
 */
export const uxDesignEvaluation: CaseStudy = {
  slug: "ux-design-evaluation",
  mission: "06",
  title: "UX Design Evaluation",
  titleLines: ["UX Design", "Evaluation"],
  summary:
    "A structured usability evaluation of a board-game shopping and design website — expert review, then moderated and unmoderated testing, then recommendations built from the data rather than from opinion.",
  categories: ["UX & Product Design"],
  year: "Not publicly disclosed",
  status: "completed",
  statusLabel: "Completed · Recommendations delivered",
  contribution: "Designed and ran the evaluation, analysed the data and advised recommendations",
  role: "User Experience Designer",
  preview: "orbit",
  accent: "cyan",
  featured: true,
  snapshot: {
    role: "User Experience Designer",
    projectType: "Usability evaluation · e-commerce and design website",
    timeline: "Not publicly disclosed",
    tools: ["Expert review", "Test scenario design", "Moderated usability testing", "Unmoderated usability testing", "Data analysis"],
    team: "Not publicly disclosed",
    status: "Findings and recommendations delivered",
  },
  seoDescription:
    "A usability evaluation of a board-game shopping and design website: expert review, moderated and unmoderated testing, data analysis and improvement recommendations.",
  blocks: [
    {
      kind: "prose",
      id: "context",
      label: "Context",
      body: [
        "The subject was a website where people both shop for board games and design their own — two quite different tasks sharing one interface. That combination is where usability problems tend to hide, because a navigation model that suits browsing a catalogue rarely suits a creation tool.",
        "The work was evaluation rather than redesign: establish what was actually wrong, with evidence, before anyone proposed a fix.",
      ],
    },
    {
      kind: "pillars",
      id: "problem",
      label: "The problem with evaluating by opinion",
      items: [
        {
          k: "Everyone has a theory",
          tone: "cyan",
          body: "Any stakeholder can name three things they dislike about a website. Without a method, the loudest theory wins rather than the most common problem.",
        },
        {
          k: "Experts see different things to users",
          tone: "orange",
          body: "An expert review surfaces violations of known principles. It does not reliably predict where real users will actually get stuck — which is why it is a starting point, not a conclusion.",
        },
        {
          k: "Watching changes behaviour",
          tone: "cyan",
          body: "Moderated sessions produce rich explanation but a slightly performed version of the task. Unmoderated sessions produce natural behaviour with no commentary. Each covers the other's blind spot.",
        },
      ],
    },
    {
      kind: "prose",
      id: "role",
      label: "My role",
      body: [
        "User Experience Designer. I was responsible for analysing the site, identifying problems, designing both the moderated and unmoderated tests, collecting and analysing the data, and advising the recommendations that came out of it.",
        "That is the full evaluation loop — designing the instrument, running it, and being accountable for what the numbers were taken to mean.",
      ],
    },
    {
      kind: "list",
      id: "responsibilities",
      label: "Responsibilities",
      items: [
        "Analysed the website against usability principles",
        "Identified candidate problems through expert review",
        "Designed expert test scenarios",
        "Designed moderated usability tests",
        "Designed unmoderated usability tests",
        "Collected test data",
        "Analysed the results",
        "Advised improvement recommendations based on the findings",
      ],
    },
    {
      kind: "flow",
      id: "method",
      label: "Method",
      variant: "vertical",
      intro:
        "Three stages, deliberately sequenced so each one narrows what the next has to investigate.",
      steps: [
        {
          name: "Expert review",
          desc: "A structured pass over the site against usability principles, producing a set of candidate problems and the scenarios worth putting in front of real users. This is the cheap stage, and its job is to make the expensive stage efficient.",
        },
        {
          name: "Moderated testing",
          desc: "Sessions with a facilitator present, where participants work through the scenarios and can be asked why they did what they did. Small numbers, high explanatory value — this is where you learn the reason behind a failure.",
        },
        {
          name: "Unmoderated testing",
          desc: "Participants complete tasks alone, in their own environment, with no facilitator shaping the interaction. Lower explanatory value, more natural behaviour, and the check on whether a moderated finding was an artefact of being watched.",
        },
        {
          name: "Data analysis",
          desc: "Results from all three sources compared, so a problem confirmed by more than one method carries more weight than a problem one participant hit once.",
        },
        {
          name: "Recommendations",
          desc: "Improvement recommendations derived from the findings, tied back to the evidence that motivated them rather than presented as preferences.",
        },
      ],
    },
    {
      kind: "features",
      id: "decisions",
      label: "Why this design of study",
      items: [
        {
          name: "Expert review first, not instead",
          desc: "Running it first turns a broad site into a short list of scenarios. Treating it as the whole evaluation would have delivered a list of principle violations with no evidence that any of them cost a real user anything.",
        },
        {
          name: "Both moderated and unmoderated",
          desc: "One tells you why, the other tells you whether it happens when nobody is looking. Running only one leaves a known gap in what the study can claim.",
        },
        {
          name: "Scenarios over free exploration",
          desc: "Task scenarios make sessions comparable. Free exploration produces interesting anecdotes that cannot be counted.",
        },
        {
          name: "Recommendations bound to findings",
          desc: "Every recommendation traces to something observed, which is what makes a UX report arguable on evidence rather than on taste.",
        },
      ],
    },
    {
      kind: "note",
      id: "gaps",
      label: "What is not documented",
      tone: "orange",
      body: "The published source records the method and the role but not the specific findings, the recommendations, participant numbers, or whether the recommendations were implemented. Those are omitted here rather than reconstructed — a usability study with invented findings would be worse than no case study at all.",
    },
    {
      kind: "prose",
      id: "lessons",
      label: "Reflection",
      body: [
        "The most useful habit this project built is separating the question \"is this wrong?\" from \"does this cost anyone anything?\" Expert review answers the first cheaply. Only testing answers the second, and a surprising number of principle violations turn out to cost nothing at all.",
        "It also shaped how I work as an analyst now. The instinct to run a moderated and an unmoderated version of the same question — to ask both why and whether — is the same instinct behind using A/B testing to settle a contested product decision rather than arguing it in a meeting.",
      ],
    },
  ],
};
