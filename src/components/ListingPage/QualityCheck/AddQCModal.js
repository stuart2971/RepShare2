import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { getAuth0Id } from "../../utils/GeneralUtils";
import { addQualityCheck } from "../../utils/ListingUtils";
import Stars from "../Stars";

export default function AddQCModal({
    isModalOpen,
    setIsModalOpen,
    listingId,
    updateListing,
}) {
    const { user } = useAuth0();

    const [comment, setComment] = useState("");
    const [stars, setStars] = useState(0);

    async function postQC() {
        if (stars === 0) return;

        const result = await addQualityCheck(
            listingId,
            user ? user.name : "Unable to load name",
            getAuth0Id(user),
            comment,
            stars
        );
        if (result.updated) {
            updateListing();
            setIsModalOpen(false);
        }
    }
    if (!isModalOpen) return <></>;
    return (
        <div>
            <div
                x-show="isModalOpen"
                class="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
            >
                <div
                    x-show="isModalOpen"
                    class="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
                    role="dialog"
                    id="modal"
                >
                    <header class="flex justify-end">
                        <button
                            class="inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded dark:hover:text-gray-200 hover: hover:text-gray-700"
                            aria-label="close"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <svg
                                class="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                role="img"
                                aria-hidden="true"
                            >
                                <path
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                    fill-rule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </header>
                    <div>
                        <h1>Rate This Item (Required)</h1>
                        <Stars count={stars} setStars={setStars} size="6" />
                        <h1>Comment</h1>
                        <input
                            onChange={(e) => setComment(e.target.value)}
                            className="my-4 focus:border-purple-400 block w-full mt-1 text-lg dark:border-gray-600 dark:bg-gray-700  focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                            placeholder="Enter your comment here"
                        />
                    </div>
                    <footer class="mt-4 flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            class="w-full px-5 py-3 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={postQC}
                            className="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 hover:bg-purple-700
                            border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 focus:outline-none focus:shadow-outline-purple"
                        >
                            Post
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
}
