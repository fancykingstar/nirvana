import React from "react";

import usePersistedState from "../../hooks/usePersistedState";

const NetworkEnvContext = React.createContext({});

export function useNetworkEnv() {
    return React.useContext(NetworkEnvContext);
}

export default function NetworkProvider({ children }) {
    const [apiEnv, setAPIEnv] = usePersistedState(
        {
            env: "prod",
            url: "https://prod.utopia.imaginecruising.net",
        },
        "api-env",
    );

    function updateEnv(env) {
        switch (env) {
            case "prod":
                return setAPIEnv({
                    env,
                    url: "https://prod.utopia.imaginecruising.net",
                });

            case "dev":
                return setAPIEnv({
                    env,
                    url: "https://dev.utopia.imaginecruising.net",
                });

            case "local":
                return setAPIEnv({
                    env,
                    url: "http://localhost:1337",
                });
        }
    }

    return (
        <NetworkEnvContext.Provider value={{ ...apiEnv, updateEnv }}>
            {children}
        </NetworkEnvContext.Provider>
    );
}
