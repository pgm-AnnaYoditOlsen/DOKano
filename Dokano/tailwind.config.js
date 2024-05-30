/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/**/*.antlers.html',
        './resources/**/*.antlers.php',
        './resources/**/*.blade.php',
        './resources/**/*.vue',
        './content/**/*.md',
    ],

theme: {
        extend: {
            colors: {
                standards: {
                    white: '#FFFFFF',
                    black: '#000000', 
                    grey: '#C5CAD8',
                },
                DOKano: {
                    lightblue: '#85C5D3', 
                    yellow: '#FFC400', 
                    orange: '#FF793E',
                    darkGreen: '#0C4D54',
                    darkBlue: '#3A7EB4',
                },
            },
            fontFamily: {
                standard: ['Futura PT', 'sans-serif'],
                alternative: ['New Spirit Condensed', 'serif'],
            },
        },
    },

    plugins: [
        require('@tailwindcss/typography'),
    ],
};
