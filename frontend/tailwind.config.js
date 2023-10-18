/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin'), require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#a991f7',
          secondary: '#f6d860',
          accent: '#37cdbe',
          neutral: '#3d4451',
          'base-100': '#ffffff',
        },
      },
      'business',
    ],
  },
}
