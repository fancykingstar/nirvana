import React from "react";
import EnvLink from "../EnvLink";

import FilterList from "../FilterList";

function CountryHeader({ onChangeSort, sortBy, sortDirection }) {
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
            <FilterList.ControlCell
                width="10%"
                onClick={onChangeSort.bind(null, "iso_2")}
                arrowDirection={sortBy === "iso_2" ? sortDirection : null}
            >
                ISO (2)
            </FilterList.ControlCell>
            <FilterList.ControlCell
                width="10%"
                onClick={onChangeSort.bind(null, "iso_3")}
                arrowDirection={sortBy === "iso_3" ? sortDirection : null}
            >
                ISO (3)
            </FilterList.ControlCell>
            <FilterList.ControlCell width="10%">
                Number of Cities
            </FilterList.ControlCell>
        </React.Fragment>
    );
}

function CountryRow(props) {
    return (
        <React.Fragment>
            <FilterList.Cell>
                <EnvLink to={`/countries/edit/${props.id}`}>{props.id}</EnvLink>
            </FilterList.Cell>
            <FilterList.Cell> {props.name} </FilterList.Cell>
            <FilterList.Cell> {props.iso_2} </FilterList.Cell>
            <FilterList.Cell> {props.iso_3} </FilterList.Cell>
            <FilterList.Cell> {props.cities.length} </FilterList.Cell>
        </React.Fragment>
    );
}

export default function FilterListCountries() {
    return (
        <FilterList
            title="Countries"
            listApi="/countries"
            getDeleteApi={(id) => `/countries/${id}`}
            createRoute="/countries/create"
            HeaderComponent={CountryHeader}
            FooterComponent={CountryHeader}
            RowComponent={CountryRow}
            cols={5}
            searchFilterColNames="name"
        />
    );
}
