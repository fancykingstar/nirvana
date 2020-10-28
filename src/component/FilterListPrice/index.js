import React from "react";

import FilterList from "../FilterList";
import EnvLink from "../EnvLink";

function PriceHeader({ onChangeSort, sortBy, sortDirection }) {
    return (
        <React.Fragment>
            <FilterList.ControlCell
                width="10%"
                onClick={onChangeSort.bind(null, "id")}
                arrowDirection={sortBy === "id" ? sortDirection : null}
            >
                Id
            </FilterList.ControlCell>

            <FilterList.ControlCell width="10%">
                Currency
            </FilterList.ControlCell>

            <FilterList.ControlCell
                width="20%"
                onClick={onChangeSort.bind(null, "now_price")}
                arrowDirection={sortBy === "now_price" ? sortDirection : null}
            >
                Now Price
            </FilterList.ControlCell>

            <FilterList.ControlCell
                width="20%"
                onClick={onChangeSort.bind(null, "was_price")}
                arrowDirection={sortBy === "was_price" ? sortDirection : null}
            >
                Was Price
            </FilterList.ControlCell>

            <FilterList.ControlCell
                width="20%"
                onClick={onChangeSort.bind(null, "generic_price")}
                arrowDirection={
                    sortBy === "generic_price" ? sortDirection : null
                }
            >
                Generic Price
            </FilterList.ControlCell>

            <FilterList.ControlCell width="10%">
                Sold Out
            </FilterList.ControlCell>
        </React.Fragment>
    );
}

function PriceRow({
    id,

    currency,
    now_price,
    was_price,
    sold_out,
    generic_price,
}) {
    return (
        <React.Fragment>
            <FilterList.Cell>
                <EnvLink to={`/prices/edit/${id}`}>{id}</EnvLink>
            </FilterList.Cell>
            <FilterList.Cell>
                <EnvLink to={`/currencies/edit/${currency.id}`}>
                    {currency.name}
                </EnvLink>
            </FilterList.Cell>
            <FilterList.Cell>{now_price}</FilterList.Cell>
            <FilterList.Cell>{was_price}</FilterList.Cell>
            <FilterList.Cell>{generic_price}</FilterList.Cell>
            <FilterList.Cell>{sold_out ? "Yes" : "No"}</FilterList.Cell>
        </React.Fragment>
    );
}

export default function FilterListPrice() {
    return (
        <FilterList
            title="Prices"
            listApi="/prices"
            getDeleteApi={(id) => `/prices/${id}`}
            createRoute="/prices/create"
            HeaderComponent={PriceHeader}
            FooterComponent={PriceHeader}
            RowComponent={PriceRow}
            rows={6}
        />
    );
}
