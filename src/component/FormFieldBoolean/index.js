import React from "react";

import { useFormField } from "../../hooks/useFormContext";

import FormFieldLabel from "../FormFieldLabel";

export default function FormFieldBoolean({ required, prop, label }) {
    const [state, setState, changed] = useFormField(prop);

    React.useEffect(() => {
        if (state === undefined) {
            setState(false);
        }
    }, []);

    return (
        <React.Fragment>
            <FormFieldLabel required={required}>{label}</FormFieldLabel>
            <input
                className="form-field-grid-row-input justify-self-start"
                type="checkbox"
                value={state}
                onChange={(e) => setState(e.target.value)}
            />

            {changed ? (
                <span className="form-field-grid-row-updated">updated</span>
            ) : null}
        </React.Fragment>
    );
}
