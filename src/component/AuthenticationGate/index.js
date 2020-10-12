import React from "react";
import jwtDecode from "jwt-decode";

import { useAppContext } from "../AppContextProvider";

import LoginForm from "../LoginForm";

export default function AuthenticationGate({ children }) {
    const { jwt, setJWT } = useAppContext();

    const jwtIsValid = React.useMemo(() => {
        if (jwt === null) {
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

    return (
        <div>
            {jwt === null ? "Please Login" : "Session Expired, Please Login"}

            <LoginForm setJWT={setJWT} />
        </div>
    );
}
