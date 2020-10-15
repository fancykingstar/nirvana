import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import FilterList from "../FilterList";

function CityHeader() {
    return (
        <React.Fragment>
            <FilterList.Cell>Id</FilterList.Cell>
            <FilterList.Cell>Name</FilterList.Cell>
            <FilterList.Cell>City</FilterList.Cell>
            <FilterList.Cell>Coords</FilterList.Cell>
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
