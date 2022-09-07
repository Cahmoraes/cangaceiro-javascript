module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'standard', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'always',
        printWidth: 80,
        singleQuote: true,
        trailingComma: 'all',
        semi: false,
        endOfLine: 'lf',
        tabWidth: 2,
      },
    ],
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'n/handle-callback-err': 'off',
    'prefer-promise-reject-errors': 'off',
  },
}
