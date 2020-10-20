import React from "react";
import styled from "styled-components";

import { useFormField } from "../../hooks/useFormContext";

import FormFieldLabel from "../FormFieldLabel";

const FieldChanged = styled.span`
    grid-column: updated / updated;
`;

const FieldInput = styled.input`
    padding: ${(p) => p.theme.size[0]};
    border-radius: ${(p) => p.theme.size[0]};
    font-size: ${(p) => p.theme.text[2]};
    grid-column: input / input;
`;

export default function FormFieldString({ required, prop, label }) {
    const [state, setState, changed] = useFormField(prop, "");

    return (
        <React.Fragment>
            <FormFieldLabel required={required}>{label}</FormFieldLabel>
            <FieldInput
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
            />

            {changed ? <FieldChanged>updated</FieldChanged> : null}
        </React.Fragment>
    );
}
