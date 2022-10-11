import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [vue(), vuetify({ autoImport: true })],
})
