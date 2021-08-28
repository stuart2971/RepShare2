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
            "text-red-600",
            "text-purple-600",
            "bg-purple-400",
            "bg-purple-600",
            "hover:bg-purple-700",
            "opacity-25",
            "hover:opacity-100",
            "transition",
            "text-purple-600",
            "text-gray-400",
            "font-semibold",
            "text-green-700",
            "text-gray-700",
            "bg-green-100",
            "bg-gray-100",
            "w-4",
            "h-4",
            "w-6",
            "h-6",
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

// https://stackoverflow.com/a/68903443/7389434
// When using styles dynamically in react and tailwind it will purge some of them so you have to put the dynamic styles on a safelist
