import React from "react";
import qs from "qs";

import { useHistory } from "react-router-dom";

export default function useQueryStringState() {
    const { push, location } = useHistory();

    const state = React.useMemo(() => {
        const parsed = qs.parse(location.search.slice(1));

        return Object.fromEntries(
            Object.entries(parsed).map(([key, value]) => {
                if (Number.isNaN(Number(value))) {
                    return [key, value];
                } else {
                    return [key, Number(value)];
                }
            }),
        );
    }, [location.search]);

    const setState = React.useCallback(
        (updater) => {
            const newState =
                typeof updater === "function" ? updater(state) : updater;

            push({
                ...location,
                search: qs.stringify(newState),
            });
        },
        [state],
    );

    return [state, setState];
}
