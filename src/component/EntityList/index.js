import React from "react";

import EnvLink from "../EnvLink";

export default function EntityList() {
    const links = [
        ["accommodation-grades", false],
        ["accommodations", false],
        ["airports", true],
        ["campaign-mappings", false],
        ["campaigns", false],
        ["cities", true],
        ["countries", true],
        ["currencies", true],
        ["departures", false],
        ["discounts", false],
        ["exchange-rates", true],
        ["itineraries", true],
        ["itinerary-items", true],
        ["menu-items", false],
        ["menus", false],
        ["offers", false],
        ["organisations", false],
        ["pages", false],
        ["ports", true],
        ["price-labels", false],
        ["prices", false],
        ["product-regions", false],
        ["product-types", false],
        ["products", false],
    ].map(([slug, exists]) => ({
        to: `/${slug}`,
        label: slug.replace("-", " "),
        className: exists ? "" : "line-through cursor-not-allowed",
    }));

    return (
        <nav className="p-2">
            <h1 className="text-3lx">Select a data type to view and edit it</h1>
            <ul className="list-disc pl-4">
                {links.map(({ to, label, className }) => (
                    <li key={to}>
                        <EnvLink className={className} to={to}>
                            {label}
                        </EnvLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
