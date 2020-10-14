import React from "react";
import useSWR, { mutate } from "swr";

import { FormContext } from "../../hooks/useFormContext";

import { useAPIFetch } from "../AppContextProvider";
import { useToast } from "../ToastProvider";

function pathToFunction(path) {
    return ({ id }) => path.replace(":id", id);
}

export default function FormEditableContentLoader({
    id,
    nameProp,
    getRoute,
    updateRoute,
    children,
}) {
    const {
        state: { local },
        dispatch,
    } = React.useContext(FormContext);

    const fetcher = useAPIFetch();
    const { addToast, removeToast } = useToast();

    const { data } = useSWR(pathToFunction(getRoute)({ id }), fetcher);

    React.useEffect(() => {
        if (data) {
            dispatch({ type: "LOAD", data });
        }
    }, [data]);

    function onReset() {
        if (data) {
            dispatch({ type: "LOAD", data });
        }
    }

    async function onSave() {
        const startSaveToastId = addToast({
            title: "Saving",
            message: local[nameProp],
        });

        mutate(pathToFunction(getRoute)({ id }), data, false);

        await fetcher(pathToFunction(updateRoute)({ id }), {
            method: "PUT",
            body: JSON.stringify(local),
        });

        removeToast(startSaveToastId);

        addToast({
            color: "green",
            title: "Saved",
            timeout: 3000,
            message: local[nameProp],
        });

        mutate(pathToFunction(getRoute)({ id }));
    }

    return children({ onReset, onSave });
}
