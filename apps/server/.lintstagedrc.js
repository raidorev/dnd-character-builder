const defaultConfig = import('../../.lintstagedrc.cjs')

module.exports = {
  ...defaultConfig,
  // Lint all files because changes may affect other files
  '*.{js,ts}': () => 'pnpm run lint',
  '**/*.ts': () => 'tsc -p tsconfig.json --noEmit',
}
