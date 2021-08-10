import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth0Id } from "../utils/GeneralUtils";
import { getUser } from "../utils/UserUtils";
export default function NavbarDesktop() {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();

    useEffect(async () => {
        if (!isAuthenticated) return;
        const fetchedUser = await getUser(
            window.location.pathname.split("/")[1],
            user.name
        );
        console.log(fetchedUser);
    }, [isAuthenticated]);
    return (
        <>
            <aside
                className="
                    z-20
                    hidden
                    w-64
                    overflow-y-auto
                    bg-white
                    dark:bg-gray-800
                    md:block
                    flex-shrink-0
                    "
            >
                <div className="py-4 text-gray-500 dark:text-gray-400">
                    <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200">
                        RepShare
                    </a>
                    <ul className="mt-6">
                        <li className="relative px-6 py-3">
                            <span
                                className="
                                    absolute
                                    inset-y-0
                                    left-0
                                    w-1
                                    bg-purple-600
                                    rounded-tr-lg rounded-br-lg
                                    "
                                aria-hidden="true"
                            />
                            <a
                                className="
                                    inline-flex
                                    items-center
                                    w-full
                                    text-sm
                                    font-semibold
                                    text-gray-800
                                    transition-colors
                                    duration-150
                                    hover:text-gray-800
                                    dark:hover:text-gray-200 dark:text-gray-100
                                    "
                            >
                                <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <Link to={`/${getAuth0Id(user)}/dashboard`}>
                                    <span className="ml-4">My Hauls</span>
                                </Link>
                            </a>
                        </li>
                    </ul>
                    <ul>
                        <li className="relative px-6 py-3">
                            <a
                                className="
                                    inline-flex
                                    items-center
                                    w-full
                                    text-sm
                                    font-semibold
                                    transition-colors
                                    duration-150
                                    hover:text-gray-800
                                    dark:hover:text-gray-200
                                    "
                            >
                                <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                                <span className="ml-4">Verified</span>
                            </a>
                        </li>
                        <li className="relative px-6 py-3">
                            <a
                                className="
                                    inline-flex
                                    items-center
                                    w-full
                                    text-sm
                                    font-semibold
                                    transition-colors
                                    duration-150
                                    hover:text-gray-800
                                    dark:hover:text-gray-200
                                "
                            >
                                <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                                <Link to={`/browse`}>
                                    <span className="ml-4">Browse</span>
                                </Link>
                            </a>
                        </li>
                        <li className="relative px-6 py-3">
                            <a
                                className="
                  inline-flex
                  items-center
                  w-full
                  text-sm
                  font-semibold
                  transition-colors
                  duration-150
                  hover:text-gray-800
                  dark:hover:text-gray-200
                "
                            >
                                <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                                <Link to={`/${getAuth0Id(user)}/myListings`}>
                                    <span className="ml-4">My Listings</span>
                                </Link>
                            </a>
                        </li>
                    </ul>
                    <div className="px-6 my-6">
                        <Link
                            className="
                            flex
                            items-center
                            justify-between
                            w-full
                            px-4
                            py-2
                            text-sm
                            font-medium
                            leading-5
                            text-white
                            transition-colors
                            duration-150
                            bg-purple-600
                            border border-transparent
                            rounded-lg
                            active:bg-purple-600
                            hover:bg-purple-700
                            focus:outline-none focus:shadow-outline-purple"
                            onClick={() => {
                                if (!isAuthenticated) loginWithRedirect();
                            }}
                            to="/createListing"
                        >
                            {isAuthenticated
                                ? "Create Listing"
                                : "Create account"}
                            <span className="ml-2" aria-hidden="true">
                                +
                            </span>
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
}
