import Link from "next/link";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import LanguageSwitcher from "./LanguageSwitcher";

export const AppFooter = async ({ locale }: { locale: Locale }) => {
  const { footer } = await getDictionary(locale);

  return (
    <footer id="footer" className="wrapper style1-alt">
      <div className="inner footer-wrap">
        <ul className="menu">
          <li>&copy; {footer.copyright}</li>
          <li>
            <Link href="/terms-and-conditions">
              {footer.termsAndConditions}
            </Link>
          </li>
          <li>
            <Link href="/privacy-policy">{footer.privacyPolicy}</Link>
          </li>
          <li>
            <Link href="/contact-us">{footer.contactUs}</Link>
          </li>
        </ul>

        <LanguageSwitcher />
      </div>
    </footer>
  );
};
