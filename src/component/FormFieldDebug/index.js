import React from "react";

import { FormContext } from "../../hooks/useFormContext";

export default function FormFieldDebug() {
    const {
        state: { local },
    } = React.useContext(FormContext);

    console.log(local);

    return null;
}
