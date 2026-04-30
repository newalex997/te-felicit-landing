import { Fragment } from "react";
import { Locale } from "@/i18n-config";
import { AppHeader } from "../components/AppHeader";
import { getDictionary } from "@/get-dictionary";

export default async function NotFound({
  params,
}: {
  params: { locale: Locale };
}) {
  const { notFound } = await getDictionary(params.locale);

  return (
    <Fragment>
      <AppHeader locale={params.locale} />
      <div id="wrapper">
        <section id="intro" className="wrapper style1 fullscreen fade-up">
          <div className="inner">
            <h1>404</h1>
            <h2>{notFound.label}</h2>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
