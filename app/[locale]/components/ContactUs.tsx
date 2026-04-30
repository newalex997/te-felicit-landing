import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Image from "next/image";
import Link from "next/link";
import linkedinIcon from "@/public/icons/linkedin.svg";
import facebookIcon from "@/public/icons/facebook.svg";

export const ContactUs = async ({ locale }: { locale: Locale }) => {
  const dictionary = await getDictionary(locale);

  return (
    <section>
      <ul className="contact">
        <h3>{dictionary.landing.apply.contactUs}</h3>
        <li>
          <h5>{dictionary.landing.apply.ourEmail}</h5>
          <Link href="#">contact@pipework.md</Link>
        </li>
        <li>
          <h5>{dictionary.landing.apply.phone}</h5>
          <span>(+373) 67121549</span>
        </li>
        <li>
          <h5>{dictionary.landing.apply.socialMedia}</h5>
          <ul className="icons">
            <li>
              <Link
                href="https://www.facebook.com/profile.php?id=61571966031756"
                className="icon brands fa-facebook-f"
                target="_blank"
              >
                <Image
                  src={facebookIcon}
                  alt="facebook icon"
                  className="social-media-image"
                  width="20"
                  height="20"
                />
              </Link>
            </li>
            <li>
              <Link href="#" className="icon brands fa-linkedin-in">
                <Image
                  src={linkedinIcon}
                  alt="linkedin icon"
                  className="social-media-image"
                  width="20"
                  height="20"
                />
                <span className="label">LinkedIn</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </section>
  );
};
