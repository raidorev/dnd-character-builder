module.exports = {
  root: true,
  extends: ['custom/vue'],
  rules: {
    'vue/multi-word-component-names': ['error', { ignores: ['home'] }],
  },
}
