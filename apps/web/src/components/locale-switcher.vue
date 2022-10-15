<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { usePersistanceLocale } from '@/composables/persistance-locale'
import { locales } from '@/utils/i18n/locales'

const { t } = useI18n()
const persistanceLocale = usePersistanceLocale()
</script>

<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn icon="mdi-translate" flat v-bind="props" />
    </template>
    <v-list density="compact" nav>
      <v-list-subheader
        class="text-high-emphasis text-uppercase font-weight-black"
      >
        {{ t('languages') }}
      </v-list-subheader>

      <v-list-item
        v-for="{ name, locale: l } in locales"
        :key="l"
        @click="persistanceLocale = l"
      >
        <v-list-item-title>{{ name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
