import type { Config } from 'tailwindcss'

export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                marvelred: 'var(--marvelred)',
                black: 'var(--black)',
                gray: 'var(--gray)',
                white: 'var(--white)',
            },
        },
    },
    plugins: [],
} satisfies Config
