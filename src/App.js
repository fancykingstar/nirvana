import React from "react";

import { Route, BrowserRouter as RouterProvider } from "react-router-dom";

import ThemeProvider from "./component/ThemeProvider";
import AppContextProvider from "./component/AppContextProvider";
import ToastProvider from "./component/ToastProvider";
import AuthenticationGate from "./component/AuthenticationGate";

import Header from "./component/Header";
import Footer from "./component/Footer";
import Main from "./component/Main";

export default function App() {
    return (
        <ThemeProvider>
            <RouterProvider>
                <Route>
                    <AppContextProvider>
                        <ToastProvider>
                            <Header />
                            <AuthenticationGate>
                                <Main />
                            </AuthenticationGate>
                            <Footer />
                        </ToastProvider>
                    </AppContextProvider>
                </Route>
            </RouterProvider>
        </ThemeProvider>
    );
}
