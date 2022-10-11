import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApp, h, provide } from 'vue'

import App from './app.vue'
import { apolloClient } from './plugins/apollo'
import { pinia } from './plugins/pinia'
import { vuetify } from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

void loadFonts()

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})
  .use(vuetify)
  .use(pinia)
  .mount('#app')
