/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        'node_modules/preline/dist/*.js',
    ],
    theme: {
        extend: {},
    },
    plugins: [require('preline/plugin')],
};
