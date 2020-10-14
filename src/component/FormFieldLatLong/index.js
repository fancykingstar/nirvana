import React from "react";

import { useFormField } from "../../hooks/useFormContext";

export default function FormFieldLatLong({ required }) {
    const [latitude, setLatitude] = useFormField("latitude");
    const [longitude, setLongitude] = useFormField("longitude");

    return (
        <div>
            {required ? <span> *required </span> : null}
            <label>Latitude</label>
            <input
                type="number"
                min={-180}
                max={180}
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
            />

            <label>Longitude</label>
            <input
                type="number"
                min={-180}
                max={180}
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
            />
        </div>
    );
}
