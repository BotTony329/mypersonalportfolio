import Link from "next/link";
import ProjectPreview from "./ProjectPreview";
import type { CaseStudy } from "@/content/types";

/**
 * The homepage and archive card. Deliberately thin: name, one sentence,
 * category, role, status and a way in. The full story lives on its own page —
 * a card that explains the project has replaced the page it links to.
 */
export default function ProjectCard({ project }: { project: CaseStudy }) {
  return (
    <article className={`pcard accent-${project.accent}`}>
      <Link href={`/work/${project.slug}`} className="pcard-link">
        <span className="pcard-visual" aria-hidden>
          <ProjectPreview kind={project.preview} accent={project.accent} />
          <span className="pcard-mission mono">Mission {project.mission}</span>
        </span>

        <span className="pcard-body">
          <span className="pcard-cats mono">
            {project.categories.map((c) => <span key={c}>{c}</span>)}
          </span>

          <h3 className="pcard-title">{project.title}</h3>
          <span className="small pcard-summary">{project.summary}</span>

          <span className="pcard-meta">
            <span className="pcard-metacell">
              <b className="mono">Role</b>
              <span>{project.role}</span>
            </span>
            <span className="pcard-metacell">
              <b className="mono">Status</b>
              <span className={`pcard-status ${project.status}`}>
                <i className="dot" aria-hidden />{project.statusLabel}
              </span>
            </span>
          </span>

          <span className="pcard-cta">
            View case study <span aria-hidden>→</span>
          </span>
        </span>
      </Link>
    </article>
  );
}
