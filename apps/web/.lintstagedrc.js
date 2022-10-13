import defaultConfig from '../../.lintstagedrc.cjs'

export default {
  ...defaultConfig,
  // Lint all files because changes may affect other files
  '*.{js,jsx,ts,tsx,vue}': () => 'pnpm run lint',
  '**/*.vue': () => 'vue-tsc --noEmit',
  '**/*.{vue,sass,scss}': 'stylelint',
}
