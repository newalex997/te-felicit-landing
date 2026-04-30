import { Fragment } from "react";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { AppFooter } from "./components/Footer";
import "./components.css";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}) {
  const dictionary = await getDictionary(params.locale);

  return {
    title: dictionary.home.title,
    description: dictionary.home.slogan,
    openGraph: {
      images: `https://mesajedinsuflet.com/images/banner_2_${params.locale}.png`,
    },
  };
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>) {
  return (
    <Fragment>
      {children}
      <AppFooter locale={params.locale} />
    </Fragment>
  );
}
