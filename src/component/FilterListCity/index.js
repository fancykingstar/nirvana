import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import FilterList from "../FilterList";

function CityHeader({ onChangeSort, sortBy, sortDirection }) {
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
                onClick={onChangeSort.bind(null, "name")}
                arrowDirection={sortBy === "name" ? sortDirection : null}
            >
                Name
            </FilterList.ControlCell>
            <FilterList.ControlCell width="30%">City</FilterList.ControlCell>
            <FilterList.ControlCell
                width="30%"
                onClick={onChangeSort.bind(null, "latitude")}
                arrowDirection={sortBy === "latitude" ? sortDirection : null}
            >
                Coords
            </FilterList.ControlCell>
        </React.Fragment>
    );
}

function CityRow(props) {
    const {
        params: { env },
    } = useRouteMatch("/:env");

    return (
        <React.Fragment>
            <FilterList.Cell>
                <Link to={`/${env}/city/edit/${props.id}`}>{props.id}</Link>
            </FilterList.Cell>
            <FilterList.Cell>{props.name}</FilterList.Cell>
            <FilterList.Cell>
                <Link to={`/${env}/country/edit/${props.country.id}`}>
                    {props.country.name}
                </Link>
            </FilterList.Cell>
            <FilterList.Cell>
                {props.latitude},{props.longitude}
            </FilterList.Cell>
        </React.Fragment>
    );
}

export default function FilterListCity() {
    return (
        <FilterList
            title="Cities"
            entityUrl="/cities"
            HeaderComponent={CityHeader}
            FooterComponent={CityHeader}
            RowComponent={CityRow}
        />
    );
}
