import React from "react";
import EnvLink from "../EnvLink";

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

const Sidebar = () => {
    return (
        <div className="px-8 py-12">
            <div className="sidebar-menu-left">
                <ul>
                    <li className="mx-0 mt-0 mb-4">
                        <EnvLink to="/wizard/product">Manage Product</EnvLink>
                    </li>
                    {links.map(({ to, label, className }) => (
                        <li className="mx-0 mt-0 mb-4" key={to}>
                            <EnvLink className={className} to={to}>
                                {label}
                            </EnvLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
