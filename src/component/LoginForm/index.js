import React from "react";
import styled from "styled-components";

import { useAppContext } from "../AppContextProvider";
import { useToast } from "../ToastProvider";

function formNoop(e) {
    e.preventDefault();
}

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const LoginPane = styled.div`
    padding: ${(x) => x.theme.size[2]};
    border-color: ${(x) => x.theme.color.gray};
    border-width: 2px;
    border-style: solid;
    border-radius: ${(x) => x.theme.size[0]};
`;

const Title = styled.h3`
    font-size: ${(x) => x.theme.text[4]};
    font-weight: bold;
    padding: ${(x) => x.theme.size[2]} 0 ${(x) => x.theme.size[1]};
    border-color: ${(x) => x.theme.color.gray};
    border-width: 0;
    border-bottom-width: 2px;
    border-style: solid;
`;

const Form = styled.form`
    padding-top: ${(x) => x.theme.size[1]};
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const Field = styled.div`
    padding: ${(x) => x.theme.size[0]};
`;

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
