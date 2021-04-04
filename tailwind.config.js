const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    purge: ['./src/**/*.js'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                gray: colors.warmGray,
                orange: colors.orange,
                pink: colors.pink
            },
            fontFamily: ['Inter', ...defaultTheme.fontFamily.sans]
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
