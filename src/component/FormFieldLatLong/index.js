import React from "react";

import { useFormField } from "../../hooks/useFormContext";

import FormFieldLabel from "../FormFieldLabel";
import { KeyboardInboxBox } from "../Input";

export default function FormFieldLatLong({ required }) {
    const [latitude, setLatitude] = useFormField("latitude");
    const [longitude, setLongitude] = useFormField("longitude");

    return (
        <React.Fragment>
            <FormFieldLabel required={required}>Latitude</FormFieldLabel>
            <KeyboardInboxBox
                className="form-field-grid-row-input"
                type="number"
                min={-90}
                max={90}
                step={0.00001}
                value={latitude}
                onChange={(e) => setLatitude(Number(e.target.value))}
            />

            <FormFieldLabel required={required}>Longitude</FormFieldLabel>
            <KeyboardInboxBox
                className="form-field-grid-row-input"
                type="number"
                min={-180}
                max={180}
                step={0.00001}
                value={longitude}
                onChange={(e) => setLongitude(Number(e.target.value))}
            />
        </React.Fragment>
    );
}
