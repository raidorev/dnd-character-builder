module.exports = {
  extends: [
    'eslint:recommended',
    'turbo',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:sonarjs/recommended',
    'plugin:promise/recommended',
    'plugin:regexp/recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
  ],

  ignorePatterns: ['!.*', 'node_modules', 'dist', 'coverage'],

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },

  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    'unicorn/prevent-abbreviations': [
      'error',
      {
        ignore: ['\\.e2e-spec$'],
        replacements: {
          env: false,
        },
      },
    ],
    'unicorn/prefer-top-level-await': 'off',
    'unicorn/no-useless-undefined': ['error', { checkArguments: false }],
  },

  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/strict',
      ],
    },
    {
      files: ['./*.cjs', './*.js'],
      env: {
        // All config files in app directory have NodeJS environment
        node: true,
      },
    },
  ],
}
