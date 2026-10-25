import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import EditorView from "@/components/EditorView";
import JsonLd from "@/components/JsonLd";
import Navigation from "@/components/Navigation";
import Providers from "@/components/Providers";
import SiteFooter from "@/components/SiteFooter";
import Tag from "@/components/Tag";
import { getProject } from "@/lib/projects";
import { buildMetadata, projectJsonLd } from "@/lib/seo";

type ProjectPageParams = Promise<{ locale: string; slug: string }>;

const LABEL_CLASS =
  "font-mono text-[10px] tracking-[0.2em] text-gray-500 uppercase dark:text-gray-400";

export async function generateMetadata({
  params,
}: {
  params: ProjectPageParams;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProject(slug, locale);
  if (!project) {
    return {};
  }
  const seo = project.seoFields;
  const title = seo?.pageTitle || project.title;
  const description = seo?.pageDescription || project.summary;
  const base = buildMetadata(seo, `projects/${project.slug}`);
  return {
    ...base,
    title,
    description,
    openGraph: { ...base.openGraph, title, description },
    twitter: { ...base.twitter, title, description },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: ProjectPageParams;
}) {
  const { locale, slug } = await params;
  const project = await getProject(slug, locale);
  if (!project) {
    notFound();
  }
  const t = await getTranslations("Projects");

  return (
    <Providers>
      <div className="font-sans w-full">
        <JsonLd data={projectJsonLd(project)} />
        <main>
          <Navigation currentPath="/projects" />
          <article className="mx-auto mt-16 max-w-3xl px-4 pb-24 text-gray-900 dark:text-gray-100 md:mt-24">
            <Link
              href="/projects"
              className="font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              ← {t("backToProjects")}
            </Link>

            <header className="mt-8 border-b border-black/10 pb-6 dark:border-white/15">
              {project.client && (
                <p className="text-[11px] tracking-[0.2em] text-gray-500 uppercase dark:text-gray-400">
                  {project.client}
                </p>
              )}
              <h1 className="mt-3 font-display text-3xl font-normal md:text-4xl">
                {project.title}
              </h1>
              {project.highlight && (
                <p className="mt-3 text-lg text-gray-900 dark:text-gray-100">
                  {project.highlight}
                </p>
              )}
              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                {project.summary}
              </p>

              {(project.role || project.period) && (
                <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                  {project.role && (
                    <div>
                      <dt className={LABEL_CLASS}>{t("role")}</dt>
                      <dd className="mt-1">{project.role}</dd>
                    </div>
                  )}
                  {project.period && (
                    <div>
                      <dt className={LABEL_CLASS}>{t("period")}</dt>
                      <dd className="mt-1">{project.period}</dd>
                    </div>
                  )}
                </dl>
              )}

              {project.categories.length > 0 && (
                <div className="mt-6">
                  <h2 className={LABEL_CLASS}>{t("categories")}</h2>
                  <ul className="mt-2 flex flex-wrap">
                    {project.categories.map((category, idx) => (
                      <li key={`category_${idx}_${category}`}>
                        <Tag text={category} color="violet" size="small" />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.technologies.length > 0 && (
                <div className="mt-4">
                  <h2 className={LABEL_CLASS}>{t("technologies")}</h2>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.map((technology, idx) => (
                      <li
                        key={`technology_${idx}_${technology}`}
                        className="border border-black/20 px-2 py-0.5 text-[10px] tracking-[0.15em] text-gray-600 uppercase dark:border-white/20 dark:text-gray-300"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </header>

            <div className="mt-8">
              <EditorView markdown={project.body} />
            </div>
          </article>
        </main>
        <SiteFooter />
      </div>
    </Providers>
  );
}
