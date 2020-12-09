import React from "react";

export const FormContext = React.createContext({
    state: { local: {}, remote: {} },
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
                path: [prop],
                value,
            });
        },
        [prop, subState],
    );

    return [subState, setState, changed, Boolean(remote?.[prop])];
}

function assocPath([head, ...tail], value, object) {
    if (head === undefined) {
        return value;
    }

    if (typeof head === "number") {
        const newArr = [...(object ?? [])];
        newArr[head] = assocPath(tail, value, object?.[head]);
        return newArr;
    }

    return {
        ...object,
        [head]: assocPath(tail, value, object?.[head]),
    };
}

export function SubFormProvider({ prop, defaultValue = null, children }) {
    const parentContext = React.useContext(FormContext);

    const state = {
        local: parentContext.state.local?.[prop] ?? defaultValue,
        remote: parentContext.state.remote?.[prop] ?? defaultValue,
    };

    function dispatch(action) {
        parentContext.dispatch({
            ...action,
            ...(action.path
                ? {
                      path: [prop, ...action.path],
                  }
                : null),
        });
    }

    return (
        <FormContext.Provider value={{ state, dispatch }}>
            {children}
        </FormContext.Provider>
    );
}

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
                    return assocPath(
                        ["local", ...(action.path ?? [])],
                        action.value,
                        state,
                    );

                case "SET_REMOTE":
                    return assocPath(
                        ["remote", ...(action.path ?? [])],
                        action.value,
                        state,
                    );

                default:
                    return state;
            }
        },
        { local: {}, remote: {} },
    );

    return (
        <FormContext.Provider value={{ state, dispatch }}>
            {children}
        </FormContext.Provider>
    );
}
