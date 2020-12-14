import React from "react";

import { useFormField } from "../../hooks/useFormContext";
import useStableRandomId from "../../hooks/useStableRandomId";

import FormFieldLabel from "../FormFieldLabel";
import { KeyboardInputBox } from "../Input";

export default function FormFieldLatLong({ required }) {
    const [latitude, setLatitude] = useFormField("latitude", "");
    const [longitude, setLongitude] = useFormField("longitude", "");

    const idLat = useStableRandomId();
    const idLong = useStableRandomId();

    return (
        <React.Fragment>
            <FormFieldLabel htmlFor={idLat} required={required}>
                Latitude
            </FormFieldLabel>
            <KeyboardInputBox
                id={idLat}
                className="form-field-grid-row-input"
                type="number"
                min={-90}
                max={90}
                step={0.00001}
                value={latitude}
                onChange={(e) => setLatitude(Number(e.target.value))}
            />

            <FormFieldLabel htmlFor={idLong} required={required}>
                Longitude
            </FormFieldLabel>
            <KeyboardInputBox
                id={idLong}
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
