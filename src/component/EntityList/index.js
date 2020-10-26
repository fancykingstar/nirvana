import React from "react";

import EnvLink from "../EnvLink";

export default function EntityList() {
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
        to: `/${slug}`,
        label: slug.replace("-", " "),
    }));

    return (
        <nav className="p-2">
            <h1 className="text-3lx">Select a data type to view and edit it</h1>
            <ul className="list-disc pl-4">
                {links.map(({ to, label }) => (
                    <li key={to}>
                        <EnvLink to={to}>{label}</EnvLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
