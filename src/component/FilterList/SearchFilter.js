import React from "react";

export default function SearchFilter({ searchFilter, setSearchFilter }) {
    return (
        <React.Fragment>
            <span>Search for Name:</span>
            <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
            />
        </React.Fragment>
    );
}
