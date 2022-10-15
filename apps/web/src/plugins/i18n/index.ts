import { createI18n } from 'vue-i18n'

import en from '@/locales/en.json'
import ru from '@/locales/ru.json'

import { ruPluralRule } from './plural-rules/ru'

type MessageSchema = typeof en

export const enum SupportedLocale {
  en = 'en',
  ru = 'ru',
}

export const locales = [
  {
    locale: SupportedLocale.en,
    name: 'English',
  },
  {
    locale: SupportedLocale.ru,
    name: 'Русский',
  },
]

export const i18n = createI18n<[MessageSchema], `${SupportedLocale}`>({
  legacy: false,
  locale: SupportedLocale.en,
  fallbackLocale: SupportedLocale.en,
  pluralRules: {
    [SupportedLocale.ru]: ruPluralRule,
  },
  messages: {
    [SupportedLocale.en]: en,
    [SupportedLocale.ru]: ru,
  },
})
