import Listing from "./Listing";

export default function ListingTable({ listingsData, getIdOnClick }) {
    return (
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                    <thead>
                        <tr
                            className="
                                        text-xs
                                        font-semibold
                                        tracking-wide
                                        text-left text-gray-500
                                        uppercase
                                        border-b
                                        dark:border-gray-700
                                        bg-gray-50
                                        dark:text-gray-400 dark:bg-gray-800
                                        "
                        >
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Verified</th>
                            <th className="px-4 py-3">Date Posted</th>
                        </tr>
                    </thead>
                    <tbody
                        className="
                                    bg-white
                                    divide-y
                                    dark:divide-gray-700 dark:bg-gray-800
                                "
                    >
                        {listingsData.map((listing) => {
                            return (
                                <Listing
                                    _id={listing._id}
                                    imageUrl={listing.imageURL[0]}
                                    name={listing.name}
                                    price={listing.price}
                                    tag={listing.tag}
                                    isQualityChecked={
                                        listing.qualityChecks !== 0
                                    }
                                    dateCreated={listing.dateCreated}
                                    createdBy={listing.createdBy}
                                    getIdOnClick={getIdOnClick}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div
                className="
                            grid
                            px-4
                            py-3
                            text-xs
                            font-semibold
                            tracking-wide
                            text-gray-500
                            uppercase
                            border-t
                            dark:border-gray-700
                            bg-gray-50
                            sm:grid-cols-9
                            dark:text-gray-400 dark:bg-gray-800"
            ></div>
        </div>
    );
}
