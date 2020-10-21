import React from "react";

import FilterList from "../FilterList";
import EnvLink from "../EnvLink";

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
            <FilterList.ControlCell width="30%">Country</FilterList.ControlCell>
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
    return (
        <React.Fragment>
            <FilterList.Cell>
                <EnvLink to={`/cities/edit/${props.id}`}>{props.id}</EnvLink>
            </FilterList.Cell>
            <FilterList.Cell>{props.name}</FilterList.Cell>
            <FilterList.Cell>
                <EnvLink to={`/countries/edit/${props.country.id}`}>
                    {props.country.name}
                </EnvLink>
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
            rows={4}
        />
    );
}
