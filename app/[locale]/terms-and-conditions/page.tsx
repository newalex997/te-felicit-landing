import { Fragment, useMemo } from "react";
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
  const ContentByLocale = useMemo(() => {
    switch (params.locale) {
      case "ro":
        return RoPage;
      case "ru":
        return RuPage;
      default:
        return EnPage;
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
