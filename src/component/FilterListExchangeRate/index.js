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
            <FilterList.ControlCell
                width="30%"
                onClick={onChangeSort.bind(null, "from_currency")}
                arrowDirection={
                    sortBy === "from_currency" ? sortDirection : null
                }
            >
                From Currency
            </FilterList.ControlCell>
            <FilterList.ControlCell
                width="30%"
                onClick={onChangeSort.bind(null, "to_currency")}
                arrowDirection={sortBy === "to_currency" ? sortDirection : null}
            >
                To Currency
            </FilterList.ControlCell>
        </React.Fragment>
    );
}

function ExchangeRateRow(props) {
    return (
        <React.Fragment>
            <FilterList.Cell>
                <EnvLink to={`/exchange-rates/edit/${props.id}`}>
                    {props.id}
                </EnvLink>
            </FilterList.Cell>

            <FilterList.Cell>{props.exhange_rate}</FilterList.Cell>
            <FilterList.Cell>
                {props.from_currency.currency_code}
            </FilterList.Cell>
            <FilterList.Cell>{props.to_currency.currency_code}</FilterList.Cell>
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
