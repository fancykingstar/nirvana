import React from "react";
import { Link, useLocation } from "react-router-dom";

import classed from "../ClassedComponent";

const BreadcrumbContainer = classed.nav("flex", "p-2");

const BreadcrumbLink = classed(
    Link,
    "capitalize",
    "px-1",
    "block",
    "text-blue-700",
    "hover:text-blue-900",
    "hover:underline",
);

const BreadcrumbDivider = classed.div("font-bold", "text-black");

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
                <React.Fragment key={to}>
                    <BreadcrumbDivider>/</BreadcrumbDivider>
                    <BreadcrumbLink to={to}>{label}</BreadcrumbLink>
                </React.Fragment>
            ))}
        </BreadcrumbContainer>
    );
}
