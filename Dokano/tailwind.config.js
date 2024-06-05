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
                    grey: '#c5cad86d',
                    lightgrey: '#FAFAFA',
                    bordergrey: '#e5e7eb',
                },
                DOKano: {
                    lightblue: '#85C5D3', 
                    yellow: '#E3A722',
                    hoveredYellow: '#e38e22',
                    orange: '#FF793E',
                    darkGreen: '#0C4D54',
                    darkBlue: '#3A7EB4',
                },
            },
            //condendsed font
            fontFamily: {
                standard: ['Futura PT Condensed', 'sans-serif'],
                alternative: ['New Spirit Condensed', 'serif'],
            },
        },
    },

    plugins: [
        require('@tailwindcss/typography'),
    ],
};
