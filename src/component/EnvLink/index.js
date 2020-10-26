import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import cn from "classnames";

export default function EnvLink({ to, className = "", ...props }) {
    const {
        params: { env },
    } = useRouteMatch("/:env");

    const newTo = ["", env, to].join("/").replace(/\/+/g, "/");

    return (
        <Link
            to={newTo}
            className={cn(
                "text-blue-600",
                "hover:text-blue-900",
                "underline",
                className,
            )}
            {...props}
        />
    );
}
