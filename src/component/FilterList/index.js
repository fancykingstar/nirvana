import React from "react";
import useSWR from "swr";
import qs from "qs";
import styled from "styled-components";

import useQueryStringState from "../../hooks/useQueryStringState";

import PageNavigation from "./PageNavigation";

function useSetPageNumber(setState) {
    return React.useCallback(
        (pageNumber) =>
            setState((state) => ({
                ...state,
                pageNumber,
            })),
        [setState],
    );
}

function useOnChangeSort(setState) {
    return React.useCallback(
        (key) =>
            setState((state) => {
                const { sortBy, sortDirection } = state;
                if (sortBy !== key) {
                    return {
                        ...state,
                        sortBy: key,
                        sortDirection: "ASC",
                    };
                }

                if (sortDirection === "ASC") {
                    return {
                        ...state,
                        sortBy: key,
                        sortDirection: "DESC",
                    };
                }

                const newState = { ...state };
                delete newState.sortBy;
                delete newState.sortDirection;

                return newState;
            }),
        [setState],
    );
}

export default function FilterList({
    title,
    entityUrl,
    RowComponent,
    HeaderComponent,
    FooterComponent,
}) {
    const [state, setState] = useQueryStringState();

    const {
        pageNumber = 0,
        pageSize = 20,
        sortBy,
        sortDirection = "ASC",
    } = state;

    const setPageNumber = useSetPageNumber(setState);
    const onChangeSort = useOnChangeSort(setState);

    // query utopia
    const { data, error } = useSWR(
        `${entityUrl}?${qs.stringify({
            _limit: pageSize,
            _start: pageNumber * pageSize,

            ...(sortBy
                ? {
                      _sort: `${sortBy}:${sortDirection}`,
                  }
                : null),
        })}`,
    );

    const { data: count } = useSWR(`${entityUrl}/count?${qs.stringify({})}`);

    if (error) {
        return null;
    }

    return (
        <React.Fragment>
            <h1>{title}</h1>
            <div>{count} entries matching current filter</div>
            <PageNavigation
                {...{ pageNumber, pageSize, count, setPageNumber }}
            />
            <table>
                <thead>
                    <tr>
                        <HeaderComponent
                            {...{ onChangeSort, sortBy, sortDirection }}
                        />
                    </tr>
                </thead>
                <tbody>
                    {(data || []).map((x, i) => (
                        <tr key={x.id}>
                            <RowComponent i={i} {...x} />
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <FooterComponent
                            {...{ onChangeSort, sortBy, sortDirection }}
                        />
                    </tr>
                </tfoot>
            </table>
        </React.Fragment>
    );
}

FilterList.Cell = styled.td``;
FilterList.ControlCell = styled.td`
    position: relative;

    &:after {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        ${({ arrowDirection }) => {
            if (arrowDirection === "ASC") {
                return `content: "▲"`;
            }

            if (arrowDirection === "DESC") {
                return `content: "▼"`;
            }

            return "";
        }};
    }
`;
