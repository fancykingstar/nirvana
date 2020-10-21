import React from "react";
import useSWR from "swr";

import { FormContext } from "../../hooks/useFormContext";

import { useAPIFetch } from "../AppContextProvider";

export default function FormContentLoader({ getRoute, children }) {
    const { dispatch } = React.useContext(FormContext);

    const fetcher = useAPIFetch();

    const { data } = useSWR(getRoute, fetcher);

    React.useEffect(() => {
        if (data) {
            dispatch({ type: "LOAD", data });
        }
    }, [data]);

    return <React.Fragment>{children}</React.Fragment>;
}
