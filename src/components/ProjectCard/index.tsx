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
      className="group flex h-full flex-col border border-black/15 px-6 py-6 transition-colors duration-300 hover:border-black/40 dark:border-white/15 dark:hover:border-white/40"
    >
      {client && (
        <p className="text-[11px] tracking-[0.2em] text-gray-500 uppercase dark:text-gray-400">
          {client}
        </p>
      )}
      <h3 className="mt-2 font-display text-xl font-normal text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      {period && (
        <p className="mt-1 font-mono text-[10px] tracking-[0.15em] text-gray-400 uppercase dark:text-gray-500">
          {period}
        </p>
      )}
      {highlight && (
        <p className="mt-3 text-sm font-medium text-gray-900 dark:text-gray-100">
          {highlight}
        </p>
      )}
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{summary}</p>
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
              className="border border-black/20 px-2 py-0.5 text-[10px] tracking-[0.15em] text-gray-600 uppercase dark:border-white/20 dark:text-gray-300"
            >
              {technology}
            </li>
          ))}
          {hiddenCount > 0 && (
            <li className="px-2 py-0.5 text-[10px] tracking-[0.15em] text-gray-400 uppercase dark:text-gray-500">
              +{hiddenCount}
            </li>
          )}
        </ul>
      )}
      <span className="mt-auto pt-5 font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
        {labels.viewProject} →
      </span>
    </Link>
  );
};

export default ProjectCard;
