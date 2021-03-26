import React from "react";

import classed from "../ClassedComponent";
import { ControlSectionContainer } from "./styled";

const PageNavigationLink = classed.span(
    "cursor-pointer",
    "p-1",
    "underline",
    ({ current }) => (current ? "text-red-500" : "text-color-blue"),
);

export default function PageNavigation({
    pageNumber = 1,
    pageSize = 1,
    count = 0,
    setPageNumber,
}) {
    if (count <= pageSize) {
        return null;
    }

    const firstPage = 1;
    const lastPage = Math.floor(count / pageSize);

    const localPages = new Array(5)
        .fill(null)
        .map((_, i) => pageNumber + i - 2)
        .filter((x) => firstPage < x && x < lastPage);

    return (
        <ControlSectionContainer>
            <PageNavigationLink
                onClick={setPageNumber.bind(null, firstPage)}
                current={firstPage === pageNumber}
            >
                {firstPage}
            </PageNavigationLink>

            {localPages[0] === firstPage + 1 ? null : "..."}

            {localPages.map((x) => (
                <PageNavigationLink
                    key={x}
                    onClick={setPageNumber.bind(null, x)}
                    current={x === pageNumber}
                >
                    {x}
                </PageNavigationLink>
            ))}

            {localPages[4] === lastPage - 1 ? null : "..."}

            <PageNavigationLink
                onClick={setPageNumber.bind(null, lastPage)}
                current={lastPage === pageNumber}
            >
                {lastPage}
            </PageNavigationLink>
        </ControlSectionContainer>
    );
}
