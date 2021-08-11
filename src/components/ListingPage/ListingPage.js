import { useAuth0 } from "@auth0/auth0-react";
import {
    Menu,
    MenuButton,
    MenuDivider,
    MenuHeader,
    MenuItem,
} from "@szhsin/react-menu";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getHaulsData } from "../utils/DashboardUtils";
import { addListingToHaul, getListing } from "../utils/ListingUtils";
import { getAuth0Id } from "../utils/GeneralUtils";

export default function ItemPage() {
    const { listingId } = useParams();
    const { user } = useAuth0();

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [tag, setTag] = useState("");
    const [message, setMessage] = useState("");
    const [link, setLink] = useState("");

    const [hauls, setHauls] = useState([]);

    const menuButton = (
        <MenuButton>
            <a
                href="#0"
                className="inline-block rounded-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white hover:text-white shadow transition duration-300 hover:shadow-lg text-lg font-semibold flex items-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="mr-2 mb-1"
                    viewBox="0 0 16 16"
                >
                    <path
                        fill-rule="evenodd"
                        d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"
                    />
                    <path
                        fill-rule="evenodd"
                        d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
                    />
                </svg>
                Add to haul
            </a>
        </MenuButton>
    );
    async function addToHaul(haulId) {
        const listing = await addListingToHaul(
            getAuth0Id(user),
            haulId,
            listingId
        );
    }

    useEffect(async () => {
        const listing = await getListing(listingId);
        setName(listing.name);
        setImage(listing.imageURL[0]);
        setPrice(listing.price);
        setTag(listing.tag);
        setMessage(listing.message);
        setLink(listing.link);
        const haulsData = await getHaulsData(getAuth0Id(user));
        setHauls(haulsData);
    }, []);
    return (
        <section className="bg-gray-100 h-full md:px-10 pt-20 lg:py-28">
            <div className="container mx-auto px-5">
                <div className="grid lg:grid-cols-2 gap-10 text-center lg:text-left">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl sm:text-5xl font-bold">
                                {name}
                            </h2>
                            <p className="ml-4 text-xl text-gray-600">{tag}</p>
                        </div>
                        <div className="space-y-4 flex items-center">
                            <p className="inline ml-4 text-xl text-gray-600">
                                {message}
                            </p>
                        </div>
                        <div className="flex justify-center lg:justify-start items-center space-x-4">
                            <Menu
                                direction="right"
                                arrow="arrow"
                                menuButton={menuButton}
                            >
                                <MenuHeader>Your Hauls</MenuHeader>
                                <MenuDivider />
                                {hauls.map((haul) => {
                                    return (
                                        <MenuItem
                                            onClick={() => addToHaul(haul._id)}
                                        >
                                            {haul.name}
                                        </MenuItem>
                                    );
                                })}
                            </Menu>
                            <div className="text-xl font-semibold text-purple-600">
                                Price ¥{price}
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            className="w-full"
                            src={image}
                            alt="No Listing Image"
                        />
                        <div className="absolute w-full flex justify-between top-1/2 px-2">
                            <div className=" bg-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100">
                                ❮
                            </div>
                            <div className=" bg-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100">
                                ❯
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
