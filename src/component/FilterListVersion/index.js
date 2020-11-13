import React from "react";

import FilterList from "../FilterList";
import EnvLink from "../EnvLink";

function VersionHeader({ onChangeSort, sortBy, sortDirection }) {
    return (
        <React.Fragment>
            <FilterList.ControlCell
                width="10%"
                onClick={onChangeSort.bind(null, "id")}
                arrowDirection={sortBy === "id" ? sortDirection : null}
            >
                Id
            </FilterList.ControlCell>

            <FilterList.ControlCell width="10%">Index</FilterList.ControlCell>

            <FilterList.ControlCell width="20%">Name</FilterList.ControlCell>

            <FilterList.ControlCell width="10%">
                No. of Departures
            </FilterList.ControlCell>

            <FilterList.ControlCell width="20%">
                Itinerary
            </FilterList.ControlCell>

            <FilterList.ControlCell width="20%">Product</FilterList.ControlCell>
        </React.Fragment>
    );
}

function VersionRow({
    id,
    i,
    name,
    itinerary,
    product,
    departures: { length: numberOfDepartures },
}) {
    return (
        <React.Fragment>
            <FilterList.Cell>
                <EnvLink to={`/versions/edit/${id}`}>{id}</EnvLink>
            </FilterList.Cell>

            <FilterList.Cell>{i}</FilterList.Cell>

            <FilterList.Cell>{name}</FilterList.Cell>

            <FilterList.Cell>{numberOfDepartures}</FilterList.Cell>

            <FilterList.Cell>
                <EnvLink to={`/itineraries/edit/${itinerary.id}`}>
                    {itinerary.name}
                </EnvLink>
            </FilterList.Cell>

            <FilterList.Cell>
                <EnvLink to={`/products/edit/${product.id}`}>
                    {product.name}
                </EnvLink>
            </FilterList.Cell>
        </React.Fragment>
    );
}

export default function FilterListVersion() {
    return (
        <FilterList
            title="Versions"
            listApi="/versions"
            createRoute="/versions/create"
            getDeleteApi={(id) => `/versions/${id}`}
            HeaderComponent={VersionHeader}
            FooterComponent={VersionHeader}
            RowComponent={VersionRow}
            rows={6}
            SearchFilterColName="name"
        />
    );
}
