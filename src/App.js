import { useState } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import CreateListing from "./components/CreateListing/CreateListing";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header";
import NavbarDesktop from "./components/Navbar/NavbarDesktop";
import NavbarMobile from "./components/Navbar/NavbarMobile";

function App() {
    const [sideMenu, toggleSideMenu] = useState(false);
    console.log(sideMenu);
    return (
        <BrowserRouter>
            <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
                <NavbarDesktop />
                {sideMenu ? <NavbarMobile /> : <></>}

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
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
