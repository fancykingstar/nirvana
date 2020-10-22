import React from "react";

import FilterList from "../FilterList";
import EnvLink from "../EnvLink";

function PortHeader({ onChangeSort, sortBy, sortDirection }) {
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

            <FilterList.ControlCell width="20%">Coords</FilterList.ControlCell>

            <FilterList.ControlCell width="20%">City</FilterList.ControlCell>

            <FilterList.ControlCell width="20%">
                Nearest Airport
            </FilterList.ControlCell>
        </React.Fragment>
    );
}

function PortRow(props) {
    return (
        <React.Fragment>
            <FilterList.Cell>
                <EnvLink to={`/cities/edit/${props.id}`}>{props.id}</EnvLink>
            </FilterList.Cell>
            <FilterList.Cell>{props.name}</FilterList.Cell>
            <FilterList.Cell>
                {props.latitude}, {props.longitude}
            </FilterList.Cell>
            <FilterList.Cell>{props.city.name}</FilterList.Cell>
            <FilterList.Cell>{props.nearest_airport.name}</FilterList.Cell>
        </React.Fragment>
    );
}

export default function FilterListPort() {
    return (
        <FilterList
            title="Ports"
            listApi="/ports"
            getDeleteApi={(id) => `/ports/${id}`}
            createRoute="/ports/create"
            HeaderComponent={PortHeader}
            FooterComponent={PortHeader}
            RowComponent={PortRow}
            rows={4}
        />
    );
}
