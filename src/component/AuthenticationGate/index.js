import React from "react";
import jwtDecode from "jwt-decode";

import { useNetworkEnv } from "../NetworkProvider";

import LoginForm from "../LoginForm";

import usePersistedState from "../../hooks/usePersistedState";

export default function AuthenticationGate({ children }) {
    const { env: networkEnv } = useNetworkEnv();
    const [jwt, setJWT] = usePersistedState(null, `${networkEnv}-jwt`);

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
