import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { usePreferredColorScheme } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { createVuetify } from 'vuetify'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'

import { i18n } from '@/plugins/i18n'

import { dark } from './themes/dark'
import { light } from './themes/light'

export const vuetify = createVuetify({
  locale: createVueI18nAdapter({
    // TODO: Is VueI18n Composer suitable for this?
    i18n: i18n as unknown as Parameters<typeof createVueI18nAdapter>[0]['i18n'],
    useI18n,
  }),
  theme: {
    defaultTheme:
      usePreferredColorScheme().value === 'no-preference'
        ? 'light'
        : usePreferredColorScheme().value,
    themes: { dark, light },
  },
})
