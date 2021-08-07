export default function Listing({
    name,
    price,
    imageUrl,
    tag,
    isQualityChecked,
    dateCreated,
}) {
    return (
        <tr className="cursor-pointer text-gray-700 dark:text-gray-400">
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
                        <img
                            className="object-cover w-full h-full rounded-full"
                            src="https://images.unsplash.com/photo-1566411520896-01e7ca4726af?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                            alt=""
                            loading="lazy"
                        />
                        <div
                            className="absolute inset-0 rounded-full shadow-inner"
                            aria-hidden="true"
                        ></div>
                    </div>
                    <div>
                        <p className="font-semibold">{name}</p>
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
        </tr>
    );
}
