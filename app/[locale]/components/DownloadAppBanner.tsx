import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import appStore from "@/public/icons/ios-store.svg";
import playMarket from "@/public/icons/android-store.svg";

type DownloadAppBannerProps = {
  locale: Locale;
};

export const DownloadAppBanner = async ({ locale }: DownloadAppBannerProps) => {
  const dictionary = await getDictionary(locale);

  return (
    <section id="download_app" className="wrapper style3 fullscreen fade-up">
      <div className="inner">
        <h2>{dictionary.downloadAppBanner.label}</h2>
        <p>{dictionary.downloadAppBanner.description}</p>

        <div className="links-wrap">
          <Link
            href="https://play.google.com/store/apps/details?id=com.pipedigital.mesajedinsuflet"
            rel="noreferrer"
            target="_blank"
          >
            <Image
              src={playMarket}
              alt="play market icon"
              width={150}
              height={60}
            />
          </Link>

          <Link
            href="https://apps.apple.com/app/mesaje-din-suflet/id6745302249"
            rel="noreferrer"
            target="_blank"
          >
            <Image
              src={appStore}
              alt="app store icon"
              width={150}
              height={60}
            />
          </Link>
        </div>
      </div>
      <Image
        src="/images/phone_mockup.png"
        alt="intro ilustration"
        className="ilustration"
        width={282}
        height={556}
      />
    </section>
  );
};
