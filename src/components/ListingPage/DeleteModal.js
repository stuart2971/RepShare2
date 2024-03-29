import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteListing } from "../utils/ListingUtils";
import { getAuth0Id } from "../utils/GeneralUtils";

export default function DeleteModal({
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    listingId,
}) {
    const { user } = useAuth0();
    const [modalConfirmation, setModalConfirmation] = useState("");
    const history = useHistory();

    async function deleteListingFromDB() {
        if (modalConfirmation === "DELETE" && listingId) {
            const status = await deleteListing(listingId, getAuth0Id(user));
            setIsDeleteModalOpen(false);
            history.goBack();
        }
    }
    if (!isDeleteModalOpen) return <></>;
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
                            onClick={() => setIsDeleteModalOpen(false)}
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
                    <div class="mt-4 mb-6">
                        <p class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                            Delete Listing?
                        </p>
                        <p class={`text-sm text-gray-700 dark:text-gray-400`}>
                            Some people may have this listing in their haul.
                            Deleting the listing would prevent them from viewing
                            the listing. Are you sure you would like to delete
                            the listing?
                            <input
                                onChange={(e) =>
                                    setModalConfirmation(e.target.value)
                                }
                                autoFocus
                                class="focus:border-purple-400 block w-full mt-1 text-lg dark:border-gray-600 dark:bg-gray-700  focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                placeholder="Please type 'DELETE' here to confirm you want to delete this haul"
                            />
                        </p>
                    </div>
                    <footer class="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800">
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            class="w-full px-5 py-3 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={modalConfirmation !== "DELETE"}
                            onClick={deleteListingFromDB}
                            class={`w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-${
                                modalConfirmation === "DELETE"
                                    ? "600 hover:bg-red-700"
                                    : "200"
                            } border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 focus:outline-none focus:shadow-outline-purple`}
                        >
                            Delete
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
}
