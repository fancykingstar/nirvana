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

    createApi,
    getApi,
    listApi,
    getPushToEditRoute,

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

        const response = await fetcher(pathToFunction(createApi)({ id }), {
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

        mutate(pathToFunction(getApi)({ id }));
        mutate(listApi);

        push(pathToFunction(getPushToEditRoute)({ env, id }));
    }

    return children({ onCreate });
}
