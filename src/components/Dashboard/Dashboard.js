import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    calculateTotalHaulItems,
    getDashboardData,
    getHaulsData,
} from "../utils/DashboardUtils";
import Card from "./Card";
import HaulListing from "./HaulListing";
import Modal from "./Modal";
import { getAuth0Id } from "../utils/GeneralUtils";

export default function Dashboard() {
    let { auth0Id } = useParams();
    const { user, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
    const [haulsData, setHaulsData] = useState([]);
    const [numberOfHauls, setNumberOfHauls] = useState(null);
    const [totalHaulItems, setTotalHaulItems] = useState(null);
    const [listingsContributed, setListingsContributed] = useState(null);
    const [qualityChecksDone, setQualityChecksDone] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState("");

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect();
            return;
        }
        updateDashboard();
    }, [isLoading, isAuthenticated]);

    async function updateDashboard() {
        const dashboardData = await getDashboardData(auth0Id);
        const hauls = await getHaulsData(auth0Id);
        setHaulsData(hauls);
        setNumberOfHauls(dashboardData.numberOfHauls);
        setTotalHaulItems(calculateTotalHaulItems(hauls));
        setListingsContributed(dashboardData.numberOfListingsContributed);
        setQualityChecksDone(dashboardData.numberOfQualityChecks);
    }
    return (
        <main className="h-screen overflow-y-auto">
            <Modal
                updateDashboard={updateDashboard}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
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
                        Dashboard
                    </h2>
                    {auth0Id === getAuth0Id(user) ? (
                        <button
                            onClick={() => setIsModalOpen("add")}
                            className="flex
                            items-center
                            justify-between
                            w-18
                            h-10
                            px-4
                            py-2
                            text-sm
                            font-medium
                            leading-5
                            text-purple-600
                            transition-colors
                            duration-150
                            border border-purple-600
                            rounded-lg
                            active:bg-purple-600
                            hover:bg-purple-700
                            hover:text-white
                            focus:outline-none focus:shadow-outline-purple"
                        >
                            + Create Haul
                        </button>
                    ) : (
                        <></>
                    )}
                </div>
                {/* Cards */}
                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                    {/* Card */}
                    <Card
                        title="Number of Hauls"
                        value={numberOfHauls}
                        SVGPath={
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        }
                        color="blue"
                    />
                    <Card
                        title="Total Haul Items"
                        value={totalHaulItems}
                        SVGPath={
                            <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                        }
                        color="green"
                    />
                    <Card
                        title="Listings Contributed"
                        value={listingsContributed}
                        SVGPath={
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        }
                        color="yellow"
                    />
                    <Card
                        title="Quality Checks Done"
                        value={qualityChecksDone}
                        SVGPath={
                            <path
                                fillRule="evenodd"
                                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                            />
                        }
                        color="pink"
                    />
                </div>
                {/* New Table */}
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
                                    <th className="px-4 py-3">Item</th>
                                    <th className="px-4 py-3">Last Updated</th>
                                </tr>
                            </thead>
                            <tbody
                                className="
                bg-white
                divide-y
                dark:divide-gray-700 dark:bg-gray-800
              "
                            >
                                {haulsData.map((haulListing, i) => {
                                    return (
                                        <HaulListing
                                            name={haulListing.name}
                                            listingSize={
                                                haulListing.listingSize
                                            }
                                            lastUpdated={
                                                haulListing.lastUpdated
                                            }
                                            key={i}
                                            isMyHaul={
                                                auth0Id === getAuth0Id(user)
                                            }
                                            setIsModalOpen={setIsModalOpen}
                                            _id={haulListing._id}
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
                            dark:text-gray-400 dark:bg-gray-800
                        "
                    ></div>
                </div>
            </div>
        </main>
    );
}
