import { createI18n } from 'vue-i18n'

import en from '@/locales/en.json'
import ru from '@/locales/ru.json'
import { SupportedLocale } from '@/utils/i18n/locales'
import { supportedPreferredLanguage } from '@/utils/i18n/preferred-language'

import { ruPluralRule } from './plural-rules/ru'

type MessageSchema = typeof en

export const i18n = createI18n<[MessageSchema], `${SupportedLocale}`>({
  legacy: false,
  locale: supportedPreferredLanguage,
  fallbackLocale: SupportedLocale.en,
  pluralRules: {
    [SupportedLocale.ru]: ruPluralRule,
  },
  messages: {
    [SupportedLocale.en]: en,
    [SupportedLocale.ru]: ru,
  },
})
