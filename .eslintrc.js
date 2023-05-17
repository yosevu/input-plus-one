module.exports = {
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true,
  },
  extends: [
    'next',
    'plugin:react/recommended',
    'standard-with-typescript',
  ],
  overrides: [
    {
      files: ['packages/**/*.ts', 'packages/**/*.tsx', 'apps/**/*.ts', 'apps/**/*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', '@typescript-eslint'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
  },
  settings: {
    next: {
      rootDir: 'apps/next/',
    },
  },
  root: true,
}
