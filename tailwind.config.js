module.exports = {
    purge: {
        content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
        safelist: [
            "text-blue-500",
            "bg-blue-100",
            "text-green-500",
            "bg-green-100",
            "text-yellow-500",
            "bg-yellow-100",
            "text-pink-500",
            "bg-pink-100",
        ],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
