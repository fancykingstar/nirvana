import React from "react";
import styled from "styled-components";

const PageNavigationLink = styled.span`
    color: ${(p) => p.theme.color.blue};
    cursor: pointer;
    padding: ${(p) => p.theme.size[0]};
    text-decoration: underline;
`;

export default function PageNavigation({
    pageNumber = 0,
    pageSize = 1,
    count = 0,
    setPageNumber,
}) {
    const firstPage = 0;
    const lastPage = Math.floor(count / pageSize);

    const localPages = new Array(5)
        .fill(null)
        .map((_, i) => pageNumber + i - 2)
        .filter((x) => firstPage < x && x < lastPage);

    return (
        <div>
            <PageNavigationLink onClick={setPageNumber.bind(null, firstPage)}>
                {firstPage}
            </PageNavigationLink>

            {localPages[0] === firstPage + 1 ? null : "..."}

            {localPages.map((x) => (
                <PageNavigationLink
                    key={x}
                    onClick={setPageNumber.bind(null, x)}
                >
                    {x}
                </PageNavigationLink>
            ))}

            {localPages[4] === lastPage - 1 ? null : "..."}

            <PageNavigationLink onClick={setPageNumber.bind(null, lastPage)}>
                {lastPage}
            </PageNavigationLink>
        </div>
    );
}
