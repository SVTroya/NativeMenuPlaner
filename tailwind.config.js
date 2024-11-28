import colors from './constants/colors'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        input: colors.inputBackground,
        textSecondary: colors.textSecondary,
        secondaryLight: colors.secondaryLight,
        listItem: colors.listItem
      },
      fontSize: {
        header: ['3rem', '2.8rem']
      },
      borderWidth: {
        '6': '6px'
      },
      fontFamily: {
        'mon-semibold': ['Montserrat-SemiBold', 'sans-serif'],
        'mon-semibold-it': ['Montserrat-SemiBoldItalic', 'sans-serif'],
        'nunito-bold': ['Nunito-Bold', 'sans-serif']
      }
    }
  },
  plugins: []
}

