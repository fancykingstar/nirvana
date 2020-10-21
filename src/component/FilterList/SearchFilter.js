import React from "react";

import { ControlSectionContainer } from "./styled";

export default function SearchFilter({ count, searchFilter, setSearchFilter }) {
    return (
        <ControlSectionContainer>
            <div>{count} entries matching current filter</div>
            <label htmlFor="filter-list-search-filter">Search:</label>
            <input
                id="filter-list-search-filter"
                type="text"
                value={searchFilter || ""}
                onChange={(e) => setSearchFilter(e.target.value)}
            />
        </ControlSectionContainer>
    );
}
