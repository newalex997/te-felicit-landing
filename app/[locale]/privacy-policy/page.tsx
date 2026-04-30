import { Fragment } from "react";
import { Locale } from "@/i18n-config";
import { AppHeader } from "../components/AppHeader";
import enPage from "./en";
import roPage from "./ro";
import ruPage from "./ru";

export default function PrivacyPolicyPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const contentByLocale = { ro: roPage, ru: ruPage, en: enPage };
  const ContentByLocale = contentByLocale[params.locale] ?? enPage;

  return (
    <Fragment>
      <AppHeader locale={params.locale} />
      <div id="wrapper">
        <ContentByLocale />
      </div>
    </Fragment>
  );
}
