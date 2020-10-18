import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LinkStyled = styled(Link)``;

import { useAppContext } from "../AppContextProvider";

export default function EntityList() {
    const { env } = useAppContext();
    const links = [
        "accommodation-grades",
        "accommodations",
        "airports",
        "campaign-mappings",
        "campaigns",
        "cities",
        "countries",
        "currencies",
        "departures",
        "discounts",
        "exchange-rates",
        "itineraries",
        "itinerary-items",
        "menu-items",
        "menus",
        "offers",
        "organisations",
        "pages",
        "ports",
        "price-labels",
        "prices",
        "product-regions",
        "product-types",
        "products",
    ].map((slug) => ({
        to: `/${env}/${slug}`,
        label: slug.replace("-", " "),
    }));

    return (
        <nav>
            <h1>Select a data type to view and edit it</h1>
            <ul>
                {links.map(({ to, label }) => (
                    <li key={to}>
                        <LinkStyled to={to}>{label}</LinkStyled>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
