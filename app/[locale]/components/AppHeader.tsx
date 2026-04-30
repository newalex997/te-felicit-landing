import { Locale } from "@/i18n-config";
import Link from "next/link";

export const AppHeader = ({ locale }: { locale: Locale }) => {
  return (
    <header id="header">
      <Link href={`/${locale}`} className="title">
        Mesaje din Suflet
      </Link>
      <nav>
        <ul>
          <li>
            <Link href={`/${locale}/contact-us`}>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
