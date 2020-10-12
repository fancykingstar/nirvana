import React from "react";

import { useAppContext } from "../AppContextProvider";
import { useToast } from "../ToastProvider";

function formNoop(e) {
    e.preventDefault();
}

export default function LoginForm() {
    const { setSession, apiFetch } = useAppContext();
    const { addToast, removeToast } = useToast();

    const [identifier, setIdentifier] = React.useState("Content Management");
    const [password, setPassword] = React.useState("password");

    async function requestJWT() {
        const loginToastId = addToast({
            title: "Logging in",
        });

        const response = await apiFetch("/auth/local", {
            method: "POST",
            body: JSON.stringify({
                identifier,
                password,
            }),
        });

        removeToast(loginToastId);

        if (response.error) {
            return addToast({
                color: "red",
                title: response.error,
                timeout: 10000,
                message: response.message
                    .map(({ messages }) =>
                        messages.map((x) => x.message).join("\n"),
                    )
                    .join("\n"),
            });
        }

        addToast({
            color: "green",
            title: "Logged in",
            timeout: 30000,
            message: `Welcome, ${response.user.username}`,
        });

        setSession(response);
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
