import { useEffect, useState } from "react";
import TagsJSON from "../CreateListing/Tags.json";
import { editListing } from "../utils/ListingUtils";

export default function EditListingModal({
    setIsEditModalOpen,
    isEditModalOpen,
    name,
    price,
    tag,
    message,
    images,
    updateListing,
    listingId,
}) {
    const [editedName, setEditedName] = useState(name);
    const [editedPrice, setEditedPrice] = useState(price);
    const [editedMessage, setEditedMessage] = useState(message);
    const [editedTag, setEditedTag] = useState(tag);
    const [editedImages, setEditedImages] = useState(images);

    useEffect(() => {
        setEditedName(name);
        setEditedPrice(price);
        setEditedMessage(message);
        setEditedTag(tag);
        setEditedImages(images);
    }, [name, price, tag, message, images]);

    function renderImageAddressInputs() {
        let boxes = [];
        for (let i = 0; i < editedImages.length; i++) {
            boxes.push(
                <input
                    onChange={(e) => {
                        let addresses = [...editedImages];
                        addresses[i] = e.target.value;
                        setEditedImages(addresses);
                    }}
                    value={editedImages[i]}
                    className="my-4 focus:border-purple-400 block w-full mt-1 text-lg dark:border-gray-600 dark:bg-gray-700  focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder={`Image ${i + 1}`}
                />
            );
        }
        return boxes;
    }
    async function requestEditListing() {
        const newListing = {
            name: editedName,
            imageURL: editedImages.filter((e) => e),
            price: editedPrice,
            message: editedMessage,
            tag: editedTag,
        };
        const result = await editListing(listingId, newListing);
        console.log(result);
        if (result.edited) {
            updateListing();
            setIsEditModalOpen(false);
        }
    }
    if (!isEditModalOpen) return <></>;
    return (
        <div>
            <div
                x-show="isEditModalOpen"
                class="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
            >
                <div
                    x-show="isEditModalOpen"
                    class="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
                    role="dialog"
                    id="modal"
                >
                    <header class="flex justify-end">
                        <button
                            class="inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded dark:hover:text-gray-200 hover: hover:text-gray-700"
                            aria-label="close"
                            onClick={() => setIsEditModalOpen(false)}
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
                            Edit Listing
                        </p>
                        <p class={`text-sm text-gray-700 dark:text-gray-400`}>
                            <label className="text-xs">
                                Name
                                <input
                                    onChange={(e) =>
                                        setEditedName(e.target.value)
                                    }
                                    value={editedName}
                                    class="my-4 focus:border-purple-400 block w-full mt-1 text-lg dark:border-gray-600 dark:bg-gray-700  focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                    placeholder="Item Name"
                                />
                            </label>
                            <label className="text-xs">
                                Price
                                <input
                                    onChange={(e) =>
                                        setEditedPrice(e.target.value)
                                    }
                                    value={editedPrice}
                                    class="my-4 focus:border-purple-400 block w-full mt-1 text-lg dark:border-gray-600 dark:bg-gray-700  focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                    placeholder="Price"
                                />
                            </label>
                            <label className="text-xs">
                                Message
                                <input
                                    onChange={(e) =>
                                        setEditedMessage(e.target.value)
                                    }
                                    value={editedMessage}
                                    class="my-4 focus:border-purple-400 block w-full mt-1 text-lg dark:border-gray-600 dark:bg-gray-700  focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                    placeholder="Message"
                                />
                            </label>
                            <label className="text-xs">
                                Tag
                                <select
                                    onChange={(e) =>
                                        setEditedTag(e.target.value)
                                    }
                                    value={editedTag}
                                    class="my-4 focus:border-purple-400 block w-full mt-1 text-lg dark:border-gray-600 dark:bg-gray-700  focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                >
                                    <option disabled selected>
                                        Tag
                                    </option>
                                    {TagsJSON.tags.map((tagName, i) => {
                                        return (
                                            <option key={i} value={tagName}>
                                                {tagName}
                                            </option>
                                        );
                                    })}
                                </select>
                            </label>
                            <label className="block text-sm mt-2">
                                <div className="flex items-center">
                                    <span className="mr-2 text-gray-700 dark:text-gray-400">
                                        Image Address
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                                    </svg>
                                </div>
                                {renderImageAddressInputs()}

                                <button
                                    onClick={() =>
                                        setEditedImages([...editedImages, ""])
                                    }
                                    className="text-gray-500 text-xs hover:text-purple-600 outline-none"
                                >
                                    + Add Image Address
                                </button>
                            </label>
                        </p>
                    </div>
                    <footer class="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800">
                        <button
                            onClick={() => setIsEditModalOpen(false)}
                            class="w-full px-5 py-3 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={requestEditListing}
                            class="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 focus:outline-none focus:shadow-outline-purple"
                        >
                            Save
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
}
