/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    plugins: [
        require('@tailwindcss/typography'),
        // require("daisyui")
    ],
    darkMode: 'class',
    // daisyui: {
    //     themes: [
    //         'light',
    //         'dark',

    //     ],
    //     darkTheme: "dark",
    // },
    theme: {
        container: {
            center: true,
            padding: '1.5rem'
        },
        extend: {
            keyframes: {
                'fade-in-up': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(10px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    },
                },
            },
            animation: {
                'fade-in-up': 'fade-in-up 1s ease-out forwards'
            },

        }
    }
}
