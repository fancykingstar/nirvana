import React from "react";

import { Route, BrowserRouter as RouterProvider } from "react-router-dom";

import AppContextProvider from "./component/AppContextProvider";
import ToastProvider from "./component/ToastProvider";

import Header from "./component/Header";
import Footer from "./component/Footer";
import Main from "./component/Main";
import AuthenticationGate from "./component/AuthenticationGate";

export default function App() {
    return (
        <RouterProvider>
            <Route>
                <AppContextProvider>
                    <ToastProvider>
                        <Header />
                        <AuthenticationGate>
                            <Main>here be content</Main>
                        </AuthenticationGate>
                        <Footer />
                    </ToastProvider>
                </AppContextProvider>
            </Route>
        </RouterProvider>
    );
}
