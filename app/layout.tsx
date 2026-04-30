import Script from "next/script";
import { Metadata } from "next";
import type { Locale } from "@/i18n-config";
import "./globals.css";

export const metadata: Metadata = {
  openGraph: {
    images: "https://mesajedinsuflet.app/images/banner_2_en.png",
  },
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>) {
  return (
    <html lang={params.locale}>
      <body className="is-preload">
        {children}
        <Script src="/scripts/responsive.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
