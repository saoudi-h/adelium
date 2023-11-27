/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}', './node_modules/flowbite/**/*.js'],
    theme: {
        extend: {
            backgroundImage: {
                'hero-pattern':
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='12' viewBox='0 0 20 12'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='charlie-brown' fill='black' fill-opacity='0.1'%3E%3Cpath d='M9.8 12L0 2.2V.8l10 10 10-10v1.4L10.2 12h-.4zm-4 0L0 6.2V4.8L7.2 12H5.8zm8.4 0L20 6.2V4.8L12.8 12h1.4zM9.8 0l.2.2.2-.2h-.4zm-4 0L10 4.2 14.2 0h-1.4L10 2.8 7.2 0H5.8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            },
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
            {
                'admin-dark': {
                    'color-scheme': 'dark',
                    primary: 'oklch(100% 0 0)',
                    secondary: '#152747',
                    accent: '#513448',
                    neutral: '#331800',
                    'neutral-content': '#FFE7A3',
                    'base-100': '#09090b',
                    'base-200': '#171618',
                    'base-300': '#2e2d2f',
                    'base-content': '#dca54c',
                    info: '#66c6ff',
                    success: '#87d039',
                    warning: '#e2d562',
                    error: '#ff6f6f',
                },
            },
            {
                'admin-light': {
                    'color-scheme': 'light',
                    primary: '#5E81AC',
                    secondary: '#81A1C1',
                    accent: '#88C0D0',
                    neutral: '#4C566A',
                    'neutral-content': '#D8DEE9',
                    'base-100': '#ECEFF4',
                    'base-200': '#E5E9F0',
                    'base-300': '#D8DEE9',
                    'base-content': '#2E3440',
                    info: '#B48EAD',
                    success: '#A3BE8C',
                    warning: '#EBCB8B',
                    error: '#BF616A',
                    '--rounded-box': '0.4rem',
                    '--rounded-btn': '0.2rem',
                    '--rounded-badge': '0.4rem',
                    '--tab-radius': '0.2rem',
                },
            },
        ],
        darkTheme: 'dark',
    },
}
