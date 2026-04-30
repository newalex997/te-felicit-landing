"use client";

import { usePathname, useRouter } from "next/navigation";
import { i18n } from "@/i18n-config";
import { ChangeEvent } from "react";

export default function LanguageSwitcher() {
  const pathName = usePathname();
  const router = useRouter();

  const segments = pathName.split("/");

  const redirectToNewLocale = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!pathName) return "/";

    segments[1] = event.target.value;

    router.replace(segments.join("/"));
  };

  return (
    <select value={segments[1]} onChange={redirectToNewLocale}>
      {i18n.locales.map((locale) => {
        return (
          <option key={locale} value={locale}>
            {locale}
          </option>
        );
      })}
    </select>
  );
}
