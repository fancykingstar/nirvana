import React from "react";

import FilterList from "../FilterList";
import EnvLink from "../EnvLink";

function ProductHeader({ onChangeSort, sortBy, sortDirection }) {
    return (
        <React.Fragment>
            <FilterList.ControlCell
                width="10%"
                onClick={onChangeSort.bind(null, "id")}
                arrowDirection={sortBy === "id" ? sortDirection : null}
            >
                Id
            </FilterList.ControlCell>

            <FilterList.ControlCell width="10%">Index</FilterList.ControlCell>

            <FilterList.ControlCell width="10%">Active</FilterList.ControlCell>

            <FilterList.ControlCell
                width="10%"
                onClick={onChangeSort.bind(null, "code")}
                arrowDirection={sortBy === "code" ? sortDirection : null}
            >
                Code
            </FilterList.ControlCell>

            <FilterList.ControlCell
                width="40%"
                onClick={onChangeSort.bind(null, "name")}
                arrowDirection={sortBy === "name" ? sortDirection : null}
            >
                Name
            </FilterList.ControlCell>
        </React.Fragment>
    );
}

function ProductRow({ id, active, code, i, name }) {
    return (
        <React.Fragment>
            <FilterList.Cell>
                <EnvLink to={`/products/edit/${id}`}>{id}</EnvLink>
            </FilterList.Cell>

            <FilterList.Cell>{i}</FilterList.Cell>
            <FilterList.Cell>{active ? "✔️" : "❌"}</FilterList.Cell>
            <FilterList.Cell>{code}</FilterList.Cell>
            <FilterList.Cell>{name}</FilterList.Cell>
        </React.Fragment>
    );
}

export default function FilterListProduct() {
    return (
        <FilterList
            title="Products"
            listApi="/products"
            createRoute="/products/create"
            getDeleteApi={(id) => `/products/${id}`}
            HeaderComponent={ProductHeader}
            FooterComponent={ProductHeader}
            RowComponent={ProductRow}
            rows={5}
        />
    );
}
