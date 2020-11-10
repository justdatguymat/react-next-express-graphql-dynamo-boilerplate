module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  /*
  parser: "babel-eslint",
   */
  parser: '@typescript-eslint/parser',
  //plugins: ['@typescript-eslint', '@typescript-eslint/tslint'],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    //"@typescript-eslint/rule-name": "error",
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-unused-vars': [2, { args: 'after-used', argsIgnorePattern: '^_*' }],
  },
};
