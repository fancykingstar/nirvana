import React from "react";

import FilterList from "../FilterList";
import EnvLink from "../EnvLink";

function CurrencyHeader({ onChangeSort, sortBy, sortDirection }) {
    return (
        <React.Fragment>
            <FilterList.ControlCell
                width="10%"
                onClick={onChangeSort.bind(null, "id")}
                arrowDirection={sortBy === "id" ? sortDirection : null}
            >
                Id
            </FilterList.ControlCell>
            <FilterList.ControlCell
                width="30%"
                onClick={onChangeSort.bind(null, "currency_code")}
                arrowDirection={
                    sortBy === "currency_code" ? sortDirection : null
                }
            >
                Currency Code
            </FilterList.ControlCell>
            <FilterList.ControlCell
                width="30%"
                onClick={onChangeSort.bind(null, "symbol")}
                arrowDirection={sortBy === "symbol" ? sortDirection : null}
            >
                Symbol
            </FilterList.ControlCell>
        </React.Fragment>
    );
}

function CurrencyRow(props) {
    return (
        <React.Fragment>
            <FilterList.Cell>
                <EnvLink to={`/currencies/edit/${props.id}`}>
                    {props.id}
                </EnvLink>
            </FilterList.Cell>

            <FilterList.Cell>{props.currency_code}</FilterList.Cell>
            <FilterList.Cell>{props.symbol}</FilterList.Cell>
        </React.Fragment>
    );
}

export default function FilterListCurrency() {
    return (
        <FilterList
            title="Currencies"
            listApi="/currencies"
            getDeleteApi={(id) => `/currencies/${id}`}
            createRoute="/currencies/create"
            HeaderComponent={CurrencyHeader}
            FooterComponent={CurrencyHeader}
            RowComponent={CurrencyRow}
            rows={3}
        />
    );
}
