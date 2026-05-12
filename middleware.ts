import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import { i18n } from "./i18n-config";

function getLocale(request: NextRequest) {
  let languages = [];

  const locales = i18n.locales as unknown as string[];
  const previousLocale = request.cookies.get("NEXT_LOCALE");

  if (previousLocale) {
    languages = [previousLocale.value];
  } else {
    const negotiatorHeaders: Record<string, string> = {};

    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // Use negotiator and intl-localematcher to get best locale
    languages = new Negotiator({ headers: negotiatorHeaders }).languages(
      locales,
    );
  }

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const actualLocale = i18n.locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  // Redirect if there is no locale
  if (!actualLocale) {
    const locale = getLocale(request);
    const response = NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url,
      ),
    );

    response.cookies.set("NEXT_LOCALE", locale, { path: "/" });

    return response;
  }

  const requestNext = NextResponse.next();

  requestNext.cookies.set("NEXT_LOCALE", actualLocale, { path: "/" });

  return requestNext;
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    "/((?!api|download-me|_next/static|_next/image|scripts|images|favicon.ico).*)",
  ],
};
