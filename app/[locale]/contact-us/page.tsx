import { Fragment } from "react";
import { AppHeader } from "../components/AppHeader";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import ContactUsPageForm from "./ContactUsPageForm";

export default async function ContactUsPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dictionary = await getDictionary(params.locale);

  return (
    <Fragment>
      <AppHeader locale={params.locale} />
      <div id="wrapper">
        <section id="main" className="wrapper style1">
          <div className="inner">
            <h1>{dictionary.contactUs.title}</h1>
            <p>{dictionary.contactUs.description}</p>
            <ContactUsPageForm
              locale={params.locale}
              translations={{
                ...dictionary.landing.apply,
                ...dictionary.contactUs,
              }}
            />
          </div>
        </section>
      </div>
    </Fragment>
  );
}
