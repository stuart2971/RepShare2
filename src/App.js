import { useEffect, useState } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Browse from "./components/Browse/Browse";
import CreateListing from "./components/CreateListing/CreateListing";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header";
import MyListings from "./components/MyListings/MyListings";
import NavbarDesktop from "./components/Navbar/NavbarDesktop";
import NavbarMobile from "./components/Navbar/NavbarMobile";
import HaulPage from "./components/Dashboard/HaulPage";
import ListingPage from "./components/ListingPage/ListingPage";

import { getUser } from "./components/utils/UserUtils";
import { useAuth0 } from "@auth0/auth0-react";
import { getAuth0Id } from "./components/utils/GeneralUtils";

function App() {
    const { isAuthenticated, user } = useAuth0();
    const [sideMenu, toggleSideMenu] = useState(false);

    useEffect(async () => {
        if (!isAuthenticated) return;
        const fetchedUser = await getUser(getAuth0Id(user), user.name);
    }, [isAuthenticated]);

    return (
        <BrowserRouter>
            <div class="flex bg-gray-50 dark:bg-gray-900">
                {sideMenu ? <NavbarMobile /> : <NavbarDesktop />}

                <div class="flex flex-col flex-1 w-full">
                    <Header
                        toggleSideMenu={toggleSideMenu}
                        sideMenu={sideMenu}
                    />
                    <Switch>
                        <Route
                            exact
                            path="/:auth0Id/dashboard"
                            component={Dashboard}
                        />
                        <Route
                            path="/createListing"
                            component={CreateListing}
                        />
                        <Route exact path="/" component={Browse} />
                        <Route
                            path="/:auth0Id/myListings"
                            component={MyListings}
                        />
                        <Route
                            path="/:auth0Id/haul/:haulId"
                            component={HaulPage}
                        />
                        <Route
                            path="/listing/:listingId"
                            component={ListingPage}
                        />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

/**
 * PurgeCSS:
 * text-blue-500
 * bg-blue-100
 * text-green-500
 * text-yellow-500
 * bg-yellow-100
 * text-pink-500
 * bg-pink-100
 * text-red-600
 * bg-purple-400
 * bg-purple-600
 * hover:bg-purple-700
 * opacity-25
 * hover:opacity-100
 * transition
 * text-purple-600
 * text-gray-400
 * font-semibold
 * text-green-700
 * text-gray-700
 * bg-green-100
 * bg-gray-100
 * w-4
 * h-4
 * w-6
 * h-6
 * bg-red-600
 * bg-red-200
 * hover:bg-red-700
 */
