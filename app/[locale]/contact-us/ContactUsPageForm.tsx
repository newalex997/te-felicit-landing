"use client";

import { FormEvent, Fragment, useState } from "react";
import { ErrorContainer } from "@/components";
import { Locale } from "@/i18n-config";
import Link from "next/link";

type ContactUsPageFormProps = {
  translations: Record<string, any>;
  locale: Locale;
};

export default function ContactUsPageForm({
  locale,
  translations,
}: ContactUsPageFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | string[] | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const agreeChecked = event.currentTarget.elements.namedItem(
      "agree-policy"
    ) as HTMLInputElement;

    if (isLoading || !agreeChecked.checked) return;

    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    formData.append("locale", locale);

    try {
      const response = await fetch("/api/contact-us", {
        method: "POST",
        body: formData,
      });

      const jsonResponse = await response.json();

      if (jsonResponse.error) {
        setError(jsonResponse.error.message);

        throw new Error(jsonResponse.error.message);
      }

      setSubmitSuccess(true);
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  }

  const SubmitSuccesScreen = <p>{translations.submitSuccess}</p>;

  return (
    <form onSubmit={onSubmit}>
      <div className="fields">
        <div className="field half">
          <label htmlFor="name">{translations.name}</label>
          <input type="text" name="name" disabled={submitSuccess} />
        </div>
        <div className="field half">
          <label htmlFor="email">{translations.email}</label>
          <input type="text" name="email" disabled={submitSuccess} />
        </div>
        <div className="field">
          <label htmlFor="message">{translations.message}</label>
          <textarea name="message" rows={5} disabled={submitSuccess}></textarea>
        </div>
        <div className="field">
          <input
            type="checkbox"
            id="agree-policy"
            name="agree-policy"
            disabled={isLoading}
          />
          <label className="disclaimer" htmlFor="agree-policy">
            {translations.agreeTerms}
            <Link href="/privacy-policy" target="_blank">
              {translations.privacyPolicy}
            </Link>
            {translations.agreeTermsSuffix}
          </label>
        </div>
      </div>

      {!submitSuccess ? (
        <Fragment>
          {error ? <ErrorContainer error={error} /> : null}
          <ul className="actions">
            <li>
              <button
                className="button submit"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? translations.loading : translations.submit}
              </button>
            </li>
          </ul>
        </Fragment>
      ) : (
        SubmitSuccesScreen
      )}
    </form>
  );
}
