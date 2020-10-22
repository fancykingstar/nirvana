import React from "react";
import styled from "styled-components";

import { useFormField } from "../../hooks/useFormContext";

import FormFieldLabel from "../FormFieldLabel";

const FieldInput = styled.input`
    padding: ${(p) => p.theme.size[0]};
    border-radius: ${(p) => p.theme.size[0]};
    font-size: ${(p) => p.theme.text[2]};
    grid-column: input / input;
`;

export default function FormFieldLatLong({ required }) {
    const [latitude, setLatitude] = useFormField("latitude");
    const [longitude, setLongitude] = useFormField("longitude");

    return (
        <React.Fragment>
            <FormFieldLabel required={required}>Latitude</FormFieldLabel>
            <FieldInput
                type="number"
                min={-90}
                max={90}
                step={0.00001}
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
            />

            <FormFieldLabel required={required}>Longitude</FormFieldLabel>
            <FieldInput
                type="number"
                min={-180}
                max={180}
                step={0.00001}
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
            />
        </React.Fragment>
    );
}
