module.exports = {
  env: {
    browser: true,
    es2021: true,
    "react-native/react-native": true,
  },
  extends: [
    "next",
    "plugin:react/recommended",
    "standard-with-typescript",
    "prettier",
  ],
  overrides: [
    {
      files: [
        "packages/**/*.ts",
        "packages/**/*.tsx",
        "apps/**/*.ts",
        "apps/**/*.tsx",
      ],
      parser: "@typescript-eslint/parser",
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-native", "@typescript-eslint"],
  rules: {
    semi: ["error", "never"],
    "@typescript-eslint/semi": ["error", "never"],
    "comma-dangle": ["error", "always-multiline"],
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    next: {
      rootDir: "apps/next/",
    },
  },
  root: true,
};
