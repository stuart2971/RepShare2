import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getAuth0Id } from "../utils/GeneralUtils";
import { createListing, doesExist } from "../utils/ListingUtils";
import TagsJSON from "./Tags.json";

export default function CreateListing() {
    const { user, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
    const history = useHistory();

    const [link, setLink] = useState("");
    const [itemName, setItemName] = useState("");
    const [imageAddress, setImageAddress] = useState([]);
    const [message, setMessage] = useState("");
    const [tag, setTag] = useState("");

    const [linkExists, setLinkExists] = useState(false);
    const [inserting, setInserting] = useState(false);
    const [numOfImages, setNumOfImages] = useState(1);

    async function checkIfExists(l) {
        setLink(l);
        const result = await doesExist(l);
        setLinkExists(result);
    }
    async function insertListing() {
        if (!link || linkExists.exists) return;
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect();
            return;
        }
        setInserting(true);
        const newListing = await createListing(
            link,
            getAuth0Id(user),
            itemName,
            imageAddress,
            message,
            tag
        );
        history.push("/listing/" + newListing._id);
        setInserting(false);
    }

    function renderImageAddressBoxes() {
        let boxes = [];
        for (let i = 0; i < numOfImages; i++) {
            boxes.push(
                <input
                    onChange={(e) => {
                        let addresses = [...imageAddress];
                        addresses[i] = e.target.value;
                        setImageAddress(addresses);
                    }}
                    className="
                                mt-2
                                w-full p-2 text-base placeholder-gray-400 border-none rounded-md focus:outline-none
                                "
                    placeholder={`Image Address ${i + 1}`}
                />
            );
        }
        return boxes;
    }
    console.log(imageAddress);
    const buttonIsDisabled = linkExists.exists || inserting;
    return (
        <main className="h-screen pb-16 overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2
                    className="
                        my-6
                        text-2xl
                        font-semibold
                        text-gray-700
                        dark:text-gray-200
                        "
                >
                    Create a Listing
                </h2>
                <div class="flex items-center px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                    <p class="ml-4 text-sm text-gray-600 dark:text-gray-400">
                        Certain fields such as item name, image address, and
                        price will be automatically filled if blanks are left
                        empty.
                    </p>
                </div>
                <div
                    className="
                        px-4
                        py-3
                        bg-white
                        rounded-lg
                        shadow-md
                        dark:bg-gray-800
                        	
                        "
                >
                    <label className="block text-lg">
                        <span className="font-bold text-purple-700 dark:text-gray-400">
                            Link
                        </span>
                        <div
                            className={`relative text-gray-500 text-${
                                linkExists.exists ? "red" : "purple"
                            }-600`}
                        >
                            <input
                                autoFocus
                                className="
                                    mt-2
                                    w-full p-2 text-base placeholder-gray-400 border-none rounded-md focus:outline-none
                                "
                                onChange={(e) => checkIfExists(e.target.value)}
                                placeholder="https://item.taobao.com/..."
                            />
                            <button
                                onClick={insertListing}
                                disabled={buttonIsDisabled}
                                className={`
                                    absolute
                                    inset-y-0
                                    right-0
                                    px-4
                                    text-sm
                                    font-medium
                                    leading-5
                                    text-white
                                    transition-colors
                                    duration-150
                                    bg-purple-${
                                        buttonIsDisabled
                                            ? "400"
                                            : "600 hover:bg-purple-700"
                                    }
                                    border border-transparent
                                    rounded-r-md
                                    active:bg-purple-600
                                    
                                    focus:outline-none focus:shadow-outline-purple
                                `}
                            >
                                {inserting ? "Posting..." : "Post"}
                            </button>
                        </div>
                        {link ? (
                            linkExists.exists ? (
                                <span
                                    onClick={() =>
                                        history.push(
                                            "/listing/" + linkExists._id
                                        )
                                    }
                                    className="cursor-pointer underline text-xs text-red-600 dark:text-red-400"
                                >
                                    Item with this link already exists. Click
                                    here to see the item.
                                </span>
                            ) : (
                                <span className="text-xs text-purple-600 dark:text-red-400">
                                    Yup! This item has not been posted yet
                                </span>
                            )
                        ) : (
                            <></>
                        )}
                    </label>
                    <div
                        className={
                            itemName ||
                            imageAddress.length > 0 ||
                            message ||
                            tag
                                ? ""
                                : "opacity-25 hover:opacity-100 transition"
                        }
                    >
                        <label className="block text-sm mt-2">
                            <span className=" text-gray-700 dark:text-gray-400">
                                Item Name
                            </span>
                            <input
                                className="
                                    mt-2
                                    w-full p-2 text-base placeholder-gray-400 border-none rounded-md focus:outline-none
                                    "
                                maxlength="150"
                                onChange={(e) => setItemName(e.target.value)}
                                placeholder="Brand, Item Type"
                            />
                        </label>
                        <label className="block text-sm mt-2">
                            <div className="flex items-center">
                                <span className="mr-2 text-gray-700 dark:text-gray-400">
                                    Image Address
                                </span>
                                <abbr
                                    className="cursor-pointer"
                                    title="Right click on an image and press 'Copy image address'"
                                >
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
                                </abbr>
                            </div>
                            {renderImageAddressBoxes()}

                            <button
                                onClick={() => setNumOfImages(numOfImages + 1)}
                                className="ml-2 mt-2 text-gray-500 text-xs hover:text-purple-600 outline-none"
                            >
                                + Add Image Address
                            </button>
                        </label>

                        <label className="block mt-2 text-sm">
                            <span className="text-gray-700 dark:text-gray-400">
                                Message
                            </span>
                            <input
                                onChange={(e) => setMessage(e.target.value)}
                                className="
                                    p-2
                                    block
                                    w-full
                                    mt-2
                                    text-sm
                                    dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700
                                    form-textarea
                                    focus:border-purple-400
                                    focus:outline-none
                                    focus:shadow-outline-purple
                                    dark:focus:shadow-outline-gray
                                    "
                                maxlength="250"
                                placeholder="Enter any positive comments you may have had with this seller, or talk about the quality of the item, etc"
                            />
                        </label>
                        <label className="block mt-2 text-sm">
                            <span className="text-gray-700 dark:text-gray-400">
                                Tag
                            </span>
                            <div className="mt-4 flex-wrap flex">
                                {TagsJSON.tags.map((tagName, i) => {
                                    return (
                                        <span
                                            onClick={(e) => {
                                                if (tag === tagName) {
                                                    setTag("");
                                                } else {
                                                    setTag(tagName);
                                                }
                                            }}
                                            key={i}
                                            className={`p-2 inline rounded text-${
                                                tagName === tag
                                                    ? "purple-600 font-semibold"
                                                    : "gray-400"
                                            } hover:text-purple-600 cursor-pointer`}
                                        >
                                            {tagName}
                                        </span>
                                    );
                                })}
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </main>
    );
}
