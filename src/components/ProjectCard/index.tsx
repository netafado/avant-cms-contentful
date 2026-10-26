import { Link } from "@/i18n/routing";
import Tag from "@/components/Tag";

import type { ProjectCardProps } from "./types";

// Cards sit three-up in the section grid; past this many chips the list
// wraps into a wall of text, so the rest collapse into a "+N" count.
export const MAX_TECHNOLOGIES = 6;

const ProjectCard = ({ project, labels }: ProjectCardProps) => {
  const {
    slug,
    title,
    client,
    period,
    highlight,
    summary,
    categories,
    technologies,
  } = project;
  const visibleTechnologies = technologies.slice(0, MAX_TECHNOLOGIES);
  const hiddenCount = technologies.length - visibleTechnologies.length;

  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex h-full flex-col rounded-panel border border-black/15 px-6 py-6 transition-colors hover:border-black/40 dark:border-hairline dark:bg-panel dark:hover:border-hairline-2"
    >
      {client && (
        <p className="font-mono text-[11px] tracking-[0.2em] text-gray-500 uppercase dark:text-meta">
          {client}
        </p>
      )}
      <h3 className="mt-2 font-display text-xl font-normal tracking-tight text-gray-900 dark:text-bright">
        {title}
      </h3>
      {period && (
        <p className="mt-1 font-mono text-[10px] tracking-[0.15em] text-gray-400 uppercase dark:text-dim">
          {period}
        </p>
      )}
      {highlight && (
        <p className="mt-3 text-sm font-medium text-gray-900 dark:text-bright">
          {highlight}
        </p>
      )}
      <p className="mt-2 text-sm text-gray-700 dark:text-read">{summary}</p>
      {categories.length > 0 && (
        <ul className="mt-4 flex flex-wrap" aria-label={labels.categories}>
          {categories.map((category, idx) => (
            <li key={`category_${idx}_${category}`}>
              <Tag text={category} color="violet" size="small" />
            </li>
          ))}
        </ul>
      )}
      {visibleTechnologies.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2" aria-label={labels.technologies}>
          {visibleTechnologies.map((technology, idx) => (
            <li
              key={`technology_${idx}_${technology}`}
              className="rounded-full border border-black/20 px-2 py-0.5 font-mono text-[10px] tracking-[0.15em] text-gray-600 uppercase dark:border-hairline-2 dark:text-dim"
            >
              {technology}
            </li>
          ))}
          {hiddenCount > 0 && (
            <li className="px-2 py-0.5 font-mono text-[10px] tracking-[0.15em] text-gray-400 uppercase dark:text-dim">
              +{hiddenCount}
            </li>
          )}
        </ul>
      )}
      <span className="mt-auto pt-5 font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase transition-colors group-hover:text-gray-900 dark:text-meta dark:group-hover:text-bright">
        {labels.viewProject} →
      </span>
    </Link>
  );
};

export default ProjectCard;
