import React from "react";
import useSWR from "swr";

import { FormContext } from "../../hooks/useFormContext";

import { useAPIFetch } from "../AppContextProvider";

export default function FormContentLoader({ getApi, children }) {
    const { dispatch } = React.useContext(FormContext);

    const fetcher = useAPIFetch();

    const { data } = useSWR(getApi, fetcher);

    React.useEffect(() => {
        if (data) {
            dispatch({ type: "LOAD", data });
        }
    }, [data]);

    return <React.Fragment>{children}</React.Fragment>;
}
