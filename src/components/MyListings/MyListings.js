import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ListingSection from "../ListingTable/ListingSection";
import { getMyListings, deleteListing } from "../utils/ListingUtils";
import DeleteModal from "./DeleteModal";

export default function MyListings() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const { auth0Id } = useParams();
    const [myListings, setMyListings] = useState([]);
    const [modalConfirmation, setModalConfirmation] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState("");

    useEffect(async () => {
        if (!isAuthenticated) {
            loginWithRedirect();
            return;
        }
        fetchMyListings();
    }, []);
    async function deleteListingFromDB() {
        if (modalConfirmation === "DELETE" && idToDelete) {
            const status = await deleteListing(idToDelete);
            fetchMyListings();
            setIsModalOpen(false);
        }
    }
    async function fetchMyListings() {
        const myListings = await getMyListings(auth0Id);
        setMyListings(myListings.listingsContributed);
    }
    function closeModal() {
        setIdToDelete("");
        setModalConfirmation("");
        setIsModalOpen(false);
    }

    function openModal(listingId) {
        setIdToDelete(listingId);
        setIsModalOpen(true);
    }
    return (
        <main className="h-full overflow-y-auto">
            <DeleteModal
                setModalConfirmation={setModalConfirmation}
                modalConfirmation={modalConfirmation}
                closeModal={closeModal}
                isModalOpen={isModalOpen}
                confirmModal={deleteListingFromDB}
            />
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
                <ListingSection
                    getIdOnClick={openModal}
                    listings={myListings}
                />
            </div>
        </main>
    );
}
