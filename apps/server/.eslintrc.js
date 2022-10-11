module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: ['custom'],
  rules: {
    '@typescript-eslint/explicit-member-accessibility': 'warn',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/require-await': 'off',

    'unicorn/prevent-abbreviations': [
      'error',
      {
        ignore: ['\\.e2e-spec$', '\\.args$'],
      },
    ],
    'unicorn/prefer-module': 'off',
    'unicorn/prefer-top-level-await': 'off',
  },
}
