module.exports = {
  'prettier/prettier': [
    'error',
    {
      endOfLine: 'auto',
    },
  ],
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-organize-imports'],
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: false,
  bracketSpacing: true,
  arrowParens: 'avoid',
  trailingComma: 'es5',
  bracketSameLine: true,
  printWidth: 100,
}
