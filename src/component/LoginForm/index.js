import React from "react";

import { useNetworkEnv } from "../NetworkProvider";

function formNoop(e) {
    e.preventDefault();
}

export default function LoginForm({ setJWT }) {
    const { url: networkEnvUrl } = useNetworkEnv();
    const [email, setEmail] = React.useState("developer@imaginecruising.co.uk");
    const [password, setPassword] = React.useState("Swordfish123!");

    async function requestJWT() {
        const {
            data: { token },
        } = await fetch(`${networkEnvUrl}/admin/login`, {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),

            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        }).then((x) => x.json());

        setJWT(token);
    }

    return (
        <form onSubmit={formNoop}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
