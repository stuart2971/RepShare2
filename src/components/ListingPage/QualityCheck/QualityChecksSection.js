import { useState } from "react";
import AddQCModal from "./AddQCModal";
import QualityCheck from "./QualityCheck";

export default function QualityChecksSection({
    qualityChecks,
    listingId,
    updateListing,
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="mt-12 pt-12 w-full">
            <AddQCModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                listingId={listingId}
                updateListing={updateListing}
            />
            <div className="flex justify-between ">
                <h1 className="text-gray-900 text-2xl title-font font-medium mb-1">
                    Quality Checks ({qualityChecks.length} Reviews)
                </h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center w-auto px-4 py-2 hover:bg-purple-600 hover:text-white rounded border text-purple-600 border-purple-600 h-12"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="mr-2"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
                    </svg>
                    <span className="hidden md:block">Rate item</span>
                </button>
            </div>
            {qualityChecks.length > 0 ? (
                qualityChecks.map((qualityCheck, i) => {
                    return (
                        <QualityCheck
                            key={i}
                            name={qualityCheck.name}
                            auth0Id={qualityCheck.auth0Id}
                            comment={qualityCheck.comment}
                            rating={qualityCheck.rating}
                            _id={qualityCheck._id}
                            listingId={listingId}
                            updateListing={updateListing}
                        />
                    );
                })
            ) : (
                <p className="text-lg mt-4">
                    There are no quality checks on this item yet 😞
                </p>
            )}
        </div>
    );
}
