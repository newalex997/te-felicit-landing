import { Fragment } from "react";
import { Locale } from "@/i18n-config";
import { AppHeader } from "../components/AppHeader";
import EnPage from "./en";
import RoPage from "./ro";
import RuPage from "./ru";

export default function TermsAndConditionsPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const contentByLocale = { ro: RoPage, ru: RuPage, en: EnPage };
  const ContentByLocale = contentByLocale[params.locale] ?? EnPage;

  return (
    <Fragment>
      <AppHeader locale={params.locale} />
      <div id="wrapper">
        <ContentByLocale />
      </div>
    </Fragment>
  );
}
