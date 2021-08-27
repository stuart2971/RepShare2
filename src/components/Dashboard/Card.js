import { merge } from "../utils/GeneralUtils";

export default function Card({ title, value, SVGPath, color }) {
    const textColor = `text-${color}-500`;
    const backgroundColor = `bg-${color}-100`;

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
                    className={merge(
                        "p-3",
                        "mr-4",
                        textColor,
                        backgroundColor,
                        "rounded-full"
                    )}
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
                    {value}
                </p>
            </div>
        </div>
    );
}
