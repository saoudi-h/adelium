/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto', 'ui-sans-serif', 'system-ui'],
        serif: ['Noto Serif', 'ui-serif', 'Georgia'],
      },
      fontSize: {
        'res-big': [
          'clamp(1.3rem, 0.8rem + 2.6667vw, 4rem)',
          {
            lineHeight: '1.3',
          },
        ],
        'res-h1': [
          'clamp(1rem, 0.5833rem + 2.2222vw, 3.25rem)',
          {
            lineHeight: '1.2',
          },
        ],
      },
      screens: {
        '-2xl': { max: '1535px' },
        // => @media (max-width: 1535px) { ... }

        '-xl': { max: '1279px' },
        // => @media (max-width: 1279px) { ... }

        '-lg': { max: '1023px' },
        // => @media (max-width: 1023px) { ... }

        '-md': { max: '767px' },
        // => @media (max-width: 767px) { ... }

        '-sm': { max: '639px' },
        // => @media (max-width: 639px) { ... }
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#c2410c',
          secondary: '#075e4b',
          accent: '#9d700b',
          neutral: '#1e3a8a',
          'base-100': '#f2f5f8',
          info: '#22b4dd',
          success: '#18c3aa',
          warning: '#b17e10',
          error: '#e51d1d',
          '--rounded-box': '2rem',
          '--rounded-btn': '2rem', // border radius rounded-btn utility class, used in buttons and similar element
          '--rounded-badge': '1.9rem',
          '--btn-text-case': 'none',
        },
      },
      {
        dark: {
          primary: '#c2410c',
          secondary: '#075e4b',
          accent: '#fbfa8d',
          neutral: '#1e3a8a',
          'base-100': '#334859',
          info: '#22b4dd',
          success: '#18c3aa',
          warning: '#b17e10',
          error: '#e51d1d',
          '--rounded-box': '2rem',
          '--rounded-btn': '2rem', // border radius rounded-btn utility class, used in buttons and similar element
          '--rounded-badge': '1.9rem',
          '--btn-text-case': 'none',
        },
      },
      'cupcake',
    ],
    darkTheme: 'dark',
  },
}
