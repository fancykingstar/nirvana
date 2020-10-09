import React from "react";

export default function usePersistedState(initialState, key) {
    const [state, setState] = React.useState(
        JSON.parse(localStorage.getItem(key) || JSON.stringify(initialState)),
    );

    React.useEffect(() => {
        setState(
            JSON.parse(
                localStorage.getItem(key) || JSON.stringify(initialState),
            ),
        );
    }, [key]);

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state]);

    return [state, setState];
}
