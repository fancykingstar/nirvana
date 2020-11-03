import * as React from "react";
import cn from "classnames";

import { useFormField } from "../../hooks/useFormContext";
import useStableRandomId from "../../hooks/useStableRandomId";

import FormFieldLabel from "../FormFieldLabel";

export default function FormFieldEnum({
    children,
    required,
    defaultValue,
    prop,
    label,
}) {
    const [state, setState, changed] = useFormField(prop, null);
    const id = useStableRandomId();

    React.useEffect(() => {
        if (state === null) {
            setState(defaultValue);
        }
    }, [state]);

    return (
        <React.Fragment>
            <FormFieldLabel htmlFor={id} required={required}>
                {label}
            </FormFieldLabel>
            <select
                className={cn(
                    "border-2",
                    "border-gray-400",
                    "form-field-grid-row-input",
                    "py-1",
                    "rounded",
                )}
                value={state}
                onChange={(e) => setState(e.target.value)}
            >
                {children}
            </select>

            {changed ? (
                <span className="form-field-grid-row-updated">updated</span>
            ) : null}
        </React.Fragment>
    );
}

FormFieldEnum.Option = function Option(props) {
    return <option {...props} />;
};
