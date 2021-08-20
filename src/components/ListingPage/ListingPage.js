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
import EditModal from "./EditModal";
import QualityChecksSection from "./QualityCheck/QualityChecksSection";
import Stars from "./Stars";
import DeleteModal from "./DeleteModal";

export default function ItemPage() {
    const { listingId } = useParams();
    const { user } = useAuth0();

    const [name, setName] = useState("");
    const [images, setImages] = useState([]);
    const [price, setPrice] = useState("");
    const [tag, setTag] = useState("");
    const [message, setMessage] = useState("");
    const [link, setLink] = useState("");
    const [qualityChecks, setQualityChecks] = useState([]);
    const [createdBy, setCreatedBy] = useState("");

    const [hauls, setHauls] = useState([]);
    const [imageIndex, setImageIndex] = useState(0);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const menuButton = (
        <MenuButton>
            <button className="flex ml-auto text-white bg-purple-600 border-0 py-2 px-4 focus:outline-none hover:bg-purple-700 rounded">
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
                <span className="hidden sm:block">Add to haul</span>
            </button>
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
        updateListing();
        const haulsData = await getHaulsData(getAuth0Id(user));
        setHauls(haulsData);
    }, []);

    async function updateListing() {
        const listing = await getListing(listingId);
        console.log(listing);
        setName(listing.name);
        setImages(listing.imageURL);
        setPrice(listing.price);
        setTag(listing.tag);
        setMessage(listing.message);
        setLink(listing.link);
        setQualityChecks(listing.qualityChecks);
        setCreatedBy(listing.createdBy);
    }

    return (
        <section className="text-gray-600 body-font h-100 pb-24">
            <EditModal
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                name={name}
                price={price}
                tag={tag}
                message={message}
                images={images}
                updateListing={updateListing}
                listingId={listingId}
            />
            <DeleteModal
                isDeleteModalOpen={isDeleteModalOpen}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                listingId={listingId}
            />
            <div className="container px-5 pt-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap relative">
                    <img
                        alt="ecommerce"
                        className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                        src={images[imageIndex % images.length]}
                    />
                    <div className="absolute top-2 left-2 flex">
                        <div
                            onClick={() => setImageIndex(imageIndex - 1)}
                            className="hover:bg-gray-200 cursor-pointer flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full"
                        >
                            ❮
                        </div>
                        <div
                            onClick={() => setImageIndex(imageIndex + 1)}
                            className="mx-2 hover:bg-gray-200 cursor-pointer flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full"
                        >
                            ❯
                        </div>
                    </div>
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">
                            {tag}
                        </h2>
                        <a href={link} target="__blank">
                            <h1 className="underline text-gray-900 text-3xl title-font font-medium mb-1">
                                {name}
                            </h1>
                        </a>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                <Stars count={4} size={4} />
                                <span className="text-gray-600 ml-3">
                                    {qualityChecks.length} Reviews
                                </span>
                            </span>
                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                {createdBy === getAuth0Id(user) ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="bi bi-shield-fill-check ml-2 w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                    </svg>
                                ) : (
                                    <></>
                                )}
                                {qualityChecks.length > 0 ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        className="bi bi-shield-fill-check ml-2 w-5 h-5"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        className="bi bi-shield-slash-fill ml-2 w-4 h-4"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M1.093 3.093c-.465 4.275.885 7.46 2.513 9.589a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.32 11.32 0 0 0 1.733-1.525L1.093 3.093zm12.215 8.215L3.128 1.128A61.369 61.369 0 0 1 5.073.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.483 3.626-.332 6.491-1.551 8.616zm.338 3.046-13-13 .708-.708 13 13-.707.707z"
                                        />
                                    </svg>
                                )}
                            </span>
                        </div>
                        <p className="leading-relaxed">{message}</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
                        <div className="flex justify-between">
                            <span className="title-font font-medium text-2xl text-gray-900">
                                ¥{price}
                            </span>
                            <div className="flex">
                                <Menu
                                    direction="left"
                                    arrow="arrow"
                                    menuButton={menuButton}
                                >
                                    <MenuHeader>Your Hauls</MenuHeader>
                                    <MenuDivider />
                                    {hauls.map((haul) => {
                                        return (
                                            <MenuItem
                                                onClick={() =>
                                                    addToHaul(haul._id)
                                                }
                                            >
                                                {haul.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Menu>
                                {createdBy === getAuth0Id(user) ? (
                                    <div>
                                        <button
                                            onClick={() =>
                                                setIsEditModalOpen(true)
                                            }
                                            className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                className="bi bi-pencil-fill w-4 h-4"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() =>
                                                setIsDeleteModalOpen(true)
                                            }
                                            className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                className="bi bi-trash-fill w-4 h-4"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                    <QualityChecksSection
                        listingId={listingId}
                        qualityChecks={qualityChecks}
                        updateListing={updateListing}
                    />
                </div>
            </div>
        </section>
    );
}
