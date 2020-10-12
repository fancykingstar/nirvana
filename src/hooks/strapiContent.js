import useSWR from "swr";

import { useAPIFetch } from "../component/AppContextProvider";

function useFetcher() {
    const apiFetch = useAPIFetch();

    return (url, options) => {
        return apiFetch(url, options);
    };
}

function createEntityApis({ getAll, get }) {
    return {
        getAll: (
            { pageSize, page } = {
                pageSize: 100,
                page: 0,
            },
        ) => {
            const fetcher = useFetcher();

            return useSWR(
                `${getAll}?_start=${page * pageSize}&_limit=${pageSize}`,
                fetcher,
            );
        },

        get: (id, { condition } = {}) => {
            const fetcher = useFetcher();

            const shouldFetch = condition || condition !== null;

            return useSWR(shouldFetch ? get(id) : null, fetcher);
        },
    };
}

export const useCity = createEntityApis({
    getAll: "/cities",
    get: (id) => `/cities/${id}`,
});
