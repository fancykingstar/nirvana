import React from "react";

import AuthenticationGate from "./component/AuthenticationGate";

import Header from "./component/Header";
import Footer from "./component/Footer";
import Main from "./component/Main";

export default function App() {
    return (
        <React.Fragment>
            <Header />
            <AuthenticationGate>
                <Main />
            </AuthenticationGate>
            <Footer />
        </React.Fragment>
    );
}
