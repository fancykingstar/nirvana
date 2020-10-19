import React from "react";
import { mutate } from "swr";
import { useHistory } from "react-router-dom";

import { FormContext } from "../../hooks/useFormContext";

import { useAppContext, useAPIFetch } from "../AppContextProvider";
import { useToast } from "../ToastProvider";

function pathToFunction(path) {
    return ({ id, env }) => path.replace(":id", id).replace(":env", env);
}

export default function FormContentLoaderCreate({
    nameProp,

    createRoute,
    getRoute,
    listRoute,
    pushToEditRoute,

    children,
}) {
    const { env } = useAppContext();
    const fetcher = useAPIFetch();
    const { addToast, removeToast } = useToast();
    const { push } = useHistory();

    const {
        state: { local },
    } = React.useContext(FormContext);

    async function onCreate() {
        const startSaveToastId = addToast({
            title: "Creating",
            message: local[nameProp],
        });

        const response = await fetcher(pathToFunction(createRoute)({ id }), {
            method: "POST",
            body: JSON.stringify(local),
        });

        removeToast(startSaveToastId);

        addToast({
            color: "green",
            title: "Saved",
            timeout: 3000,
            message: local[nameProp],
        });

        const { id } = response;
        console.log({ response });

        mutate(pathToFunction(getRoute)({ id }));
        mutate(listRoute);

        push(pathToFunction(pushToEditRoute)({ env, id }));
    }

    return children({ onCreate });
}
