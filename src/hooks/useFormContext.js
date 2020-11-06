import React from "react";

export const FormContext = React.createContext({
    state: { local: {}, remote: null },
    dispatch: () => {},
});

export function useFormField(prop, defaultState) {
    const [hasBeenUpdated, setHasBeenUpdated] = React.useState(false);

    const { state, dispatch } = React.useContext(FormContext);
    const { local, remote } = state;

    const subState = local?.[prop] ?? defaultState;
    const isThereDiff = remote?.[prop] !== subState;
    const changed = isThereDiff && hasBeenUpdated;

    const setState = React.useCallback(
        (updater, hasUpdated = true) => {
            if (hasUpdated) {
                setHasBeenUpdated(true);
            }

            const value =
                typeof updater === "function" ? updater(subState) : updater;

            dispatch({
                type: "SET_LOCAL",
                prop,
                value,
            });
        },
        [prop, subState],
    );

    return [subState, setState, changed, Boolean(remote)];
}

export function useSetRemoteFormData() {}

export function FormProvider({ children }) {
    const [state, dispatch] = React.useReducer(
        (state, action) => {
            switch (action.type) {
                case "LOAD":
                    return {
                        ...state,
                        local: action.data,
                        remote: action.data,
                    };

                case "RESET":
                    return {
                        ...state,
                        local: state.remote,
                    };

                case "SET_LOCAL":
                    return {
                        ...state,
                        local: {
                            ...state.local,
                            [action.prop]: action.value,
                        },
                    };

                default:
                    return state;
            }
        },
        { local: {}, remote: null },
    );

    return (
        <FormContext.Provider value={{ state, dispatch }}>
            {children}
        </FormContext.Provider>
    );
}
