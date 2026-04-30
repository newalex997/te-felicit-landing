import Script from "next/script";
import { Metadata } from "next";
import type { Locale } from "@/i18n-config";
import "./globals.css";

export const metadata: Metadata = {
  openGraph: {
    images: "https://pipework.md/images/banner_2_en.png",
  },
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={params.lang}>
      <body className="is-preload">
        {children}
        <Script src="/scripts/responsive.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
