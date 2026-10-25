import { getTranslations } from "next-intl/server";

/** Site-wide footer shared by the CMS landing pages and standalone routes. */
const SiteFooter = async () => {
  const t = await getTranslations("Layout");

  return (
    <footer className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2 border-t border-white/10 bg-black px-6 py-8 font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
      <a
        className="transition-colors duration-300 hover:text-white"
        href="https://medium.com/@isaias.fran"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t("footerMedium")}
      </a>
      <a
        className="transition-colors duration-300 hover:text-white"
        href="https://github.com/netafado/avant-cms-contentful"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t("footerTech")}
      </a>
    </footer>
  );
};

export default SiteFooter;
