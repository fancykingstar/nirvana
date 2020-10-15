import React from "react";
import qs from "qs";
import { Route, MemoryRouter as RouterProvider } from "react-router-dom";

import ThemeProvider from "../src/component/ThemeProvider";
import AppContextProvider, {
    useAppContext,
} from "../src/component/AppContextProvider";
import ToastProvider from "../src/component/ToastProvider";

function LoggIner() {
    const { setSession, apiFetch } = useAppContext();

    React.useEffect(() => {
        apiFetch("/auth/local", {
            method: "POST",
            body: JSON.stringify({
                identifier: "Content Management",
                password: "password",
            }),
        }).then(setSession);
    }, []);

    return null;
}

export function createWrapper({ route, history = [route], loggedIn = true }) {
    let location = {};

    function setLocationFromRender({ location: newLocation }) {
        location = {
            ...newLocation,
            query: qs.parse(newLocation.search.slice(1)),
        };
    }

    function getCurrentLocation() {
        return location;
    }

    function wrapper({ children }) {
        return (
            <ThemeProvider>
                <RouterProvider initialEntries={history}>
                    <AppContextProvider>
                        <ToastProvider>
                            {loggedIn ? <LoggIner /> : null}
                            <Route render={setLocationFromRender} />

                            {children}
                        </ToastProvider>
                    </AppContextProvider>
                </RouterProvider>
            </ThemeProvider>
        );
    }

    return { getCurrentLocation, wrapper };
}
