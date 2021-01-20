import React from "react";
import useSWR from "swr";

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
    const { data: cityData } = useSWR(
        props.city?.id ? `/cities/${props.city.id}` : null,
    );

    return (
        <React.Fragment>
            <FilterList.Cell>
                <EnvLink to={`/ports/edit/${props.id}`}>{props.id}</EnvLink>
            </FilterList.Cell>
            <FilterList.Cell>{props.name}</FilterList.Cell>
            <FilterList.Cell>
                {props.latitude}, {props.longitude}
            </FilterList.Cell>
            <FilterList.Cell>
                <EnvLink to={`/cities/edit/${props.city?.id}`}>
                    {props.city?.name} ({cityData?.country?.name ?? "..."})
                </EnvLink>
            </FilterList.Cell>
            <FilterList.Cell>
                <EnvLink to={`/cities/edit/${props.nearest_airport?.id}`}>
                    {props.nearest_airport?.name}
                </EnvLink>
            </FilterList.Cell>
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
            searchFilterColName="name"
        />
    );
}
