import React from "react";
import FilterList from "../FilterList";
import EnvLink from "../EnvLink";

function AccommodationGradesHeader({ onChangeSort, sortBy, sortDirection }) {
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

            <FilterList.ControlCell width="40%">Label</FilterList.ControlCell>
        </React.Fragment>
    );
}

function AccommodationGradesRow(props) {
    return (
        <React.Fragment>
            <FilterList.Cell>
                <EnvLink to={`/accommodation-grades/edit/${props.id}`}>
                    {props.id}
                </EnvLink>
            </FilterList.Cell>
            <FilterList.Cell>{props.name}</FilterList.Cell>
            <FilterList.Cell>{props.label}</FilterList.Cell>
        </React.Fragment>
    );
}

export default function FilterListAccommodationGrades() {
    return (
        <FilterList
            title="Accommodation Grades"
            listApi="/accommodation-grades"
            createRoute="/accommodation-grades/create"
            getDeleteApi={(id) => `/accommodation-grades/${id}`}
            HeaderComponent={AccommodationGradesHeader}
            FooterComponent={AccommodationGradesHeader}
            RowComponent={AccommodationGradesRow}
            rows={4}
        />
    );
}
