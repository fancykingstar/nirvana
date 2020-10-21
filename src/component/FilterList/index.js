import React from "react";
import useSWR from "swr";
import qs from "qs";

import useQueryStringState from "../../hooks/useQueryStringState";

import TitleBox, { TitleBoxPadder } from "../TitleBox";

import DeleteSelected from "./DeleteSelected";
import PageNavigation from "./PageNavigation";
import SearchFilter from "./SearchFilter";
import TableBody from "./TableBody";

import {
    LoadingOverlay,
    Cell,
    ControlCell,
    TableContainer,
    TableStyled,
} from "./styled";

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
    rows,
    title,
    listRoute,
    deleteRoute,

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
    const [checked, setChecked] = React.useState({});

    //query utopia
    const { data, error } = useSWR(
        `${listRoute}?${qs.stringify({
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
        `${listRoute}/count?${qs.stringify({
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
        <TitleBoxPadder>
            <TitleBox title={title}>
                <SearchFilter {...{ count, searchFilter, setSearchFilter }} />
                <PageNavigation
                    {...{ pageNumber, pageSize, count, setPageNumber }}
                />

                <DeleteSelected {...{ checked, listRoute, deleteRoute }} />

                <TableContainer>
                    <TableStyled>
                        <thead>
                            <tr>
                                <Cell width="1%"></Cell>

                                <HeaderComponent
                                    {...{ onChangeSort, sortBy, sortDirection }}
                                />
                            </tr>
                        </thead>
                        <tbody>
                            <TableBody
                                {...{
                                    rows,
                                    data,
                                    checked,
                                    setChecked,
                                    RowComponent,
                                    pageSize,
                                }}
                            />
                        </tbody>
                        <tfoot>
                            <tr>
                                <Cell width="1%"></Cell>
                                <FooterComponent
                                    {...{ onChangeSort, sortBy, sortDirection }}
                                />
                            </tr>
                        </tfoot>
                    </TableStyled>
                    {data ? null : (
                        <LoadingOverlay>
                            <div>Loading</div>
                        </LoadingOverlay>
                    )}
                </TableContainer>
            </TitleBox>
        </TitleBoxPadder>
    );
}

FilterList.Cell = Cell;
FilterList.ControlCell = ControlCell;
