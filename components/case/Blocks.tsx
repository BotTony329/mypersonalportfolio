import Image from "next/image";
import Reveal from "../primitives/Reveal";
import { withBasePath } from "@/lib/basePath";
import type { Block } from "@/content/types";

/**
 * One renderer per block kind. They live together because they are read
 * together — understanding how a case study renders should not mean opening
 * seven files.
 *
 * Animation is scroll-reveal only (see Reveal, which honours reduced-motion).
 * Nothing here runs a loop, so a long case study costs no frame budget.
 */

function Head({ label, intro }: { label: string; intro?: string }) {
  return (
    <div className="cs-head">
      <Reveal as="h2" className="cs-h2">{label}</Reveal>
      {intro ? <Reveal as="p" className="lede cs-intro">{intro}</Reveal> : null}
    </div>
  );
}

export default function BlockRenderer({ block }: { block: Block }) {
  switch (block.kind) {
    case "prose":
      return (
        <section className="cs-block" id={block.id}>
          <Head label={block.label} />
          <div className="cs-prose">
            {block.body.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 0.05} className="cs-p">{p}</Reveal>
            ))}
          </div>
        </section>
      );

    case "list":
      return (
        <section className="cs-block" id={block.id}>
          <Head label={block.label} intro={block.intro} />
          <ul className={`cs-list${block.dense ? " dense" : ""}`}>
            {block.items.map((item, i) => (
              <Reveal as="li" key={item} delay={Math.min(i, 8) * 0.04} className="cs-li">
                <span className="cs-li-n mono" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </Reveal>
            ))}
          </ul>
        </section>
      );

    case "pillars":
      return (
        <section className="cs-block" id={block.id}>
          <Head label={block.label} />
          <div className="cs-pillars">
            {block.items.map((p, i) => (
              <Reveal key={p.k} delay={i * 0.06}>
                <article className={`cs-pillar tone-${p.tone}`}>
                  <h3 className="cs-pillar-k">{p.k}</h3>
                  <p className="small">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      );

    case "flow":
      return (
        <section className="cs-block" id={block.id}>
          <Head label={block.label} intro={block.intro} />
          <ol className={`cs-flow ${block.variant}`}>
            {block.steps.map((s, i) => (
              <Reveal as="li" key={s.name} delay={Math.min(i, 10) * 0.05} className="cs-step">
                <span className="cs-step-rail" aria-hidden>
                  <i className="cs-step-dot" />
                </span>
                <span className="cs-step-body">
                  <span className="cs-step-n mono">
                    {block.variant === "timeline" ? `T-${String(i + 1).padStart(2, "0")}` : `Step ${String(i + 1).padStart(2, "0")}`}
                  </span>
                  <span className="cs-step-name">{s.name}</span>
                  <span className="small">{s.desc}</span>
                </span>
              </Reveal>
            ))}
          </ol>
        </section>
      );

    case "features":
      return (
        <section className="cs-block" id={block.id}>
          <Head label={block.label} intro={block.intro} />
          <div className="cs-features">
            {block.items.map((f, i) => (
              <Reveal key={f.name} delay={Math.min(i, 8) * 0.05}>
                <article className="cs-feature">
                  <h3 className="cs-feature-k">{f.name}</h3>
                  <p className="small">{f.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      );

    case "stack":
      return (
        <section className="cs-block" id={block.id}>
          <Head label={block.label} intro={block.intro} />
          <div className="cs-stack">
            {block.layers.map((l, i) => (
              <Reveal key={l.k} delay={i * 0.06}>
                <article className={`cs-layer tone-${l.tone}`}>
                  <h3 className="cs-layer-k mono">{l.k}</h3>
                  <p className="small">{l.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      );

    case "media":
      return (
        <section className="cs-block" id={block.id}>
          <Head label={block.label} intro={block.intro} />
          <div className={`cs-media ${block.layout}`}>
            {block.items.map((m, i) => (
              <Reveal key={m.src} delay={Math.min(i, 4) * 0.06}>
                <figure className="cs-shot">
                  <Image
                    src={withBasePath(m.src)}
                    alt={m.alt}
                    width={m.width}
                    height={m.height}
                    /* Below the fold on every case study, and the intrinsic
                       size reserves the box so nothing shifts on load. */
                    loading="lazy"
                    sizes={block.layout === "wide"
                      ? "(max-width: 900px) 100vw, 50vw"
                      : "(max-width: 700px) 80vw, 320px"}
                  />
                  {m.caption ? <figcaption className="small">{m.caption}</figcaption> : null}
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      );

    case "note":
      return (
        <section className="cs-block" id={block.id}>
          <Reveal>
            <aside className={`cs-note tone-${block.tone}`}>
              <h2 className="cs-note-k mono">{block.label}</h2>
              <p className="small">{block.body}</p>
            </aside>
          </Reveal>
        </section>
      );
  }
}
