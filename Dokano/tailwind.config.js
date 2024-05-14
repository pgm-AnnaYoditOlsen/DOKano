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
                theme1: {
                    primary: '#1d4ed8', // Example primary color for theme 1
                    secondary: '#9333ea', // Example secondary color for theme 1
                    accent: '#f59e0b', // Example accent color for theme 1
                },
                theme2: {
                    primary: '#10b981', // Example primary color for theme 2
                    secondary: '#3b82f6', // Example secondary color for theme 2
                    accent: '#ef4444', // Example accent color for theme 2

                },
            },
            fontFamily: {
                theme1: ['Roboto', 'sans-serif'], // Example font family for theme 1
                theme2: ['Open Sans', 'sans-serif'], // Example font family for theme 2
            },
        },
    },

    plugins: [
        require('@tailwindcss/typography'),
    ],
};
