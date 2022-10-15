import { usePreferredLanguages } from '@vueuse/core'

import { locales, SupportedLocale } from './locales'

const preferredLanguages = usePreferredLanguages().value.map(
  (l) => l.split('-')[0],
)
const supportedLanguages = new Set<string>(locales.map(({ locale }) => locale))
export const supportedPreferredLanguage =
  preferredLanguages.find((lang): lang is SupportedLocale =>
    supportedLanguages.has(lang),
  ) ?? SupportedLocale.en
