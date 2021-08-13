import { useState } from "react";
import { useEffect } from "react";
import ListingSection from "../ListingTable/ListingSection";
import { getNewListings } from "../utils/ListingUtils";

export default function Browse() {
    const [browseListings, setBrowseListings] = useState([]);
    useEffect(async () => {
        const newListings = await getNewListings(100, 0);
        setBrowseListings(newListings);
    }, []);

    return (
        <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
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
        </main>
    );
}
