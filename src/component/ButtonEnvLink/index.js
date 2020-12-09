import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import Button from "../Button";

export default function ButtonEnvLink({ to, ...props }) {
    const {
        params: { env },
    } = useRouteMatch("/:env");

    const newTo = ["", env, to].join("/").replace(/\/+/g, "/");

    if (props.disabled) {
        return <Button {...props} />;
    } else {
        return (
            <Link to={newTo}>
                <Button {...props} />
            </Link>
        );
    }
}
