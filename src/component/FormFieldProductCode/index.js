import React from "react";

import { useFormField } from "../../hooks/useFormContext";
import useStableRandomId from "../../hooks/useStableRandomId";

import FormFieldLabel from "../FormFieldLabel";
import Button from "../Button";
import { KeyboardInboxBox } from "../Input";

function randomChar() {
    return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
}
function randomDigit() {
    return Math.floor(Math.random() * 10);
}

export default function FormFieldProductCode({ required, prop, label }) {
    const [state, setState] = useFormField(prop, "");
    const id = useStableRandomId();

    function generateCode() {
        setState(
            [
                randomChar(),
                randomChar(),
                randomDigit(),
                randomDigit(),
                randomDigit(),
                randomDigit(),
            ].join(""),
        );
    }

    return (
        <React.Fragment>
            <FormFieldLabel htmlFor={id} required={required}>
                {label}
            </FormFieldLabel>
            <div className="form-field-grid-row-input">
                <Button onClick={generateCode}>Generate</Button>
                <KeyboardInboxBox
                    id={id}
                    type="text"
                    className="ml-2"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
            </div>
        </React.Fragment>
    );
}
