import React from "react";
import cn from "classnames";

import classed from "../ClassedComponent";

export default function TitleBox({ children }) {
    return (
        <div className="p-3">
            <div
                className={cn(
                    "border",
                    "flex",
                    "flex-col",
                    "items-stretch",
                    "rounded",
                    "shadow-lg",
                )}
            >
                {children}
            </div>
        </div>
    );
}

TitleBox.Header = classed.h1(
    "bg-blue-100",
    "bg-white",
    "px-2",
    "py-1",
    "rounded-t",
    "text-3xl",
    "text-black",
);
TitleBox.Body = classed.div("items-stretch", "flex", "flex-col", "p-3");
