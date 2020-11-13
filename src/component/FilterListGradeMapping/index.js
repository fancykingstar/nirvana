import React from "react";

import FilterList from "../FilterList";
import EnvLink from "../EnvLink";

function GradeMappingHeader({ onChangeSort, sortBy, sortDirection }) {
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

function GradeMappingRow({ id, name }) {
    return (
        <React.Fragment>
            <FilterList.Cell>
                <EnvLink to={`/grade-mappings/edit/${id}`}>{id}</EnvLink>
            </FilterList.Cell>
            <FilterList.Cell>{name}</FilterList.Cell>
        </React.Fragment>
    );
}

export default function FilterListGradeMapping() {
    return (
        <FilterList
            title="Grade Mappings"
            listApi="/grade-mappings"
            getDeleteApi={(id) => `/grade-mappings/${id}`}
            createRoute="/grade-mappings/create"
            HeaderComponent={GradeMappingHeader}
            FooterComponent={GradeMappingHeader}
            RowComponent={GradeMappingRow}
            rows={2}
            SearchFilterColName="name"
        />
    );
}
