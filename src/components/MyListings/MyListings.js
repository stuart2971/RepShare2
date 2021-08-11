import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ListingTable from "../ListingTable/ListingTable";
import { getMyListings } from "../utils/ListingUtils";

export default function MyListings() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const { auth0Id } = useParams();
    const [myListings, setMyListings] = useState([]);
    useEffect(async () => {
        if (!isAuthenticated) {
            loginWithRedirect();
            return;
        }
        const myListings = await getMyListings(auth0Id);
        setMyListings(myListings.listingsContributed);
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
                        My Listings
                    </h2>
                </div>
                <ListingTable listings={myListings} />
            </div>
        </main>
    );
}
