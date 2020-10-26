import React from "react";

import { useFormField } from "../../hooks/useFormContext";

import FormFieldLabel from "../FormFieldLabel";
import { KeyboardInboxBox } from "../Input";

export default function FormFieldString({ required, prop, label }) {
    const [state, setState, changed] = useFormField(prop, "");

    return (
        <React.Fragment>
            <FormFieldLabel required={required}>{label}</FormFieldLabel>
            <KeyboardInboxBox
                className="form-field-grid-row-input"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
            />

            {changed ? (
                <span className="form-field-grid-row-updated">updated</span>
            ) : null}
        </React.Fragment>
    );
}
