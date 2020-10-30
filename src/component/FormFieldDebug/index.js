import React from "react";

import { FormContext } from "../../hooks/useFormContext";

import FormFieldLabel from "../FormFieldLabel";

export default function FormFieldDebug() {
    const {
        state: { local },
    } = React.useContext(FormContext);

    //console.log(local);

    return null;
}
