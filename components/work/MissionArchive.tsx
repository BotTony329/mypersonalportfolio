"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Reveal from "../primitives/Reveal";
import type { CaseStudy, Category } from "@/content/types";

/**
 * The mission archive: a database view rather than a card wall.
 *
 * The filter only renders when there is more than one category to choose
 * between — with four projects a filter bar is decoration, and decoration
 * that does nothing is worse than none.
 */
export default function MissionArchive({
  projects,
  categories,
}: {
  projects: CaseStudy[];
  categories: Category[];
}) {
  const [filter, setFilter] = useState<Category | "All">("All");

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [projects, filter],
  );

  const showFilter = categories.length > 1;

  return (
    <div className="wrap archive">
      {showFilter ? (
        <div className="archive-filter" role="group" aria-label="Filter by discipline">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              type="button"
              className={`archive-chip${filter === c ? " on" : ""}`}
              aria-pressed={filter === c}
              onClick={() => setFilter(c as Category | "All")}
            >
              {c}
              <span className="archive-count mono">
                {c === "All" ? projects.length : projects.filter((p) => p.categories.includes(c as Category)).length}
              </span>
            </button>
          ))}
        </div>
      ) : null}

      <div className="archive-head mono" aria-hidden>
        <span>Mission</span>
        <span>Programme</span>
        <span>Contribution</span>
        <span>Status</span>
      </div>

      <ul className="archive-rows">
        {visible.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={Math.min(i, 6) * 0.05}>
            <Link href={`/work/${p.slug}`} className={`archive-row accent-${p.accent}`}>
              <span className="archive-n mono">{p.mission}</span>

              <span className="archive-main">
                <span className="archive-title">{p.title}</span>
                <span className="archive-summary small">{p.summary}</span>
                <span className="archive-cats mono">
                  {p.categories.map((c) => <span key={c}>{c}</span>)}
                </span>
              </span>

              <span className="archive-contrib small">{p.contribution}</span>

              <span className="archive-status">
                <span className={`pcard-status ${p.status}`}>
                  <i className="dot" aria-hidden />{p.statusLabel}
                </span>
                {p.year ? <span className="archive-year mono">{p.year}</span> : null}
                <span className="archive-go" aria-hidden>→</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>

      {!visible.length ? (
        <p className="lede archive-empty">No missions in that discipline yet.</p>
      ) : null}
    </div>
  );
}
