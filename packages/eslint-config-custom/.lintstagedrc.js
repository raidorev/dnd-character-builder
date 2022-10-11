const defaultConfig = require('../../.lintstagedrc.cjs')

module.exports = {
  ...defaultConfig,
  '*.js': 'eslint',
}
