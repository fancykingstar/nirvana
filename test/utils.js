import React from "react";
import qs from "qs";
import { Route, MemoryRouter as RouterProvider } from "react-router-dom";

import AppContextProvider, {
    useAppContext,
} from "../src/component/AppContextProvider";
import SWRErrorProvider from "../src/component/SWRErrorProvider";
import ToastProvider from "../src/component/ToastProvider";
import { useFormField } from "../src/hooks/useFormContext";

let cachedJWT = null;
async function getJWT(apiFetch) {
    if (cachedJWT) {
        return cachedJWT;
    } else {
        const jwt = await apiFetch("/auth/local", {
            method: "POST",
            body: JSON.stringify({
                identifier: "Content Management",
                password: "password",
            }),
        });

        cachedJWT = jwt;

        return jwt;
    }
}

function LoggIner() {
    const { setSession, apiFetch } = useAppContext();

    React.useEffect(() => {
        getJWT(apiFetch).then(setSession);
    }, []);

    return null;
}

export function createWrapper({ route, history = [route], loggedIn = true }) {
    let location = {};
    let apiFetchFunction = function apiFetchFunctionStub() {
        return Promise.resolve();
    };

    function setLocationFromRender({ location: newLocation }) {
        location = {
            ...newLocation,
            query: qs.parse(newLocation.search.slice(1)),
        };
    }

    function getCurrentLocation() {
        return location;
    }

    function apiFetch(...args) {
        return apiFetchFunction(...args);
    }

    function resetDb() {
        return apiFetchFunction("/database/reset", { method: "POST" });
    }

    function AquireApiFetch() {
        const { apiFetch } = useAppContext();

        React.useEffect(() => {
            apiFetchFunction = apiFetch;
        }, [apiFetch]);

        return null;
    }

    function wrapper({ children }) {
        return (
            <RouterProvider initialEntries={history}>
                <AppContextProvider>
                    <AquireApiFetch />
                    <ToastProvider>
                        <SWRErrorProvider>
                            {loggedIn ? <LoggIner /> : null}
                            <Route render={setLocationFromRender} />

                            {children}
                        </SWRErrorProvider>
                    </ToastProvider>
                </AppContextProvider>
            </RouterProvider>
        );
    }

    return { apiFetch, resetDb, getCurrentLocation, wrapper };
}

export function FormFieldTestable({ prop, ...props }) {
    const [state] = useFormField(prop);

    return <code {...props} data-test-value={JSON.stringify({ state })} />;
}
