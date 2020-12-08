import React from "react";

import { useAppContext } from "../AppContextProvider";
import { useToast } from "../ToastProvider";

import classed from "../ClassedComponent";
import Button from "../Button";
import { KeyboardInboxBox } from "../Input";

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

const UnderConstruction = classed.div(
    "py-2",
    "px-4",
    "max-w-md",
    "text-center",
    "rounded",
    "shadow",
    "m-2",
    "border-red-500",
    "border-2",
    "bg-white",
    "text-red-500",
);

const LoginPane = classed.div(
    "p-2",
    "border",
    "border-gray-500",
    "rounded",
    "shadow",
);

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
            <UnderConstruction>
                This is the <strong>Alpha</strong> version of Nirvana.
                <br />
                Lots of the functionality and design is subject to change, and
                will be updated based on user requirements
            </UnderConstruction>
            <LoginPane>
                <Title>Login</Title>
                <Form onSubmit={formNoop}>
                    <Field>
                        <label className="pr-2">Username</label>
                        <KeyboardInboxBox
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                        />
                    </Field>
                    <Field>
                        <label className="pr-2">Password</label>
                        <KeyboardInboxBox
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Field>
                    <Field>
                        <Button color="green" onClick={requestJWT}>
                            Login
                        </Button>
                    </Field>
                </Form>
            </LoginPane>
        </LoginContainer>
    );
}
