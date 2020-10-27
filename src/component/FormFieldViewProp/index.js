import React from "react";

import { useFormField } from "../../hooks/useFormContext";

export default function FormFieldViewProp({ prop }) {
    const [state] = useFormField(prop);

    return <React.Fragment>{state}</React.Fragment>;
}
