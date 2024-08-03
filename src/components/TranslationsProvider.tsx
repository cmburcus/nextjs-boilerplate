'use client';

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { initTranslations, type TranslationsInitParams } from "@/i18next.config";
import { createInstance } from "i18next";

interface TranslationsProviderProps extends TranslationsInitParams {
  children: React.ReactNode
};

export function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: TranslationsProviderProps) {
  const i18n = createInstance();

  initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
