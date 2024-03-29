import { useAuth0 } from "@auth0/auth0-react";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { findListings } from "./utils/ListingUtils";

export default function Header({ toggleSideMenu, sideMenu }) {
    const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();
    const history = useHistory();

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(async () => {
        const results = await findListings(search);
        setSearchResults(results);
    }, [search]);

    function redirectToItemPage(id) {
        history.push("/listing/" + id);
        setSearch("");
    }

    const profileImage = (
        <MenuButton>
            <li className="relative">
                <button
                    className="
                align-middle
                rounded-full
                focus:shadow-outline-purple focus:outline-none
            "
                >
                    <img
                        className="object-cover w-8 h-8 rounded-full"
                        src={isAuthenticated ? user.picture : ""}
                        alt=""
                        aria-hidden="true"
                    />
                </button>
                <template x-if="isProfileMenuOpen" />
            </li>
        </MenuButton>
    );
    return (
        <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
            <div
                className="
              container
              flex
              items-center
              justify-between
              h-full
              px-6
              mx-auto
              text-purple-600
              dark:text-purple-300
            "
            >
                {/* Mobile hamburger */}
                <button
                    className="
                p-1
                mr-5
                -ml-1
                rounded-md
                md:hidden
                focus:outline-none focus:shadow-outline-purple
              "
                    onClick={() => toggleSideMenu(!sideMenu)}
                    aria-label="Menu"
                >
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                {/* Search input */}
                <div className="flex justify-center flex-1 lg:mr-32">
                    <div
                        className="
                            relative
                            w-full
                            max-w-xl
                            mr-6
                            focus-within:text-purple-500
                            
                            "
                    >
                        <div className="absolute inset-y-0 flex items-center pl-2">
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <input
                            className="
                                w-full
                                h-10
                                pl-8
                                pr-2
                                text-sm text-gray-700
                                placeholder-gray-600
                                bg-gray-100
                                border-0
                                rounded-md
                                focus:placeholder-gray-500
                                focus:bg-white
                                focus:border-purple-300
                                focus:outline-none
                                focus:shadow-outline-purple
                                form-input
                            "
                            type="text"
                            placeholder="Search for items"
                            aria-label="Search"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        {search ? (
                            <div className="min-h-0 w-full absolute rounded bg-white">
                                {searchResults.map((result, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className="w-full h-10 text-black px-4 py-2 hover:text-purple-600 cursor-pointer"
                                            onClick={() =>
                                                redirectToItemPage(result._id)
                                            }
                                        >
                                            <h1>{result.name}</h1>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>

                <ul className="flex items-center flex-shrink-0 space-x-6">
                    {/* Theme toggler */}
                    <li className="flex">
                        <button
                            className="
                                rounded-md
                                focus:outline-none focus:shadow-outline-purple
                            "
                            onClick="toggleTheme"
                            aria-label="Toggle color mode"
                        >
                            <template x-if="!dark" />
                            <template x-if="dark" />
                        </button>
                    </li>
                    {/* Notifications menu */}
                    <li className="relative">
                        <button
                            className="
                    relative
                    align-middle
                    rounded-md
                    focus:outline-none focus:shadow-outline-purple
                  "
                            onClick="toggleNotificationsMenu"
                            aria-label="Notifications"
                            aria-haspopup="true"
                        >
                            {/* Notification badge */}
                        </button>
                        <template x-if="isNotificationsMenuOpen" />
                    </li>
                    {/* Profile menu */}
                    {isAuthenticated ? (
                        <Menu menuButton={profileImage}>
                            {/* <SubMenu label="Currency">
                                <MenuItem>Yuan</MenuItem>
                            </SubMenu> */}
                            <MenuItem onClick={() => logout()}>
                                Log out
                            </MenuItem>
                        </Menu>
                    ) : (
                        <button onClick={() => loginWithRedirect()}>
                            Login
                        </button>
                    )}
                </ul>
            </div>
        </header>
    );
}
