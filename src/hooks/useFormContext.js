import React from "react";

export const FormContext = React.createContext({
    local: {},
    remote: {},
    dispatch: () => {},
});

export function useFormField(prop, defaultState) {
    const { state, dispatch } = React.useContext(FormContext);
    const { local, remote } = state;

    const subState = local[prop] ?? defaultState;
    const changed = remote[prop] !== subState;

    const setState = React.useCallback(
        (value) => {
            dispatch({
                type: "SET_LOCAL",
                prop,
                value,
            });
        },
        [prop],
    );

    return [subState, setState, changed];
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
        { local: {}, remote: {} },
    );

    return (
        <FormContext.Provider value={{ state, dispatch }}>
            {children}
        </FormContext.Provider>
    );
}
