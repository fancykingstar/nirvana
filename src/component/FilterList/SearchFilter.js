import React from "react";

import { ControlSectionContainer } from "./styled";

import { KeyboardInputBox } from "../Input";

export default function SearchFilter({ count, searchFilter, setSearchFilter }) {
    return (
        <ControlSectionContainer>
            <div>{count} entries matching current filter</div>
            <label className="pr-2" htmlFor="filter-list-search-filter">
                Search:
            </label>
            <KeyboardInputBox
                id="filter-list-search-filter"
                type="text"
                value={searchFilter || ""}
                onChange={(e) => setSearchFilter(e.target.value)}
            />
        </ControlSectionContainer>
    );
}
