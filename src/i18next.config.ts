import { createInstance, type i18n, type Resource } from "i18next";
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from "i18next-resources-to-backend";

export type TranslationsInitParams = {
  locale: Locale,
  namespaces: string[],
  i18nInstance?: i18n,
  resources?: Resource,
}

export const i18nConfig: {
  defaultLocale: Locale;
  locales: Locale[];
  prefixDefault?: boolean;
} = {
  defaultLocale: 'en',
  locales: ['en', 'fr'],
};

export async function initTranslations(
  locale: TranslationsInitParams["locale"],
  namespaces: TranslationsInitParams["namespaces"],
  i18nInstance?: TranslationsInitParams["i18nInstance"],
  resources?: TranslationsInitParams["resources"],
) {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: Locale, namespace: string) =>
          import(`@/locales/${language}/${namespace}.json`)
      )
    );
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t
  };
}
