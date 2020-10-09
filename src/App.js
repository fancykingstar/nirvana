import React from "react";

import Header from "./component/Header";
import NetworkProvider from "./component/NetworkProvider";
import AuthenticationGate from "./component/AuthenticationGate";

export default function App() {
    return (
        <NetworkProvider>
            <Header />
            <AuthenticationGate>
                <main>main</main>
            </AuthenticationGate>
            <footer>footer</footer>
        </NetworkProvider>
    );
}
