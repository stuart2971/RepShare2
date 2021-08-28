import { useState } from "react";
import { useEffect } from "react";
import ListingSection from "../ListingTable/ListingSection";
import { getNewListings } from "../utils/ListingUtils";

export default function Browse() {
    const [browseListings, setBrowseListings] = useState([]);
    const [page, setPage] = useState(0);
    const LIMIT_PER_PAGE = 50;

    useEffect(async () => {
        const newListings = await getNewListings(
            LIMIT_PER_PAGE,
            page * LIMIT_PER_PAGE
        );
        setBrowseListings(newListings);
    }, [page]);

    return (
        <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <div>
                    <div className="flex items-center justify-between">
                        <h2
                            className="
                            my-6
                            text-2xl
                            font-semibold
                            text-gray-700
                            dark:text-gray-200
                        "
                        >
                            Newest Listings
                        </h2>
                    </div>
                    <ListingSection listings={browseListings} />
                </div>
                <div className="w-full flex justify-center mb-14">
                    {page !== 0 ? (
                        <div
                            className="flex items-center mx-4 cursor-pointer hover:text-purple-600"
                            onClick={() => {
                                if (page > 0) setPage(page - 1);
                            }}
                        >
                            <svg
                                aria-hidden="true"
                                class="w-4 h-4 fill-current"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                    fill-rule="evenodd"
                                ></path>
                            </svg>
                            <h1 className="text-lg">Previous</h1>
                        </div>
                    ) : (
                        <></>
                    )}

                    {browseListings.length === LIMIT_PER_PAGE ? (
                        <div
                            className="flex items-center mx-4 cursor-pointer hover:text-purple-600"
                            onClick={() => setPage(page + 1)}
                        >
                            <h1 className="text-lg">Next</h1>
                            <svg
                                class="w-4 h-4 fill-current"
                                aria-hidden="true"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd"
                                    fill-rule="evenodd"
                                ></path>
                            </svg>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </main>
    );
}
