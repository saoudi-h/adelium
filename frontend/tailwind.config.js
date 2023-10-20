/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['noto sans', 'ui-sans-serif', 'system-ui'],
        serif: ['noto', 'ui-serif', 'Georgia'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#c90072',
          secondary: '#96ffc8',
          accent: '#4fcc39',
          neutral: '#1f1825',
          'base-100': '#f2f5f8',
          info: '#63a0cf',
          success: '#19ae90',
          warning: '#efd252',
          error: '#f86d82',
          '--rounded-box': '2rem',
          '--rounded-btn': '2rem', // border radius rounded-btn utility class, used in buttons and similar element
          '--rounded-badge': '1.9rem',
        },
      },
      {
        dark: {
          primary: '#e82c8a',
          secondary: '#eda565',
          accent: '#a1fcd6',
          neutral: '#1a1b28',
          'base-100': '#2e435c',
          info: '#3562de',
          success: '#148053',
          warning: '#ac6206',
          error: '#f75f64',
          '--rounded-box': '2rem',
          '--rounded-btn': '2rem', // border radius rounded-btn utility class, used in buttons and similar element
          '--rounded-badge': '1.9rem',
        },
      },
      'cupcake',
    ],
    darkTheme: 'dark',
  },
}
