import Link from "next/link";
import { Locale } from "@/i18n-config";
import { Fragment } from "react";
import { getDictionary } from "@/get-dictionary";
import { AppNavigation } from "./components/Navigation";
import { DownloadAppBanner } from "./components/DownloadAppBanner";

type HomeProps = {
  params: {
    locale: Locale;
  };
};

export default async function Home({ params }: HomeProps) {
  const dictionary = await getDictionary(params.locale);

  return (
    <Fragment>
      <AppNavigation locale={params.locale} />
      <div id="wrapper">
        <section
          id="intro"
          className="homepage-intro wrapper style1 fullscreen fade-up"
        >
          <div className="inner">
            <h1>{dictionary.home.title}</h1>
            <p>{dictionary.home.slogan}</p>
            <ul className="actions">
              <li>
                <Link href="#one" className="button scrolly">
                  {dictionary.home.seeMore}
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section id="one" className="wrapper style2 spotlights">
          <section id="how-it-works">
            <div className="content">
              <div className="inner">
                <h2>{dictionary.home.howItWorks.title}</h2>
                <p>{dictionary.home.howItWorks.description}</p>

                <ol
                  dangerouslySetInnerHTML={{
                    __html: dictionary.home.howItWorks.features,
                  }}
                />
              </div>
            </div>
          </section>
        </section>
        <DownloadAppBanner locale={params.locale} />
      </div>
    </Fragment>
  );
}
