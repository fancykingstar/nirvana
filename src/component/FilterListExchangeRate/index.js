import React from "react";

import FilterList from "../FilterList";
import EnvLink from "../EnvLink";

function ExchangeRateHeader({ onChangeSort, sortBy, sortDirection }) {
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
                onClick={onChangeSort.bind(null, "exhange_rate")}
                arrowDirection={
                    sortBy === "exhange_rate" ? sortDirection : null
                }
            >
                Exchange Rate
            </FilterList.ControlCell>
            <FilterList.ControlCell width="30%">
                From Currency
            </FilterList.ControlCell>
            <FilterList.ControlCell width="30%">
                To Currency
            </FilterList.ControlCell>
        </React.Fragment>
    );
}

function ExchangeRateRow({ id, from_currency, to_currency, exchange_rate }) {
    return (
        <React.Fragment>
            <FilterList.Cell>
                <EnvLink to={`/exchange-rates/edit/${id}`}>{id}</EnvLink>
            </FilterList.Cell>

            <FilterList.Cell>{exchange_rate}</FilterList.Cell>
            <FilterList.Cell>{from_currency.currency_code}</FilterList.Cell>
            <FilterList.Cell>{to_currency.currency_code}</FilterList.Cell>
        </React.Fragment>
    );
}

export default function FilterListExchangeRate() {
    return (
        <FilterList
            title="Exchange Rates"
            listApi="/exchange-rates"
            getDeleteApi={(id) => `/exchange-rates/${id}`}
            createRoute="/exchange-rates/create"
            HeaderComponent={ExchangeRateHeader}
            FooterComponent={ExchangeRateHeader}
            RowComponent={ExchangeRateRow}
            rows={3}
        />
    );
}
