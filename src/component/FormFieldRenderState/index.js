import React from "react";

import { FormContext } from "../../hooks/useFormContext";

export default function FormFieldRenderState({ children, prop }) {
    const {
        state: { local },
    } = React.useContext(FormContext);

    if (prop) {
        return local[prop] ?? null;
    }

    return children(local);
}
