import React from "react";

import FilterList from "../FilterList";
import EnvLink from "../EnvLink";

function DepartureHeader({ onChangeSort, sortBy, sortDirection }) {
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
                onClick={onChangeSort.bind(null, "date")}
                arrowDirection={sortBy === "date" ? sortDirection : null}
            >
                Date
            </FilterList.ControlCell>

            <FilterList.ControlCell width="10%">
                Include in Search
            </FilterList.ControlCell>

            <FilterList.ControlCell width="30%">Version</FilterList.ControlCell>
        </React.Fragment>
    );
}

function DepartureRow({ id, date, include_in_serach, version }) {
    return (
        <React.Fragment>
            <FilterList.Cell>
                <EnvLink to={`/departures/edit/${id}`}>{id}</EnvLink>
            </FilterList.Cell>

            <FilterList.Cell>{date}</FilterList.Cell>

            <FilterList.Cell>
                {include_in_serach ? "yes" : "no"}
            </FilterList.Cell>

            <FilterList.Cell>
                <EnvLink to={`/versions/edit/${version?.id}`}>
                    {version?.name}
                </EnvLink>
            </FilterList.Cell>
        </React.Fragment>
    );
}

export default function FilterListDeparture() {
    return (
        <FilterList
            title="Departures"
            listApi="/departures"
            createRoute="/departures/create"
            getDeleteApi={(id) => `/departures/${id}`}
            HeaderComponent={DepartureHeader}
            FooterComponent={DepartureHeader}
            RowComponent={DepartureRow}
            rows={4}
            searchFilterColName="date"
        />
    );
}
