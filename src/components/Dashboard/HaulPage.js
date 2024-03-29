import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getHaul } from "../utils/DashboardUtils";
import Card from "./Card";
import { removeListingFromHaul } from "../utils/ListingUtils";
import { useAuth0 } from "@auth0/auth0-react";
import { getAuth0Id } from "../utils/GeneralUtils";
import ListingSection from "../ListingTable/ListingSection";

export default function HaulPage() {
    const { user } = useAuth0();
    const { haulId, auth0Id } = useParams();

    const [haulName, setHaulName] = useState("");
    const [numberOfItems, setNumberOfItems] = useState(0);
    const [haulListings, setHaulListings] = useState([]);

    useEffect(async () => {
        const haul = await getHaul(auth0Id, haulId);
        setHaulName(haul.hauls[0].name);
        setNumberOfItems(haul.hauls[0].listings.length);
        setHaulListings(haul.hauls[0].listings);
    }, []);

    async function removeFromHaul(listingId) {
        const updatedUser = await removeListingFromHaul(
            getAuth0Id(user),
            haulId,
            listingId
        );
        setHaulListings(updatedUser.hauls[0].listings);
    }

    return (
        <main className="h-screen overflow-y-auto">
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
                        {haulName}
                    </h2>
                </div>
                {/* Cards */}
                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                    {/* Card */}
                    <Card
                        title="Number of Items"
                        value={numberOfItems}
                        SVGPath={
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        }
                        color="blue"
                    />
                </div>
                <ListingSection
                    getIdOnClick={
                        getAuth0Id(user) === auth0Id ? removeFromHaul : null
                    }
                    listings={haulListings}
                />
            </div>
        </main>
    );
}
