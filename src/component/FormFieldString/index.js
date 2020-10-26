import React from "react";
import styled from "styled-components";

import { useFormField } from "../../hooks/useFormContext";

import FormFieldLabel from "../FormFieldLabel";
import { KeyboardInboxBox } from "../Input";

const FieldChanged = styled.span`
    grid-column: updated / updated;
`;

export default function FormFieldString({ required, prop, label }) {
    const [state, setState, changed] = useFormField(prop, "");

    return (
        <React.Fragment>
            <FormFieldLabel required={required}>{label}</FormFieldLabel>
            <KeyboardInboxBox
                className="form-field-grid-row-input"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
            />

            {changed ? <FieldChanged>updated</FieldChanged> : null}
        </React.Fragment>
    );
}
