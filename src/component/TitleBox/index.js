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
                )}
            >
                {children}
            </div>
        </div>
    );
}

TitleBox.Header = classed.h1(
    "bg-nevy-500",
    "text-white",
    "flex",
    "items-center",
    "px-2",
    "py-1",
    "rounded-t",
    "sticky",
    "text-2xl",
    "text-black",
    "top-0",
);

TitleBox.Body = classed.div(
    "items-stretch",
    "flex",
    "flex-col",
    "p-3",
    "bg-white",
);
