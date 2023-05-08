module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [ 'plugin:vue/vue3-essential', '@vue/airbnb', '@vue/typescript/recommended' ],
  parserOptions: {
    ecmaVersion: 2020
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [ '.js', '.jsx', '.ts', '.tsx', '.vue' ],
        paths: [ 'src' ]
      }
    }
  },
  rules: {
    'no-shadow': [ 'off' ],
    'no-plusplus': [ 'off' ],
    semi: [ 'error', 'never' ],
    quotes: [ 'error', 'single' ],
    'prefer-destructuring': [ 'off' ],
    'comma-dangle': [ 'error', 'never' ],
    'max-len': [ 'warn', { code: 600 } ],
    'implicit-arrow-linebreak': [ 'off' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'no-any': [ 'off', { 'ignore-rest-args': true } ],
    'import/extensions': [ 'off' ],
    '@typescript-eslint/no-unused-vars': [ 'off' ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': [ 'off' ],
    '@typescript-eslint/no-explicit-any': 'off',
    'arrow-parens': [ 'off' ],
    'no-param-reassign': [ 'off' ],
    'no-explicit-any': [ 'off' ],
    'no-underscore-dangle': [ 'off' ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  overrides: [
    {
      files: [ '**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)' ],
      env: {
        jest: true
      }
    }
  ]
}
