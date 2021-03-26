import React from "react";
import useSWR from "swr";
import qs from "qs";

import useQueryStringState from "../../hooks/useQueryStringState";

import TitleBox from "../TitleBox";
import EnvLink from "../EnvLink";
import Button from "../Button";

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
                pageNumber: 1,
            })),
        [setState],
    );
}

export default function FilterList({
    cols,
    title,

    listApi,
    getDeleteApi,
    searchFilterColNames,

    createRoute,

    RowComponent,
    HeaderComponent,
    FooterComponent,
}) {
    const [state, setState] = useQueryStringState();

    const {
        pageNumber = 1,
        pageSize = 20,
        searchFilter = null,
        sortBy,
        sortDirection = "ASC",
    } = state;

    const onChangeSort = useOnChangeSort(setState);
    const setPageNumber = useSetPageNumber(setState);
    const setSearchFilter = useSetSearchFilter(setState);
    const [checked, setChecked] = React.useState({});

    function clearChecked() {
        setChecked({});
    }

    const colsToSearch = searchFilterColNames?.split(",") ?? [];

    const queryObj = {
        _where: { _or: [] },
    };

    colsToSearch.map((colName) => {
        const colNameContains = `${colName}_contains`;
        queryObj._where._or.push({ [colNameContains]: searchFilter });
    });

    //query utopia
    const { data, error } = useSWR(
        `${listApi}?${qs.stringify({
            _limit: pageSize,
            _start: (pageNumber - 1) * pageSize,

            ...(searchFilter ? queryObj : null),

            ...(sortBy
                ? {
                      _sort: `${sortBy}:${sortDirection}`,
                  }
                : null),
        })}`,
    );

    const { data: count } = useSWR(
        `${listApi}/count?${qs.stringify({
            ...(searchFilter ? queryObj : null),
        })}`,
    );

    if (error) {
        return null;
    }

    return (
        <TitleBox>
            <TitleBox.Header>
                <div className="flex-1">{title}</div>

                {createRoute ? (
                    <EnvLink to={createRoute} className="flex no-underline">
                        <Button color="green">Create New</Button>
                    </EnvLink>
                ) : null}
            </TitleBox.Header>
            <TitleBox.Body>
                <SearchFilter {...{ count, searchFilter, setSearchFilter }} />
                <PageNavigation
                    {...{ pageNumber, pageSize, count, setPageNumber }}
                />

                <DeleteSelected
                    {...{ clearChecked, checked, listApi, getDeleteApi }}
                />

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
                                    cols,
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
            </TitleBox.Body>
        </TitleBox>
    );
}

FilterList.Cell = Cell;
FilterList.ControlCell = ControlCell;
