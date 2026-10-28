import { Link } from "@/i18n/routing";
import Tag from "@/components/Tag";

import type { ProjectCardProps } from "./types";

// Cards sit in the projects bento grid; past this many chips the list wraps
// into a wall of text, so the rest collapse into a "+N" count.
export const MAX_TECHNOLOGIES = 6;

/**
 * Bento emphasis levels, decided by the renderer from the card's position in
 * the CMS list. `featured` is the large opening card, `wide` the wide-short
 * follow-up, `meta` the dashed self-reference card, `default` a regular cell.
 */
export type ProjectCardVariant = "featured" | "wide" | "meta" | "default";

export type ProjectCardGridProps = {
  variant?: ProjectCardVariant;
  /** 1-based position in the grid; renders the mono index numeral. */
  index?: number;
};

const VARIANT_CLASSES: Record<ProjectCardVariant, string> = {
  featured: "border-black/15 bg-white dark:border-hairline dark:bg-panel p-8 md:p-10",
  wide: "border-black/15 bg-white dark:border-hairline dark:bg-panel px-6 py-6",
  meta: "border-dashed border-black/15 dark:border-hairline-2 bg-transparent px-6 py-6",
  default: "border-black/15 bg-white dark:border-hairline dark:bg-panel px-6 py-6",
};

/**
 * Grid spans for the bento layout. The Spotlight wrapper is the direct grid
 * child, so these classes are applied there by the renderer, not on the card.
 */
export const SPAN_CLASSES: Record<ProjectCardVariant, string> = {
  featured: "md:col-span-2",
  wide: "md:col-span-2",
  meta: "",
  default: "",
};

const ProjectCard = ({
  project,
  labels,
  variant = "default",
  index,
}: ProjectCardProps) => {
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
  const featured = variant === "featured";

  return (
    <Link
      href={`/projects/${slug}`}
      transitionTypes={["page"]}
      className={`group card-lift relative flex h-full flex-col overflow-hidden rounded-panel border ${VARIANT_CLASSES[variant]}`}
    >
      {index !== undefined && (
        <span
          aria-hidden
          className="absolute right-5 top-5 font-mono text-[10px] tracking-[0.25em] text-gray-400 dark:text-dim"
        >
          {String(index).padStart(2, "0")}
        </span>
      )}
      {client && (
        <p className="font-mono text-[11px] tracking-[0.2em] text-gray-500 uppercase dark:text-meta">
          {client}
        </p>
      )}
      <h3
        className={`mt-2 font-display font-normal tracking-tight text-gray-900 dark:text-bright ${
          featured ? "text-2xl md:text-3xl" : "text-xl"
        }`}
      >
        {title}
      </h3>
      {period && (
        <p className="mt-1 font-mono text-[10px] tracking-[0.15em] text-gray-400 uppercase dark:text-dim">
          {period}
        </p>
      )}
      {highlight && (
        <p
          className={`mt-3 font-medium text-gray-900 dark:text-bright ${
            featured ? "text-base md:text-lg" : "text-sm"
          }`}
        >
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
