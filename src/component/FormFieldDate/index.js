import React from "react";

import { useFormField } from "../../hooks/useFormContext";
import useStableRandomId from "../../hooks/useStableRandomId";

import FormFieldLabel from "../FormFieldLabel";
import { KeyboardInputBox } from "../Input";

export default function FormFieldDate({ required, prop, label }) {
    const [state, setState] = useFormField(
        prop,
        new Date().toISOString().slice(0, 10),
    );
    const id = useStableRandomId();

    return (
        <React.Fragment>
            <FormFieldLabel htmlFor={id} required={required}>
                {label}
            </FormFieldLabel>
            <KeyboardInputBox
                id={id}
                className="form-field-grid-row-input"
                type="date"
                value={state}
                onChange={(e) => setState(e.target.value)}
            />
        </React.Fragment>
    );
}
