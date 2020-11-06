import React from "react";
import styled from "styled-components";
import "quill/dist/quill.snow.css";
import Quill from "quill";

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

            onChange(sanitized, false);
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

function EditRichText({ value, onChange, remoteLoaded }) {
    const editorRef = React.useRef();
    const quillRef = React.useRef();

    React.useEffect(() => {
        if (!editorRef.current) {
            return;
        }

        quillRef.current = new Quill(editorRef.current, {
            theme: "snow",
            clipboard: true,
            modules: {
                toolbar: [
                    ["bold", "italic", "underline", "strike"], // toggled buttons
                    ["blockquote", "code-block"],

                    [{ header: 1 }, { header: 2 }], // custom button values
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ script: "sub" }, { script: "super" }], // superscript/subscript
                    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                    [{ direction: "rtl" }], // text direction

                    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],

                    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                    [{ font: [] }],
                    [{ align: [] }],

                    ["clean"], // remove formatting button
                ],
            },
        });

        quillRef.current.on("text-change", () => {
            onChange(editorRef.current.querySelector(".ql-editor").innerHTML);
        });
    }, []);

    React.useEffect(() => {
        if (value !== null) {
            quillRef.current.clipboard.dangerouslyPasteHTML(0, value, "api");
        }
    }, [remoteLoaded]);

    return <div ref={editorRef} />;
}

export default function FormFieldRichText({ required, prop, label }) {
    const [state, setState, changed, remoteLoaded] = useFormField(prop, null);
    const [viewRaw, setViewRaw] = React.useState(false);

    return (
        <React.Fragment>
            <FormFieldLabel required={required}>{label}</FormFieldLabel>
            <FieldInput>
                {viewRaw ? (
                    <EditRawHTML value={state} onChange={setState} />
                ) : (
                    <EditRichText
                        value={state}
                        onChange={setState}
                        remoteLoaded={remoteLoaded}
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
