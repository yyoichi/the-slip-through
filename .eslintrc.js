module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  extends: 'plugin:@typescript-eslint/recommended',
  rules: {
    quotes: ['error', 'single'],
    '@typescript-eslint/indent': ['error', 2]
  }
};
