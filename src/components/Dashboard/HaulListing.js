export default function HaulListing({ name, listingSize, lastUpdated }) {
    console.log(listingSize);

    return (
        <tr className="text-gray-700 dark:text-gray-400">
            <td className="px-4 py-3">
                <div className="flex items-center text-sm">
                    {/* Avatar with inset shadow */}

                    <div>
                        <p className="font-semibold">{name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                            {listingSize} items
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-4 py-3 text-sm">$ 863.45</td>
            <td className="px-4 py-3 text-xs">
                <span
                    className="
                      px-2
                      py-1
                      font-semibold
                      leading-tight
                      text-green-700
                      bg-green-100
                      rounded-full
                      dark:bg-green-700 dark:text-green-100
                    "
                >
                    Approved
                </span>
            </td>
            <td className="px-4 py-3 text-sm">
                {lastUpdated ? lastUpdated.substring(0, 10) : ""}
            </td>
        </tr>
    );
}
