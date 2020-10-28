import React from "react";

import { FormContext } from "../../hooks/useFormContext";

export default function FormFieldRenderState({ children }) {
    const {
        state: { local },
    } = React.useContext(FormContext);

    return children(local);
}
