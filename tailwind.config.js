/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                Oswald: ['Oswald', 'sans-serif'],
                Lato: ['Lato', 'sans-serif'],
                PlayfairDisplay: ['Playfair Display', 'serif'],
                Montserrat: ['Montserrat', 'sans-serif'],
                Rubik: ['Rubik', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
