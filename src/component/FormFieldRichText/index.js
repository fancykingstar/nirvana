import React from "react";
import styled from "styled-components";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

import { useFormField } from "../../hooks/useFormContext";

import FormFieldLabel from "../FormFieldLabel";
import classed from "../ClassedComponent";
import Button from "../Button";

const FieldChanged = styled.span`
    grid-column: updated / updated;
`;

const FieldInput = styled.div`
    padding: ${(p) => p.theme.size[0]};
    font-size: ${(p) => p.theme.text[2]};
    grid-column: input / input;
`;

const TextArea = classed.textarea(
    "h-20",
    "block",
    "w-full",
    "border",

    "border-2",
    "border-gray-400",
);

function EditRawHTML({ value, onChange }) {
    function cleanup() {
        try {
            const sanitized = new DOMParser().parseFromString(
                value,
                "text/html",
            ).body.innerHTML;

            onChange(sanitized);
        } catch (e) {
            console.error(e);
        }
    }

    React.useEffect(cleanup, []);

    return (
        <TextArea
            onBlur={cleanup}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}

export default function FormFieldRichText({ required, prop, label }) {
    const [state, setState, changed] = useFormField(prop, "");
    const [viewRaw, setViewRaw] = React.useState(false);

    return (
        <React.Fragment>
            <FormFieldLabel required={required}>{label}</FormFieldLabel>
            <FieldInput>
                {viewRaw ? (
                    <EditRawHTML value={state} onChange={setState} />
                ) : (
                    <ReactQuill
                        theme="snow"
                        value={state}
                        onChange={setState}
                    />
                )}
                <br />
                <Button onClick={setViewRaw.bind(null, (x) => !x)}>
                    view {viewRaw ? "formatted" : "html"}
                </Button>
            </FieldInput>

            {changed ? <FieldChanged>updated</FieldChanged> : null}
        </React.Fragment>
    );
}
