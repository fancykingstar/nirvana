import React from "react";
import { SWRConfig } from "swr";

import { useToast } from "../ToastProvider";
import { useAPIFetch } from "../AppContextProvider";

export default function SWRErrorProvider({ children }) {
    const fetcher = useAPIFetch();
    const { addToast } = useToast();

    const onError = (err, key) =>
        addToast({
            color: "red",
            title: "Error making request",
            message: `could not perform request: ${key}`,
        });

    return (
        <SWRConfig
            value={{
                fetcher,
                onError,
                shouldRetryOnError: false,
            }}
        >
            {children}
        </SWRConfig>
    );
}
