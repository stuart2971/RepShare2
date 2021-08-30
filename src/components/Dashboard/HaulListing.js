import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { getAuth0Id } from "../utils/GeneralUtils";

export default function HaulListing({
    name,
    listingSize,
    lastUpdated,
    isMyHaul,
    setIsModalOpen,
    _id,
}) {
    const { user } = useAuth0();
    const history = useHistory();
    function redirectToHaulPage() {
        history.push(`/${getAuth0Id(user)}/haul/${_id}`);
    }
    return (
        <tr className="text-gray-700 dark:text-gray-400">
            <td className="px-4 py-3">
                <div className="flex items-center text-sm">
                    {/* Avatar with inset shadow */}

                    <div>
                        <p
                            onClick={redirectToHaulPage}
                            className="cursor-pointer font-semibold"
                        >
                            {name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                            {listingSize} items
                        </p>
                    </div>
                </div>
            </td>

            <td className="px-4 py-3 text-sm">
                {lastUpdated ? lastUpdated.substring(0, 10) : ""}
            </td>
            {isMyHaul ? (
                <td class="px-4 py-3">
                    <div class="flex items-center space-x-4 text-sm">
                        <button
                            class="
                              flex
                              items-center
                              justify-between
                              px-2
                              py-2
                              text-sm
                              font-medium
                              leading-5
                              text-purple-600
                              rounded-lg
                              dark:text-gray-400
                              focus:outline-none focus:shadow-outline-gray
                            "
                            aria-label="Edit"
                            onClick={() => setIsModalOpen("edit/" + _id)}
                        >
                            <svg
                                class="w-5 h-5"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                            </svg>
                        </button>
                        <button
                            onClick={() => setIsModalOpen("delete/" + _id)}
                            class="
                              flex
                              items-center
                              justify-between
                              px-2
                              py-2
                              text-sm
                              font-medium
                              leading-5
                              text-purple-600
                              rounded-lg
                              dark:text-gray-400
                              focus:outline-none focus:shadow-outline-gray
                            "
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
                    </div>
                </td>
            ) : (
                <></>
            )}
        </tr>
    );
}
