export default function Card({ title, value, SVGPath, color }) {
    return (
        <div
            className="
                flex
                items-center
                p-4
                bg-white
                rounded-lg
                shadow-xs
                dark:bg-gray-800
            "
        >
            <div
                className="
              p-3
              mr-4
              text-orange-500
              bg-orange-100
              rounded-full
              dark:text-orange-100 dark:bg-orange-500
            "
            >
                <div
                    className={`
                        p-3
                        mr-4
                        text-${color}-500
                        bg-${color}-100
                        rounded-full
                    `}
                >
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        {SVGPath}
                    </svg>
                </div>
            </div>
            <div>
                <p
                    className="
                        mb-2
                        text-sm
                        font-medium
                        text-gray-600
                        dark:text-gray-400
                    "
                >
                    {title}
                </p>
                <p
                    className="
                        text-lg
                        font-semibold
                        text-gray-700
                        dark:text-gray-200
                    "
                >
                    {value !== null ? value : "Loading..."}
                </p>
            </div>
        </div>
    );
}
