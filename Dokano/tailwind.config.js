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
                },
                DOKano: {
                    lightblue: '#85C5D3', 
                    yellow: '#E3A623', 
                },
            },
            fontFamily: {
                standard: ['Merriweather', 'serif'],
                alternative: ['Montserrat', 'sans-serif'],
            },
        },
    },

    plugins: [
        require('@tailwindcss/typography'),
    ],
};
