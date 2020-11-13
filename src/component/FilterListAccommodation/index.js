import React from "react";

import FilterList from "../FilterList";
import EnvLink from "../EnvLink";

function AccommodationHeader({ onChangeSort, sortBy, sortDirection }) {
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
                width="10%"
                onClick={onChangeSort.bind(null, "name")}
                arrowDirection={sortBy === "name" ? sortDirection : null}
            >
                Name
            </FilterList.ControlCell>

            <FilterList.ControlCell width="10%">
                Accommodation Types
            </FilterList.ControlCell>

            <FilterList.ControlCell width="10%">City</FilterList.ControlCell>

            <FilterList.ControlCell width="10%">
                Organisation
            </FilterList.ControlCell>
        </React.Fragment>
    );
}

function AccommodationRow({
    id,
    accommodation_type,
    city,
    name,
    organisation,
}) {
    return (
        <React.Fragment>
            <FilterList.Cell>
                <EnvLink to={`/accommodations/edit/${id}`}>{id}</EnvLink>
            </FilterList.Cell>

            <FilterList.Cell>{name}</FilterList.Cell>

            <FilterList.Cell>{accommodation_type}</FilterList.Cell>

            <FilterList.Cell>
                <EnvLink to={`/cities/edit/${city?.id}`}>{city?.name}</EnvLink>
            </FilterList.Cell>

            <FilterList.Cell>
                <EnvLink to={`/organisations/edit/${organisation?.id}`}>
                    {organisation?.name}
                </EnvLink>
            </FilterList.Cell>
        </React.Fragment>
    );
}

export default function FilterListAccommodation() {
    return (
        <FilterList
            title="accommodations"
            listApi="/accommodations"
            getDeleteApi={(id) => `/accommodations/${id}`}
            createRoute="/accommodations/create"
            HeaderComponent={AccommodationHeader}
            FooterComponent={AccommodationHeader}
            RowComponent={AccommodationRow}
            rows={5}
            searchFilterColName="name"
        />
    );
}
