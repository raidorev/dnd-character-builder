import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApp, h, provide } from 'vue'

import App from './app.vue'
import { apolloClient } from './plugins/apollo'
import { i18n } from './plugins/i18n'
import { pinia } from './plugins/pinia'
import { router } from './plugins/router'
import { vuetify } from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

void loadFonts()

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})
  .use(i18n)
  .use(vuetify)
  .use(pinia)
  .use(router)
  .mount('#app')
