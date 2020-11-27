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

function CityRow({ id, name, country, latitude, longitude }) {
    return (
        <React.Fragment>
            <FilterList.Cell>
                <EnvLink to={`/cities/edit/${id}`}>{id}</EnvLink>
            </FilterList.Cell>
            <FilterList.Cell>{name}</FilterList.Cell>
            <FilterList.Cell>
                <EnvLink to={`/countries/edit/${country.id}`}>
                    {country.name}
                </EnvLink>
            </FilterList.Cell>
            <FilterList.Cell>
                {latitude},{longitude}
            </FilterList.Cell>
        </React.Fragment>
    );
}

export default function FilterListCity() {
    return (
        <FilterList
            title="Cities"
            listApi="/cities"
            getDeleteApi={(id) => `/cities/${id}`}
            createRoute="/cities/create"
            HeaderComponent={CityHeader}
            FooterComponent={CityHeader}
            RowComponent={CityRow}
            rows={4}
            searchFilterColName="name"
        />
    );
}
