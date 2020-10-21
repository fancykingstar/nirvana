import React from "react";

import { FormContext } from "../../hooks/useFormContext";

import FormFieldLabel from "../FormFieldLabel";

export default function FormFieldDebug() {
    const {
        state: { local },
    } = React.useContext(FormContext);

    return (
        <React.Fragment>
            <FormFieldLabel>debug</FormFieldLabel>
            <code>
                <pre>{JSON.stringify(local, null, 2)}</pre>
            </code>
        </React.Fragment>
    );
}
