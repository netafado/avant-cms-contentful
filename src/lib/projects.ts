import { cache } from "react";
import { client } from "@/lib/contentful";
import { defaultLocale, toContentfulLocale } from "@/i18n/locales";
import type { ProjectFieldsFragment } from "@/lib/contentful/__generated/sdk";

export type ProjectSummary = {
  title: string;
  slug: string;
  client: string;
  role: string;
  period: string;
  highlight: string;
  summary: string;
  categories: string[];
  technologies: string[];
  order: number;
};

export type Project = ProjectSummary & {
  body: string;
  seoFields?: ProjectFieldsFragment["seoFields"];
};

/**
 * Shape shared by the generated `ProjectCardFieldsFragment` and the full
 * `Project` entry type that nested collections (ComponentProjectList) expose,
 * so one mapper serves both the section handler and the detail page.
 */
export type ProjectCardSource = {
  title?: string | null;
  slug?: string | null;
  client?: string | null;
  role?: string | null;
  period?: string | null;
  highlight?: string | null;
  summary?: string | null;
  categories?: Array<string | null> | null;
  technologies?: Array<string | null> | null;
  order?: number | null;
};

const compact = (values?: Array<string | null> | null): string[] =>
  (values ?? []).filter((value): value is string => Boolean(value));

export function toProjectSummary(item: ProjectCardSource): ProjectSummary {
  return {
    title: item.title ?? "",
    slug: item.slug ?? "",
    client: item.client ?? "",
    role: item.role ?? "",
    period: item.period ?? "",
    highlight: item.highlight ?? "",
    summary: item.summary ?? "",
    categories: compact(item.categories),
    technologies: compact(item.technologies),
    order: item.order ?? Number.MAX_SAFE_INTEGER,
  };
}

function toProject(item: ProjectFieldsFragment): Project {
  return {
    ...toProjectSummary(item),
    body: item.body ?? "",
    seoFields: item.seoFields ?? undefined,
  };
}

/**
 * Lists published projects from Contentful in display order. Memoized per
 * request; returns an empty list when the CMS is unreachable so callers
 * (e.g. the sitemap) can degrade gracefully instead of failing.
 */
export const listProjects = cache(
  async (locale: string = defaultLocale): Promise<ProjectSummary[]> => {
    try {
      const data = await client.projects({
        locale: toContentfulLocale(locale),
      });
      const items = data.projectCollection?.items ?? [];
      return items
        .filter((item): item is NonNullable<typeof item> => item !== null)
        .map(toProjectSummary)
        .filter((project) => project.slug)
        .sort((a, b) => a.order - b.order);
    } catch (error) {
      console.error(`Error fetching projects (${locale}):`, error);
      return [];
    }
  }
);

/**
 * Fetches a single project by slug in the given route locale, memoized per
 * request so generateMetadata and the page share one CMS call. Returns null
 * when the project is missing or the CMS is unreachable.
 */
export const getProject = cache(
  async (slug: string, locale: string): Promise<Project | null> => {
    try {
      const data = await client.project({
        where: { slug },
        locale: toContentfulLocale(locale),
      });
      const item = data.projectCollection?.items?.[0];
      return item ? toProject(item) : null;
    } catch (error) {
      console.error(`Error fetching project "${slug}" (${locale}):`, error);
      return null;
    }
  }
);
