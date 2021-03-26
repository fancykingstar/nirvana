import React, { useEffect } from "react";

import AuthenticationGate from "./component/AuthenticationGate";

import Header from "./component/Header";
import Main from "./component/Main";
import Sidebar from "./component/Sidebar";
import Footer from "./component/Footer";
import Quill from "quill";
import CruiseTheme from "./Quill";

export default function App() {
    useEffect(() => {
        Quill.register(
            {
                "themes/cruise": CruiseTheme,
            },
            true,
        );
    }, []);
    return (
        <React.Fragment>
            <Header />
            <div className="grid grid-cols-12 gap-4 h-screen">
                <div className="col-span-2">
                    <div className="bg-nevy-500 h-full">
                        <Sidebar />
                    </div>
                </div>
                <div className="col-span-10">
                    <AuthenticationGate>
                        <Main />
                    </AuthenticationGate>
                    <Footer />
                </div>
            </div>
        </React.Fragment>
    );
}
