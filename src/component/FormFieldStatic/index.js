import React from "react";

import { useFormField } from "../../hooks/useFormContext";

export default function FormFieldStatic({ prop, value }) {
    const [state, setState] = useFormField(prop);

    React.useEffect(() => {
        if (state !== value) {
            setState(value);
        }
    }, [state]);

    return null;
}
