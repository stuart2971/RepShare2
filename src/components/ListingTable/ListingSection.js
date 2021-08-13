import { useEffect, useState } from "react";
import { getListingsData } from "../utils/ListingUtils";
import ListingCards from "./ListingCards";
import ListingTable from "./ListingTable";

export default function ListingSection({ listings, getIdOnClick = null }) {
    const [listingsData, setListingsData] = useState([]);
    const [view, setView] = useState("card");

    useEffect(async () => {
        const data = await getListingsData(listings);
        setListingsData(data);
    }, [listings]);

    return (
        <div>
            <div className="w-full flex justify-end px-5 items-center font-semibold">
                View
                <svg
                    onClick={() => setView("list")}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="mx-2 cursor-pointer hover:text-purple-600 w-7 h-7 bi bi-view-list"
                    viewBox="0 0 16 16"
                >
                    <path
                        fill-rule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                    />
                </svg>
                <svg
                    onClick={() => setView("card")}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="mx-2 cursor-pointer hover:text-purple-600 w-5 h-5 bi bi-view-list"
                    viewBox="0 0 16 16"
                >
                    <path d="M3 0h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3zm0 8h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3z" />
                </svg>
            </div>
            {view === "card" ? (
                <ListingCards
                    listingsData={listingsData}
                    getIdOnClick={getIdOnClick}
                />
            ) : (
                <></>
            )}
            {view === "list" ? (
                <ListingTable
                    listingsData={listingsData}
                    getIdOnClick={getIdOnClick}
                />
            ) : (
                <></>
            )}
        </div>
    );
}
