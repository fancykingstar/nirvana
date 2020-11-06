import React from "react";
import cn from "classnames";

import { useFormField } from "../../hooks/useFormContext";

import FormFieldLabel from "../FormFieldLabel";

export default function FormFieldBoolean({ required, prop, label }) {
    const [state, setState, changed] = useFormField(prop);

    React.useEffect(() => {
        if (state === undefined) {
            setState(false, false);
        }
    }, []);

    return (
        <React.Fragment>
            <FormFieldLabel required={required}>{label}</FormFieldLabel>
            <input
                className={cn(
                    "form-field-grid-row-input",
                    "justify-self-start p-3",
                    "border-2",
                    "border-gray-400",
                    "p-1",
                    "rounded",
                )}
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
