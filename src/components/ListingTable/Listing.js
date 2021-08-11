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
    removeFromHaul,
}) {
    const { user } = useAuth0();
    const history = useHistory();
    function redirectToItemPage() {
        history.push(`/listing/${_id}`);
    }
    console.log(name.length);
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
            {removeFromHaul ? (
                <td
                    className="cursor-pointer px-4 py-3 text-sm"
                    onClick={() => removeFromHaul(_id)}
                >
                    ✕
                </td>
            ) : (
                <></>
            )}
        </tr>
    );
}
