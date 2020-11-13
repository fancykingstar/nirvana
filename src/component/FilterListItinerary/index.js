import React from "react";

import FilterList from "../FilterList";
import EnvLink from "../EnvLink";

function ItineraryHeader({ onChangeSort, sortBy, sortDirection }) {
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
            <FilterList.ControlCell width="30%">
                Number of Items
            </FilterList.ControlCell>
            <FilterList.ControlCell width="30%">
                Number of Days
            </FilterList.ControlCell>
        </React.Fragment>
    );
}

function ItineraryRow({ id, name, itinerary_items }) {
    return (
        <React.Fragment>
            <FilterList.Cell>
                <EnvLink to={`/itineraries/edit/${id}`}>{id}</EnvLink>
            </FilterList.Cell>
            <FilterList.Cell>{name}</FilterList.Cell>
            <FilterList.Cell>{itinerary_items.length}</FilterList.Cell>
            <FilterList.Cell>
                {itinerary_items.reduce(
                    (max, { end_day }) => (
                        console.log({ max, end_day }), Math.max(max, end_day)
                    ),
                    1,
                )}
            </FilterList.Cell>
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
            HeaderComponent={ItineraryHeader}
            FooterComponent={ItineraryHeader}
            RowComponent={ItineraryRow}
            rows={4}
            searchFilterColName="name"
        />
    );
}
