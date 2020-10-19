import React from "react";
import styled from "styled-components";

const FieldLabel = styled.label`
    font-size: ${(p) => p.theme.text[2]};
    padding-right: ${(p) => p.theme.size[2]};
    grid-column: label / label;
`;

const RequiredMarker = styled.div`
    color: ${(p) => p.theme.color.red};
    min-width: ${(p) => p.theme.size[2]};
    grid-column: required / required;
`;

export default function FormFieldLabel({ required, children }) {
    return (
        <React.Fragment>
            <FieldLabel>{children}</FieldLabel>
            {required ? <RequiredMarker>*</RequiredMarker> : null}
        </React.Fragment>
    );
}
