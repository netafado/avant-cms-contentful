import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next, _vercel (Next.js internals)
  // - the favicon, public files (anything with an extension)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
