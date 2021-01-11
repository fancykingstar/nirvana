import React from "react";
import { Widget } from "react-cloudinary-upload-widget";

import { useFormField } from "../../hooks/useFormContext";

import FormFieldLabel from "../FormFieldLabel";

export default function FormFieldCloudinary({ prop, label }) {
    const [state, setState] = useFormField(prop, null);

    return (
        <React.Fragment>
            <FormFieldLabel>{label}</FormFieldLabel>
            <div className="form-field-grid-row-input">
                {state ? (
                    <img
                        className="border rounded shadow my-2"
                        src={`https://res.cloudinary.com/dbx23fuif/image/upload/${[
                            "w_400",
                            "h_400",
                            "c_fit",
                        ].join(",")}/${state}`}
                    />
                ) : null}

                <Widget
                    sources={["local", "url"]}
                    onSuccess={({ info: { path } }) => setState(path)}
                    onFailure={console.error}
                    logging
                    use_filename={false}
                    uploadPreset="local_preset"
                    folder="l"
                    cloudName="dbx23fuif"
                />
            </div>
        </React.Fragment>
    );
}
