import React from "react";

import { useFormField } from "../FormProvider";

export default function FormFieldString({ required, prop, label }) {
    const [state, setState, changed] = useFormField(prop, "");

    return (
        <div>
            {required ? <span> *required </span> : null}
            <label>{label}</label>
            <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
            />

            {changed ? <aside>updated</aside> : null}
        </div>
    );
}
