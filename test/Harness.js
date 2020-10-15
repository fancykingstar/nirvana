import React from "react";

import { MemoryRouter as RouterProvider } from "react-router-dom";

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
                identifier: "test",
                password: "Swordfish123!",
            }),
        }).then(setSession);
    }, []);

    return null;
}

export default function TestHarness({
    route,
    children,
    history = [route],
    loggedIn = true,
}) {
    return (
        <ThemeProvider>
            <RouterProvider initialEntries={history}>
                <AppContextProvider>
                    <ToastProvider>
                        {loggedIn ? <LoggIner /> : null}

                        {children}
                    </ToastProvider>
                </AppContextProvider>
            </RouterProvider>
        </ThemeProvider>
    );
}
