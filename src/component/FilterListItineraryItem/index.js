import React from "react";

import FilterList from "../FilterList";
import EnvLink from "../EnvLink";

function ItineraryItemHeader({ onChangeSort, sortBy, sortDirection }) {
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

function ItineraryItemRow({ id, name }) {
    return (
        <React.Fragment>
            <FilterList.Cell>
                <EnvLink to={`/itinerary-item/edit/${id}`}>{id}</EnvLink>
            </FilterList.Cell>
            <FilterList.Cell>{name}</FilterList.Cell>
        </React.Fragment>
    );
}

export default function FilterListItinarary() {
    return (
        <FilterList
            title="Itinarary"
            listApi="/itineraries"
            getDeleteApi={(id) => `/itineraries/${id}`}
            createRoute="/create/itineraries"
            HeaderComponent={ItineraryItemHeader}
            FooterComponent={ItineraryItemHeader}
            RowComponent={ItineraryItemRow}
            rows={4}
        />
    );
}
