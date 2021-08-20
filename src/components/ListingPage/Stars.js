export default function Stars({ count, setStars = null, size }) {
    function renderStars() {
        let starsArray = [];
        for (let i = 0; i < count; i++) {
            starsArray.push(
                <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className={`w-${size} h-${size} text-purple-500 ${
                        setStars ? "cursor-pointer" : ""
                    }`}
                    viewBox="0 0 24 24"
                    onClick={() => {
                        if (setStars) setStars(i + 1);
                    }}
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
            );
        }
        for (let i = count; i < 5; i++) {
            starsArray.push(
                <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className={`w-${size} h-${size} text-purple-500 ${
                        setStars ? "cursor-pointer" : ""
                    }`}
                    viewBox="0 0 24 24"
                    onClick={() => {
                        if (setStars) setStars(i + 1);
                    }}
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
            );
        }

        return starsArray;
    }
    return <div className="flex">{renderStars()}</div>;
}
