import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - the static blog (served unprefixed, outside the [locale] segment)
  // - _next, _vercel (Next.js internals)
  // - the favicon, public files (anything with an extension)
  matcher: ["/((?!api|blog|_next|_vercel|.*\\..*).*)"],
};
