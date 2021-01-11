import React from "react";

import EnvLink from "../EnvLink";

export default function EntityList() {
    const links = [
        ["accommodation-grades", true],
        ["accommodations", true],
        ["airports", true],
        ["campaign-mappings", false],
        ["campaigns", false],
        ["cities", true],
        ["countries", true],
        ["currencies", true],
        ["departures", true],
        ["discounts", false],
        ["events", true],
        ["exchange-rates", true],
        ["grade-mappings", true],
        ["itineraries", true],
        ["itinerary-items", true],
        ["menu-items", false],
        ["menus", false],
        ["offers", false],
        ["organisations", true],
        ["pages", false],
        ["ports", true],
        ["price-labels", false],
        ["prices", true],
        ["product-regions", false],
        ["products", true],
    ].map(([slug, exists]) => ({
        to: `/${slug}`,
        label: slug.replace("-", " "),
        className: exists ? "" : "line-through cursor-not-allowed",
    }));

    return (
        <nav className="p-2">
            <h1 className="text-xl">Go to a wizard</h1>
            <ul className="list-disc pl-4">
                <li>
                    <EnvLink to="/wizard/product">Product</EnvLink>
                </li>
            </ul>

            <hr />

            <h1 className="text-xl">Select a data type to view and edit it</h1>
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
