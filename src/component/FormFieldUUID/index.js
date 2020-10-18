import React from "react";
import { nanoid } from "nanoid";

import { useFormField } from "../../hooks/useFormContext";

export default function FormFieldUUID({ prop }) {
    const setState = useFormField(prop)[1];

    React.useEffect(() => {
        setState(nanoid());
    }, []);

    return null;
}
