import React from "react";
import useSWR from "swr";
import qs from "qs";
import styled from "styled-components";

import useQueryStringState from "../../hooks/useQueryStringState";

import PageNavigation from "./PageNavigation";
import SearchFilter from "./SearchFilter";

const TableStyled = styled.table`
    width: 100%;
`;

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

function useSetSearchFilter(setState) {
    return React.useCallback(
        (searchFilter) =>
            setState((state) => ({
                ...state,
                searchFilter,
                pageNumber: 0,
            })),
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
        searchFilter = null,
        sortBy,
        sortDirection = "ASC",
    } = state;

    const onChangeSort = useOnChangeSort(setState);
    const setPageNumber = useSetPageNumber(setState);
    const setSearchFilter = useSetSearchFilter(setState);

    // query utopia
    const { data, error } = useSWR(
        `${entityUrl}?${qs.stringify({
            _limit: pageSize,
            _start: pageNumber * pageSize,

            ...(searchFilter
                ? {
                      _where: [{ name_contains: searchFilter }],
                  }
                : null),

            ...(sortBy
                ? {
                      _sort: `${sortBy}:${sortDirection}`,
                  }
                : null),
        })}`,
    );

    const { data: count } = useSWR(
        `${entityUrl}/count?${qs.stringify({
            ...(searchFilter
                ? {
                      _where: [{ name_contains: searchFilter }],
                  }
                : null),
        })}`,
    );

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

            <SearchFilter {...{ searchFilter, setSearchFilter }} />

            <TableStyled>
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
            </TableStyled>
        </React.Fragment>
    );
}

FilterList.Cell = styled.td``;
FilterList.ControlCell = styled.td`
    position: relative;
    width: ${(p) => p.width};

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
