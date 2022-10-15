import { useLocalStorage } from '@vueuse/core'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { supportedPreferredLanguage } from '@/utils/i18n/preferred-language'

export const usePersistanceLocale = () => {
  const { locale: appLocale } = useI18n({ useScope: 'global' })

  const locale = useLocalStorage('locale', supportedPreferredLanguage)

  watch(
    locale,
    () => {
      appLocale.value = locale.value
    },
    { immediate: true },
  )

  return locale
}
