import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import {
    changeHaulName,
    createHaul,
    removeHaul,
} from "../utils/DashboardUtils";
import { getAuth0Id } from "../utils/GeneralUtils";

export default function Modal({
    isModalOpen,
    setIsModalOpen,
    updateDashboard,
}) {
    const [haulName, setHaulName] = useState("");
    const [deleteConfirmation, setDeleteConfirmation] = useState("");
    const { user } = useAuth0();

    const modalCommand = isModalOpen.split("/")[0];
    const modalOptions = isModalOpen.split("/")[1];

    function closeModal() {
        setHaulName("");
        setDeleteConfirmation("");
        setIsModalOpen("");
    }

    function renderModalBody() {
        if (modalCommand === "add")
            return (
                <div class="mt-4 mb-6">
                    <p class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Create a Haul
                    </p>
                    <p class="text-sm text-gray-700 dark:text-gray-400">
                        <input
                            onChange={(e) => setHaulName(e.target.value)}
                            autoFocus
                            class="focus:border-purple-400 block w-full mt-1 text-lg dark:border-gray-600 dark:bg-gray-700  focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                            placeholder="Please enter a haul name here"
                        />
                    </p>
                </div>
            );

        if (modalCommand === "edit")
            return (
                <div class="mt-4 mb-6">
                    <p class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Change Haul Name
                    </p>
                    <p class="text-sm text-gray-700 dark:text-gray-400">
                        <input
                            onChange={(e) => setHaulName(e.target.value)}
                            autoFocus
                            class="focus:border-purple-400 block w-full mt-1 text-lg dark:border-gray-600 dark:bg-gray-700  focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                            placeholder="Please enter a haul name here"
                        />
                    </p>
                </div>
            );

        if (modalCommand === "delete")
            return (
                <div class="mt-4 mb-6">
                    <p class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Delete Haul?
                    </p>
                    <p class={`text-sm text-gray-700 dark:text-gray-400`}>
                        <input
                            onChange={(e) =>
                                setDeleteConfirmation(e.target.value)
                            }
                            autoFocus
                            class="focus:border-purple-400 block w-full mt-1 text-lg dark:border-gray-600 dark:bg-gray-700  focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                            placeholder="Please type 'DELETE' here to confirm you want to delete this haul"
                        />
                    </p>
                </div>
            );
    }
    function renderModalConfirmButton() {
        if (modalCommand === "add") {
            return (
                <button
                    disabled={haulName === ""}
                    onClick={confirmModal}
                    class={`w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-${
                        haulName ? "600 hover:bg-purple-700" : "200"
                    } border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 focus:outline-none focus:shadow-outline-purple`}
                >
                    Create
                </button>
            );
        }
        if (modalCommand === "delete") {
            return (
                <button
                    disabled={deleteConfirmation !== "DELETE"}
                    onClick={confirmModal}
                    class={`w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-${
                        deleteConfirmation === "DELETE"
                            ? "600 hover:bg-red-700"
                            : "200"
                    } border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 focus:outline-none focus:shadow-outline-purple`}
                >
                    Delete
                </button>
            );
        }
        if (modalCommand === "edit") {
            return (
                <button
                    disabled={haulName === ""}
                    onClick={confirmModal}
                    class={`w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-${
                        haulName ? "600 hover:bg-purple-700" : "200"
                    } border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 focus:outline-none focus:shadow-outline-purple`}
                >
                    Change Name
                </button>
            );
        }
    }
    async function confirmModal() {
        if (modalCommand === "add") {
            const InsertedStatus = await createHaul(getAuth0Id(user), haulName);
            if (InsertedStatus.inserted) {
                updateDashboard();
                closeModal();
            }
        }
        if (modalCommand === "edit") {
            const editedStatus = await changeHaulName(
                getAuth0Id(user),
                modalOptions,
                haulName
            );
            console.log(editedStatus);
            if (editedStatus.updated) {
                updateDashboard();
                closeModal();
            }
        }

        if (modalCommand === "delete") {
            if (deleteConfirmation === "DELETE") {
                const deletedStatus = await removeHaul(
                    getAuth0Id(user),
                    modalOptions
                );
                if (deletedStatus.deleted) {
                    updateDashboard();
                    closeModal();
                }
            }
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
                            onClick={closeModal}
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
                    {renderModalBody()}
                    <footer class="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800">
                        <button
                            onClick={closeModal}
                            class="w-full px-5 py-3 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                        >
                            Cancel
                        </button>
                        {renderModalConfirmButton()}
                    </footer>
                </div>
            </div>
        </div>
    );
}
