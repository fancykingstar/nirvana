import React from "react";

import { useAppContext } from "../AppContextProvider";

function formNoop(e) {
    e.preventDefault();
}

export default function LoginForm() {
    const { setSession, apiFetch } = useAppContext();

    const [identifier, setIdentifier] = React.useState("Content Management");
    const [password, setPassword] = React.useState("password");

    function requestJWT() {
        apiFetch("/auth/local", {
            method: "POST",
            body: JSON.stringify({
                identifier,
                password,
            }),
        })
            .then((x) => x.json())
            .then(setSession);
    }

    return (
        <form onSubmit={formNoop}>
            <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={requestJWT}>Login</button>
        </form>
    );
}
