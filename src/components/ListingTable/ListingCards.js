import { useHistory } from "react-router-dom";

export default function ListingCards({ listingsData, getIdOnClick }) {
    const history = useHistory();

    function redirectToItemPage(_id) {
        history.push(`/listing/${_id}`);
    }

    return (
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-14 mx-auto">
                <div class="flex flex-wrap -m-4">
                    {listingsData.map((listing) => {
                        return (
                            <div
                                class="cursor-pointer lg:w-1/4 md:w-1/2 p-4 w-full"
                                onClick={() => redirectToItemPage(listing._id)}
                            >
                                <a class="block relative h-48 rounded overflow-hidden">
                                    <img
                                        alt="ecommerce"
                                        class="object-cover object-center w-full h-full block"
                                        src={listing.imageURL[0]}
                                    />
                                </a>
                                <div class="mt-4">
                                    <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
                                        {listing.tag}
                                    </h3>
                                    <h2 class="text-gray-900 title-font text-lg font-medium">
                                        {listing.name}
                                    </h2>
                                    <p class="mt-1">¥{listing.price}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
