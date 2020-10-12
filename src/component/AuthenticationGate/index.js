import React from "react";
import jwtDecode from "jwt-decode";

import { useAppContext } from "../AppContextProvider";

import LoginForm from "../LoginForm";

export default function AuthenticationGate({ children }) {
    const { session, setJWT } = useAppContext();

    const { jwt } = session;

    const jwtIsValid = React.useMemo(() => {
        if (!jwt) {
            return false;
        }

        const { exp } = jwtDecode(jwt);
        const now = new Date().getTime() / 1000;
        const valid = exp > now;

        return valid;
    }, [jwt]);

    if (jwtIsValid) {
        return children;
    }

    return <LoginForm setJWT={setJWT} />;
}
