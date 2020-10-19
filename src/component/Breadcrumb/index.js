import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const BreadcrumbContainer = styled.nav`
    display: flex;
    padding: ${(p) => p.theme.size[1]};
`;

const BreadcrumbLink = styled(Link)`
    text-transform: capitalize;
    padding: 0 ${(p) => p.theme.size[1]};
    display: block;
    position: relative;

    &:before {
        position: absolute;
        bottom: 0;
        left: 0;
        content: "/";
        font-weight: bold;
        color: ${(p) => p.theme.color.black};
    }
`;

export default function Breadcrumb() {
    const { pathname } = useLocation();

    const environment = pathname.split("/")[1];

    const links = pathname
        .split("/")
        .slice(1)
        .reduce(
            (acc, val, i) => [
                ...acc,
                {
                    to: acc[i].to + "/" + val,
                    label: val,
                },
            ],
            [{ to: "" }],
        )
        .slice(2);

    return (
        <BreadcrumbContainer>
            <BreadcrumbLink to={`/${environment}`}>home</BreadcrumbLink>
            {links.map(({ to, label }) => (
                <BreadcrumbLink key={to} to={to}>
                    {label}
                </BreadcrumbLink>
            ))}
        </BreadcrumbContainer>
    );
}
