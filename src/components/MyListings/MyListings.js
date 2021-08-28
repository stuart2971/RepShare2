import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ListingSection from "../ListingTable/ListingSection";
import { getMyListings } from "../utils/ListingUtils";

export default function MyListings() {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    const { auth0Id } = useParams();
    const [myListings, setMyListings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        console.log(isAuthenticated);
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect();
            return;
        }
        fetchMyListings();
    }, [isLoading, isAuthenticated]);

    async function fetchMyListings() {
        setLoading(true);
        const myListings = await getMyListings(auth0Id);
        setMyListings(myListings.listingsContributed);
        setLoading(false);
    }

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
                        My Listings
                    </h2>
                </div>
                {loading ? (
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
                    <ListingSection listings={myListings} />
                )}
            </div>
        </main>
    );
}
