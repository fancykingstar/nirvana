import React from "react";
import useSWR from "swr";
import qs from "qs";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

import { useAPIFetch } from "../AppContextProvider";

const PageNavigationLinkStyled = styled(Link)`
    padding: ${(p) => p.theme.size[0]};
`;

function PageNavigationLink({ pageNumber, children }) {
    const location = useLocation();

    return (
        <PageNavigationLinkStyled
            to={{
                ...location,
                search: qs.stringify({
                    ...qs.parse(location.search.slice(1)),
                    pageNumber: pageNumber,
                }),
            }}
        >
            {children}
        </PageNavigationLinkStyled>
    );
}

function PageNavigation({ pageNumber, pageSize, count }) {
    const firstPage = 0;
    const lastPage = Math.floor(count / pageSize);

    const localPages = new Array(5)
        .fill(null)
        .map((_, i) => pageNumber + i - 2)
        .filter((x) => firstPage < x && x < lastPage);

    return (
        <div>
            <PageNavigationLink pageNumber={firstPage}>
                {firstPage}
            </PageNavigationLink>

            {localPages[0] === firstPage + 1 ? null : "..."}

            {localPages.map((x) => (
                <PageNavigationLink key={x} pageNumber={x}>
                    {x}
                </PageNavigationLink>
            ))}

            {localPages[4] === lastPage - 1 ? null : "..."}

            <PageNavigationLink pageNumber={lastPage}>
                {lastPage}
            </PageNavigationLink>
        </div>
    );
}

export default function FilterList({
    entityUrl,
    RowComponent,
    HeaderComponent,
    FooterComponent,
}) {
    const fetcher = useAPIFetch();
    const { search } = useLocation();

    const query = qs.parse(search.slice(1));

    const pageNumber = Number(query.pageNumber || 0);
    const pageSize = Number(query.pageSize || 20);

    const { data } = useSWR(
        `${entityUrl}?${qs.stringify({
            _limit: pageSize,
            _start: pageNumber * pageSize,
        })}`,
        fetcher,
    );

    const { data: count } = useSWR(
        `${entityUrl}/count?${qs.stringify({})}`,
        fetcher,
    );

    return (
        <React.Fragment>
            <div>{count} entries matching current filter</div>
            <PageNavigation {...{ pageNumber, pageSize, count }} />
            <table>
                <thead>
                    <HeaderComponent />
                </thead>
                <tbody>
                    {(data || []).map((x, i) => (
                        <tr key={x.id}>
                            <RowComponent i={i} {...x} />
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <FooterComponent />
                </tfoot>
            </table>
        </React.Fragment>
    );
}

FilterList.Cell = styled.td``;
