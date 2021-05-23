module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        backgroundColor: ['hover', 'focus', 'active'],
        borderColor: ['hover', 'focus', 'active'],
        extend: {},
    },
    plugins: [],
};
