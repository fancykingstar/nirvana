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

            <FilterList.ControlCell width="5%">Index</FilterList.ControlCell>

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
            <FilterList.ControlCell
                width="10%"
                onClick={onChangeSort.bind(null, "operator.name")}
                arrowDirection={
                    sortBy === "operator.name" ? sortDirection : null
                }
            >
                Operator
            </FilterList.ControlCell>
            <FilterList.ControlCell
                width="15%"
                onClick={onChangeSort.bind(null, "primary_accommodation.name")}
                arrowDirection={
                    sortBy === "primary_accommodation.name"
                        ? sortDirection
                        : null
                }
            >
                Primary Accommodation
            </FilterList.ControlCell>

            <FilterList.ControlCell width="10%">APIs</FilterList.ControlCell>
        </React.Fragment>
    );
}

function ProductRow({
    id,
    code,
    i,
    name,
    apis,
    operator,
    primary_accommodation,
}) {
    return (
        <React.Fragment>
            <FilterList.Cell>
                <EnvLink to={`/products/edit/${id}`}>{id}</EnvLink>
            </FilterList.Cell>

            <FilterList.Cell>{i}</FilterList.Cell>
            <FilterList.Cell>{code}</FilterList.Cell>
            <FilterList.Cell>{name}</FilterList.Cell>
            <FilterList.Cell>
                <EnvLink to={`/organisations/edit/${operator.id}`}>
                    {operator.name}
                </EnvLink>
            </FilterList.Cell>
            <FilterList.Cell>
                <EnvLink
                    to={`/accommodations/edit/${primary_accommodation.id}`}
                >
                    {primary_accommodation.name}
                </EnvLink>
            </FilterList.Cell>
            <FilterList.Cell>
                {apis.map((api) => api.code).join(", ")}
            </FilterList.Cell>
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
            cols={7}
            searchFilterColNames="name,code,id,apis.code,operator.name,primary_accommodation.name"
        />
    );
}
