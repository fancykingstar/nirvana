import React from "react";

import { FormContext } from "../../hooks/useFormContext";

export default function FormFieldOnChange({ onChange }) {
    const {
        state: { local },
    } = React.useContext(FormContext);

    React.useEffect(() => {
        onChange(local);
    }, [local]);

    return null;
}
