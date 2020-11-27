import React from "react";

import { useAppContext } from "../AppContextProvider";
import { useToast } from "../ToastProvider";

import classed from "../ClassedComponent";

function formNoop(e) {
    e.preventDefault();
}

const LoginContainer = classed.div(
    "flex",
    "flex-col",
    "flex-1",
    "items-center",
    "justify-center",
);

const LoginPane = classed.div("p-2", "border", "border-gray-500", "rounded");

const Title = classed.h3(
    "text-xl",
    "font-bold",
    "px-2",
    "py-1",
    "border",
    "border-gray-500",
);

const Form = classed.form("pt-1", "flex", "flex-col", "itmes-end");

const Field = classed.div("p-1");

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
        <LoginContainer>
            <LoginPane>
                <Title>Login</Title>
                <Form onSubmit={formNoop}>
                    <Field>
                        <label>Username</label>
                        <input
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                        />
                    </Field>
                    <Field>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Field>
                    <Field>
                        <button onClick={requestJWT}>Login</button>
                    </Field>
                </Form>
            </LoginPane>
        </LoginContainer>
    );
}
