import React from "react";

import AppContextProvider from "./component/AppContextProvider";

import Header from "./component/Header";
import Footer from "./component/Footer";
import Main from "./component/Main";
import AuthenticationGate from "./component/AuthenticationGate";

export default function App() {
    return (
        <AppContextProvider>
            <Header />
            <AuthenticationGate>
                <main>main</main>
            </AuthenticationGate>
            <Footer />
        </AppContextProvider>
    );
}
