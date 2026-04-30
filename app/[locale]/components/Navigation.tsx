import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Link from "next/link";

export const AppNavigation = async ({ locale }: { locale: Locale }) => {
  const { navigation } = await getDictionary(locale);

  return (
    <section id="sidebar">
      <div className="inner">
        <nav>
          <ul>
            <li>
              <Link href="#intro">{navigation.about}</Link>
            </li>
            <li>
              <Link href="#one">{navigation.howItWorks}</Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};
