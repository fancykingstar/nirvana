import React from "react";

import { useAppContext } from "../AppContextProvider";
import { useToast } from "../ToastProvider";

import classed from "../ClassedComponent";
import Button from "../Button";
import { KeyboardInputBox } from "../Input";

function formNoop(e) {
    e.preventDefault();
}

const LoginContainer = classed.div(
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

const LoginPane = classed.div();

const Title = classed.h3("text-lg", "font-bold", "p-2", "border-gray-500");

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
            <UnderConstruction className="hidden">
                This is the <strong>Alpha</strong> version of Nirvana.
                <br />
                Lots of the functionality and design is subject to change, and
                will be updated based on user requirements
            </UnderConstruction>
            <LoginPane className="login-form-bx rounded-lg mt-5 mb-5">
                <Title className="text-left text-black rounded-t-lg">
                    Login
                </Title>
                <Form className="p-3 mt-20" onSubmit={formNoop}>
                    <Field className="my-2">
                        <label className="pr-2">Username</label>
                        <KeyboardInputBox
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                        />
                    </Field>
                    <Field className="my-2">
                        <label className="pr-2">Password</label>
                        <KeyboardInputBox
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Field>
                    <Field>
                        <Button color="orange" onClick={requestJWT}>
                            Login
                        </Button>
                    </Field>
                </Form>
            </LoginPane>
        </LoginContainer>
    );
}
