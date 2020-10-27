import React from "react";

import { useFormField } from "../../hooks/useFormContext";

import FormFieldLabel from "../FormFieldLabel";
import { KeyboardInboxBox } from "../Input";

export default function FormFieldNumber({ required, prop, label, ...props }) {
    const [state, setState, changed] = useFormField(prop, "");

    return (
        <React.Fragment>
            <FormFieldLabel required={required}>{label}</FormFieldLabel>
            <KeyboardInboxBox
                className="form-field-grid-row-input"
                {...props}
                type="number"
                value={state}
                onChange={(e) => setState(Number(e.target.value))}
            />

            {changed ? (
                <span className="form-field-grid-row-updated">updated</span>
            ) : null}
        </React.Fragment>
    );
}
