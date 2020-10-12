import React from "react";

import usePersistedState from "../../hooks/usePersistedState";

const AppContext = React.createContext({});

const urls = {
    prod: "https://prod.utopia.imaginecruising.net",
    dev: "https://dev.utopia.imaginecruising.net",
    local: "http://localhost:1337",
};

export function useAppContext() {
    return React.useContext(AppContext);
}

export function useAPIFetch() {
    return React.useContext(AppContext).apiFetch;
}

export default function AppContextProvider({ children }) {
    const [appContext, setAppContext] = usePersistedState(
        {
            env: "prod",
            jwt: {},
        },
        "api-env",
    );

    const value = React.useMemo(
        () => ({
            ...appContext,

            jwt: appContext.jwt[appContext.env] || null,
            url: urls[appContext.env],

            setJWT: (jwt) =>
                setAppContext((appContext) => ({
                    ...appContext,
                    jwt,
                })),

            setEnv: (env) =>
                setAppContext((appContext) => ({
                    ...appContext,
                    env,
                })),

            apiFetch: (url, options) =>
                fetch([appContext.url, url].join("/"), {
                    ...options,
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                        ...options.headers,
                    },
                }),
        }),
        [appContext],
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
