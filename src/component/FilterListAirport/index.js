import React from "react";

import FilterList from "../FilterList";
import EnvLink from "../EnvLink";

function AirportHeader({ onChangeSort, sortBy, sortDirection }) {
    return (
        <React.Fragment>
            <FilterList.ControlCell
                width="10%"
                onClick={onChangeSort.bind(null, "id")}
                arrowDirection={sortBy === "id" ? sortDirection : null}
            >
                Id
            </FilterList.ControlCell>
            <FilterList.ControlCell width="20%">
                Airport Code
            </FilterList.ControlCell>

            <FilterList.ControlCell
                width="20%"
                onClick={onChangeSort.bind(null, "name")}
                arrowDirection={sortBy === "name" ? sortDirection : null}
            >
                Name
            </FilterList.ControlCell>

            <FilterList.ControlCell width="20%">Coords</FilterList.ControlCell>

            <FilterList.ControlCell width="20%">City</FilterList.ControlCell>
        </React.Fragment>
    );
}

function AirportRow(props) {
    return (
        <React.Fragment>
            <FilterList.Cell>
                <EnvLink to={`/airports/edit/${props.id}`}>{props.id}</EnvLink>
            </FilterList.Cell>
            <FilterList.Cell>{props.airport_code}</FilterList.Cell>
            <FilterList.Cell>{props.name}</FilterList.Cell>
            <FilterList.Cell>
                {props.latitude}, {props.longitude}
            </FilterList.Cell>
            <FilterList.Cell>
                <EnvLink to={`/cities/edit/${props.city.id}`}>
                    {props.city.name}
                </EnvLink>
            </FilterList.Cell>
        </React.Fragment>
    );
}

export default function FilterListAirport() {
    return (
        <FilterList
            title="Airports"
            listRoute="/airports"
            deleteRoute={(id) => `/airports/${id}`}
            HeaderComponent={AirportHeader}
            FooterComponent={AirportHeader}
            RowComponent={AirportRow}
            rows={4}
        />
    );
}
