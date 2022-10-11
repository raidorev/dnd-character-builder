module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.eslint.json',
    extraFileExtensions: ['.vue'],
  },
  extends: ['plugin:vue/vue3-recommended', './index.js'],
}
