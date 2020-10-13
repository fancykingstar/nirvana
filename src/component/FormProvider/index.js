import React from "react";
import useSWR, { mutate } from "swr";

import { useAPIFetch } from "../AppContextProvider";
import { useToast } from "../ToastProvider";

const FormContext = React.createContext([{}, () => {}]);

function pathToFunction(path) {
    return ({ id }) => path.replace(":id", id);
}

export function useFormField(prop, defaultState) {
    const { state, dispatch, data = {} } = React.useContext(FormContext);

    const subState = state[prop] ?? defaultState;
    const changed = data[prop] !== subState;

    const setState = React.useCallback(
        (value) => {
            dispatch({
                type: "SET",
                prop,
                value,
            });
        },
        [prop],
    );

    return [subState, setState, changed];
}

export default function FormProvider({
    id,
    nameProp,
    getRoute,
    updateRoute,
    children,
}) {
    const fetcher = useAPIFetch();
    const { addToast, removeToast } = useToast();

    const { data } = useSWR(pathToFunction(getRoute)({ id }), fetcher);

    const [state, dispatch] = React.useReducer((state, action) => {
        switch (action.type) {
            case "LOAD":
                return action.data;

            case "SET":
                return {
                    ...state,
                    [action.prop]: action.value,
                };

            default:
                return state;
        }
    }, {});

    React.useEffect(() => {
        if (data) {
            dispatch({
                type: "LOAD",
                data,
            });
        }
    }, [data]);

    async function onSave() {
        const startSaveToastId = addToast({
            title: "Saving",
            message: state[nameProp],
        });

        mutate(pathToFunction(getRoute)({ id }), data, false);

        await fetcher(pathToFunction(updateRoute)({ id }), {
            method: "PUT",
            body: JSON.stringify(state),
        });

        removeToast(startSaveToastId);

        addToast({
            color: "green",
            title: "Saved",
            timeout: 3000,
            message: state[nameProp],
        });

        mutate(pathToFunction(getRoute)({ id }));
    }

    return (
        <FormContext.Provider value={{ state, dispatch, data }}>
            <h1>{state[nameProp]}</h1>
            <aside>{state.id}</aside>
            <hr />
            {children}
            <hr />
            <button onClick={() => dispatch({ type: "LOAD", data })}>
                reset
            </button>
            <button onClick={onSave}>save</button>
        </FormContext.Provider>
    );
}
