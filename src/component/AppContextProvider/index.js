import React from "react";
import jwtDecode from "jwt-decode";
import {
    Redirect,
    Route,
    Switch,
    useHistory,
    useRouteMatch,
} from "react-router-dom";

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
    const routeMatch = useRouteMatch("/:env");
    const [now, setNow] = React.useState(new Date().getTime() / 1000);

    const env = routeMatch?.params?.env ?? "prod";

    const [session, setSession] = usePersistedState(
        {
            jwt: null,
        },
        `app-session-${env}`,
    );

    React.useEffect(() => {
        const id = setInterval(() => {
            setNow(new Date().getTime() / 1000);
        }, 60 * 1000);

        return () => {
            clearTimeout(id);
        };
    }, []);

    React.useEffect(() => {
        const exp = session.jwt ? jwtDecode(session.jwt)?.exp : null;

        if (!exp) {
            return;
        }

        if (exp - 60 * 60 * 24 < now) {
            setSession({ jwt: null });
        }
    }, [session, now]);

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
                }).then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return response.json().then((x) => Promise.reject(x));
                    }
                }),
        }),
        [env, session],
    );

    return (
        <AppContext.Provider value={value}>
            {children}
            <Switch>
                <Route path="/prod" />
                <Route path="/dev" />
                <Route path="/local" />
                <Route>
                    <Redirect to="/prod" />
                </Route>
            </Switch>
        </AppContext.Provider>
    );
}
