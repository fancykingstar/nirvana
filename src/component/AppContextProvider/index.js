import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

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
    const history = useHistory();
    const {
        params: { env },
    } = useRouteMatch("/:env");

    const [session, setSession] = usePersistedState(
        {
            jwt: null,
        },
        `app-session-${env}`,
    );

    const value = React.useMemo(
        () => ({
            env,
            session,

            url: urls[env],

            setSession,

            setEnv: (env) => {
                const path = history.location.pathname.split("/");
                path[1] = env;
                const newPath = path.join("/");
                history.push(newPath);
            },

            apiFetch: (url, options = {}) =>
                fetch(`${urls[env]}${url}`, {
                    ...options,
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                        ...(session.jwt
                            ? {
                                  Authorization: `Bearer ${session.jwt}`,
                              }
                            : {}),

                        ...(options.headers || {}),
                    },
                })
                    .then((x) => x.json())
                    .catch(console.error),
        }),
        [env, session],
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
