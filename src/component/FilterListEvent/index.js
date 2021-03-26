import React from "react";

import FilterList from "../FilterList";
import EnvLink from "../EnvLink";

function EventHeader({ onChangeSort, sortBy, sortDirection }) {
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
        </React.Fragment>
    );
}

function EventRow({ id, name }) {
    return (
        <React.Fragment>
            <FilterList.Cell>
                <EnvLink to={`/events/edit/${id}`}>{id}</EnvLink>
            </FilterList.Cell>
            <FilterList.Cell>{name}</FilterList.Cell>
        </React.Fragment>
    );
}

export default function FilterListEvent() {
    return (
        <FilterList
            title="Events"
            listApi="/events"
            getDeleteApi={(id) => `/events/${id}`}
            createRoute="/events/create"
            HeaderComponent={EventHeader}
            FooterComponent={EventHeader}
            RowComponent={EventRow}
            cols={2}
            searchFilterColNames="name"
        />
    );
}
