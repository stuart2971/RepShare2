import { useHistory } from "react-router-dom";

export default function Listing({
    name,
    price,
    imageUrl,
    tag,
    isQualityChecked,
    dateCreated,
    _id,
    createdBy,
    getIdOnClick,
}) {
    const history = useHistory();
    function redirectToItemPage() {
        history.push(`/listing/${_id}`);
    }

    function renderIcons() {
        if (history.location.pathname.split("/")[2] === "haul") {
            return (
                <td
                    className="cursor-pointer px-4 py-3 text-sm"
                    onClick={() => getIdOnClick(_id)}
                >
                    ✕
                </td>
            );
        }
    }
    return (
        <tr className=" text-gray-700 dark:text-gray-400">
            <td className="px-4 py-3">
                <div className="flex items-center text-sm">
                    <div
                        className="
                              relative
                              hidden
                              w-8
                              h-8
                              mr-3
                              rounded-full
                              md:block
                            "
                    >
                        {imageUrl ? (
                            <img
                                className="object-cover w-full h-full rounded-full"
                                src={imageUrl}
                                alt=""
                                loading="lazy"
                            />
                        ) : (
                            <></>
                        )}

                        <div
                            className="absolute inset-0 rounded-full shadow-inner"
                            aria-hidden="true"
                        ></div>
                    </div>
                    <div>
                        <div className="flex">
                            <p
                                onClick={redirectToItemPage}
                                className="mr-2 cursor-pointer font-semibold"
                            >
                                {name.length > 20
                                    ? name.substring(0, 20) + "..."
                                    : name}
                            </p>
                        </div>
                        <p className="text-xs text-gray-400 dark:text-gray-400">
                            {tag}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-4 py-3 text-sm">¥{price}</td>
            <td className="px-4 py-3 text-xs">
                <span
                    className={`
                            px-2
                            py-1
                            font-semibold
                            leading-tight
                            text-${isQualityChecked ? "green" : "gray"}-700
                            bg-${isQualityChecked ? "green" : "gray"}-100
                            rounded-full
                            dark:bg-green-700 dark:text-green-100
                          `}
                >
                    {isQualityChecked ? "Quality Checked" : "Not Checked"}
                </span>
            </td>
            <td className="px-4 py-3 text-sm">
                {dateCreated.substring(0, 10)}
            </td>
            <td>{getIdOnClick ? renderIcons() : <></>}</td>
        </tr>
    );
}
