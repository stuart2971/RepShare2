import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createListing, doesExist } from "../utils/ListingUtils";
import TagsJSON from "./Tags.json";

export default function CreateListing() {
    const { user } = useAuth0();
    const history = useHistory();

    const [link, setLink] = useState("");
    const [itemName, setItemName] = useState("");
    const [imgurLink, setImgurLink] = useState("");
    const [message, setMessage] = useState("");
    const [tag, setTag] = useState("");

    const [linkExists, setLinkExists] = useState(false);
    const [inserting, setInserting] = useState(false);

    async function checkIfExists(l) {
        setLink(l);
        const result = await doesExist(l);
        if (result.exists) {
            setLinkExists(true);
        } else {
            setLinkExists(false);
        }
    }
    async function insertListing() {
        if (linkExists) return;
        setInserting(true);
        const newListing = await createListing(
            link,
            user.sub,
            itemName,
            imgurLink,
            message,
            tag
        );
        history.push("/listing/" + newListing._id);
        setInserting(false);
        console.log(newListing);
    }
    const buttonIsDisabled = linkExists || inserting;
    return (
        <main className="h-full pb-16 overflow-y-auto">
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
                                linkExists ? "red" : "purple"
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
                            linkExists ? (
                                <span className="text-xs text-red-600 dark:text-red-400">
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
                            itemName || imgurLink || message || tag
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
                            <span className=" text-gray-700 dark:text-gray-400">
                                Imgur Link
                            </span>
                            <input
                                onChange={(e) => setImgurLink(e.target.value)}
                                className="
                                mt-2
                                w-full p-2 text-base placeholder-gray-400 border-none rounded-md focus:outline-none
                                "
                                placeholder="https://imgur.com/gallery/..."
                            />
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
