import { getTranslations } from "next-intl/server";

/** Site-wide footer shared by the CMS landing pages and standalone routes. */
const SiteFooter = async () => {
  const t = await getTranslations("Layout");

  return (
    <footer className="border-t border-black/10 bg-white px-6 py-8 md:px-12 dark:border-hairline dark:bg-ground">
      <div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-center gap-x-10 gap-y-2 font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase md:justify-between dark:text-meta">
        <a
          className="transition-colors hover:text-gray-900 dark:hover:text-bright"
          href="https://medium.com/@isaias.fran"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("footerMedium")}
        </a>
        <a
          className="transition-colors hover:text-gray-900 dark:hover:text-bright"
          href="https://github.com/netafado/avant-cms-contentful"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("footerTech")}
        </a>
      </div>
    </footer>
  );
};

export default SiteFooter;
