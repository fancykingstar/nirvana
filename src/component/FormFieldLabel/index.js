import React from "react";

import classed from "../ClassedComponent";

const FieldLabel = classed.label("pr-2", "form-field-grid-row-label");

const RequiredMarker = classed.div(
    "text-red-700",
    "form-field-grid-row-required",
    "w-3",
);

export default function FormFieldLabel({ required, children }) {
    return (
        <React.Fragment>
            <FieldLabel>{children}</FieldLabel>
            {required ? <RequiredMarker>*</RequiredMarker> : null}
        </React.Fragment>
    );
}
