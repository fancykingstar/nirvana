import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

export default function EnvLink({ to, ...props }) {
    const {
        params: { env },
    } = useRouteMatch("/:env");

    const newTo = ["", env, to].join("/").replace(/\/+/g, "/");

    return <Link to={newTo} {...props} />;
}
