/**
 * This file is required because of Code Climate
 * CodeClimate requires that the file paths in the lcov coverage reports be absolute.
 * I have found only one way to do this in vitest: use a custom configuration file with a different root.
 */

import { defineConfig } from 'vitest/config'

import viteConfig from './vite.config'

const config = await viteConfig

export default defineConfig({
  ...config,
  root: '../..',
  test: {
    css: true,
    environment: 'jsdom',
    include: ['apps/web/src/**/*.spec.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov'],
      reportsDirectory: 'apps/web/coverage',
      include: ['apps/web/src/**/*.{ts,js,vue}'],
      all: true,
    },
  },
})
