import React from "react";

import classed from "../ClassedComponent";

const FieldLabel = classed.label("pr-2", "text-orange-500");

const RequiredMarker = classed.div(
    "form-field-grid-row-required",
    "w-3",
    "text-orange-700",
    "text-md",
);

export default function FormFieldLabel({ required, children, htmlFor }) {
    return (
        <React.Fragment>
            <FieldLabel htmlFor={htmlFor}>{children}</FieldLabel>
            {required ? <RequiredMarker>*</RequiredMarker> : null}
        </React.Fragment>
    );
}
