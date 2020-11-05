import React from "react";
import useSWR from "swr";

import FilterList from "../FilterList";
import EnvLink from "../EnvLink";

function ItineraryItemItemHeader({ onChangeSort, sortBy, sortDirection }) {
    return (
        <React.Fragment>
            <FilterList.ControlCell
                width="10%"
                onClick={onChangeSort.bind(null, "id")}
                arrowDirection={sortBy === "id" ? sortDirection : null}
            >
                Id
            </FilterList.ControlCell>

            <FilterList.ControlCell width="20%">
                Itinerary
            </FilterList.ControlCell>

            <FilterList.ControlCell
                width="20%"
                onClick={onChangeSort.bind(null, "name")}
                arrowDirection={sortBy === "name" ? sortDirection : null}
            >
                Name
            </FilterList.ControlCell>

            <FilterList.ControlCell
                width="10%"
                onClick={onChangeSort.bind(null, "start_day")}
                arrowDirection={sortBy === "start_day" ? sortDirection : null}
            >
                Days
            </FilterList.ControlCell>

            <FilterList.ControlCell width="10%">
                {" "}
                Coords{" "}
            </FilterList.ControlCell>
            <FilterList.ControlCell width="10%"> City </FilterList.ControlCell>
            <FilterList.ControlCell width="10%"> Port </FilterList.ControlCell>
            <FilterList.ControlCell width="10%"> Event </FilterList.ControlCell>
        </React.Fragment>
    );
}

function ItineraryItemItemRow({
    id,
    name,
    start_day,
    end_day,
    city,
    event,
    latitude,
    longitude,
    port,
    itinerary,
}) {
    const { data: cityData } = useSWR(city ? `/cities/${city.id}` : null);

    return (
        <React.Fragment>
            <FilterList.Cell>
                <EnvLink to={`/itinerary-items/edit/${id}`}>{id}</EnvLink>
            </FilterList.Cell>

            <FilterList.Cell>
                <EnvLink to={`/itineraries/edit/${itinerary?.id}`}>
                    {itinerary?.name}
                </EnvLink>
            </FilterList.Cell>

            <FilterList.Cell>{name}</FilterList.Cell>

            <FilterList.Cell>
                {start_day} - {end_day}
            </FilterList.Cell>

            <FilterList.Cell>
                {latitude && longitude ? `${latitude}, ${longitude}` : null}
            </FilterList.Cell>

            <FilterList.Cell>
                <EnvLink to={`/city/edit/${city?.id}`}>
                    {city?.name} ({cityData?.country?.name ?? "..."})
                </EnvLink>
            </FilterList.Cell>

            <FilterList.Cell>
                <EnvLink to={`/port/edit/${port?.id}`}>{port?.name}</EnvLink>
            </FilterList.Cell>

            <FilterList.Cell>
                <EnvLink to={`/event/edit/${event?.id}`}>{event?.name}</EnvLink>
            </FilterList.Cell>
        </React.Fragment>
    );
}

export default function FilterListItinarary() {
    return (
        <FilterList
            title="Itinarary Item"
            listApi="/itinerary-items"
            getDeleteApi={(id) => `/itinerary-items/${id}`}
            createRoute="/create/itinerary-items"
            HeaderComponent={ItineraryItemItemHeader}
            FooterComponent={ItineraryItemItemHeader}
            RowComponent={ItineraryItemItemRow}
            rows={8}
        />
    );
}
