import { useState } from "react";
import { useEffect } from "react";
import ListingSection from "../ListingTable/ListingSection";
import { getNewListings } from "../utils/ListingUtils";

export default function Browse() {
    const [browseListings, setBrowseListings] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const LIMIT_PER_PAGE = 50;

    useEffect(async () => {
        setIsLoading(true);
        const newListings = await getNewListings(
            LIMIT_PER_PAGE,
            page * LIMIT_PER_PAGE
        );
        setBrowseListings(newListings);
        setIsLoading(false);
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

                    {isLoading ? (
                        <div className="flex flex-col items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="animate-spin w-12 h-12 bi bi-arrow-repeat"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                                <path
                                    fill-rule="evenodd"
                                    d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                                />
                            </svg>
                            <h1 className="text-xl">Fetching Listings...</h1>
                        </div>
                    ) : (
                        <ListingSection listings={browseListings} />
                    )}
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
