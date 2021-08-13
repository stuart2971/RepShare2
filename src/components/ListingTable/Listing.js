import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { getAuth0Id } from "../utils/GeneralUtils";

export default function Listing({
    name,
    price,
    imageUrl,
    tag,
    isQualityChecked,
    dateCreated,
    _id,
    createdBy,
    getIdOnClick,
}) {
    const { user } = useAuth0();
    const history = useHistory();
    function redirectToItemPage() {
        history.push(`/listing/${_id}`);
    }

    function renderIcons() {
        if (history.location.pathname.split("/")[2] === "haul") {
            return (
                <td
                    className="cursor-pointer px-4 py-3 text-sm"
                    onClick={() => getIdOnClick(_id)}
                >
                    ✕
                </td>
            );
        }
        if (history.location.pathname.split("/")[2] === "myListings") {
            return (
                <button
                    onClick={() => getIdOnClick(_id)}
                    class="text-purple-600"
                    aria-label="Delete"
                >
                    <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </button>
            );
        }
    }
    return (
        <tr className=" text-gray-700 dark:text-gray-400">
            <td className="px-4 py-3">
                <div className="flex items-center text-sm">
                    <div
                        className="
                              relative
                              hidden
                              w-8
                              h-8
                              mr-3
                              rounded-full
                              md:block
                            "
                    >
                        {imageUrl ? (
                            <img
                                className="object-cover w-full h-full rounded-full"
                                src={imageUrl}
                                alt=""
                                loading="lazy"
                            />
                        ) : (
                            <></>
                        )}

                        <div
                            className="absolute inset-0 rounded-full shadow-inner"
                            aria-hidden="true"
                        ></div>
                    </div>
                    <div>
                        <div className="flex">
                            <p
                                onClick={redirectToItemPage}
                                className="mr-2 cursor-pointer font-semibold"
                            >
                                {name.length > 20
                                    ? name.substring(0, 20) + "..."
                                    : name}
                            </p>
                            {getAuth0Id(user) === createdBy ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg>
                            ) : (
                                <></>
                            )}
                        </div>
                        <p className="text-xs text-gray-400 dark:text-gray-400">
                            {tag}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-4 py-3 text-sm">¥{price}</td>
            <td className="px-4 py-3 text-xs">
                <span
                    className={`
                            px-2
                            py-1
                            font-semibold
                            leading-tight
                            text-${isQualityChecked ? "green" : "gray"}-700
                            bg-${isQualityChecked ? "green" : "gray"}-100
                            rounded-full
                            dark:bg-green-700 dark:text-green-100
                          `}
                >
                    {isQualityChecked ? "Quality Checked" : "Not Checked"}
                </span>
            </td>
            <td className="px-4 py-3 text-sm">
                {dateCreated.substring(0, 10)}
            </td>
            <td>{getIdOnClick ? renderIcons() : <></>}</td>
        </tr>
    );
}
