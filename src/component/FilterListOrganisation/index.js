import React from "react";

import FilterList from "../FilterList";
import EnvLink from "../EnvLink";

function OrganisationHeader({ onChangeSort, sortBy, sortDirection }) {
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
                width="20%"
                onClick={onChangeSort.bind(null, "name")}
                arrowDirection={sortBy === "name" ? sortDirection : null}
            >
                Name
            </FilterList.ControlCell>
            <FilterList.ControlCell width="20%">Label</FilterList.ControlCell>
            <FilterList.ControlCell width="20%">
                Accomodations
            </FilterList.ControlCell>
            <FilterList.ControlCell width="20%">
                Products
            </FilterList.ControlCell>
        </React.Fragment>
    );
}

function OrganisationRow({ id, label, name, accommodations, products }) {
    return (
        <React.Fragment>
            <FilterList.Cell>
                <EnvLink to={`/organisations/edit/${id}`}>{id}</EnvLink>
            </FilterList.Cell>
            <FilterList.Cell> {name} </FilterList.Cell>
            <FilterList.Cell> {label} </FilterList.Cell>
            <FilterList.Cell> {accommodations.length} </FilterList.Cell>
            <FilterList.Cell> {products.length} </FilterList.Cell>
        </React.Fragment>
    );
}

export default function FilterListOrganisation() {
    return (
        <FilterList
            title="Organisations"
            listApi="/organisations"
            getDeleteApi={(id) => `/organisations/${id}`}
            createRoute="/organisations/create"
            HeaderComponent={OrganisationHeader}
            FooterComponent={OrganisationHeader}
            RowComponent={OrganisationRow}
            rows={5}
            searchFilterColName="name"
        />
    );
}
