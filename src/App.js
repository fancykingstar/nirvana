import React from "react";

import AuthenticationGate from "./component/AuthenticationGate";

import Header from "./component/Header";
import Main from "./component/Main";
import Sidebar from "./component/Sidebar";

export default function App() {
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
                </div>
            </div>
        </React.Fragment>
    );
}
