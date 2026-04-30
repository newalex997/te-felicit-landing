import { Fragment, useMemo } from "react";
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
  const ContentByLocale = useMemo(() => {
    switch (params.locale) {
      case "ro":
        return roPage;
      case "ru":
        return ruPage;
      default:
        return enPage;
    }
  }, [params.locale]);

  return (
    <Fragment>
      <AppHeader locale={params.locale} />
      <div id="wrapper">
        <ContentByLocale />
      </div>
    </Fragment>
  );
}
