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
                className="inline-block rounded-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white hover:text-white shadow transition duration-300 hover:shadow-lg text-lg font-semibold"
            >
                Add to haul
            </a>
        </MenuButton>
    );
    async function addToHaul(haulId) {
        const listing = await addListingToHaul(user.sub, haulId, listingId);
    }

    useEffect(async () => {
        const listing = await getListing(listingId);
        setName(listing.name);
        setImage(listing.imageURL[0]);
        setPrice(listing.price);
        setTag(listing.tag);
        setMessage(listing.message);
        setLink(listing.link);
        const haulsData = await getHaulsData(user.sub);
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
