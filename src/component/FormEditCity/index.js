import React from "react";

import { FormProvider } from "../../hooks/useFormContext";

import FormEditableContentLoader from "../FormEditableContentLoader";

import FormFieldLatLong from "../FormFieldLatLong";
import FormFieldString from "../FormFieldString";

export default function FormEditCity({
    match: {
        params: { id },
    },
}) {
    return (
        <FormProvider>
            <FormEditableContentLoader
                id={id}
                nameProp="name"
                getRoute="/cities/:id"
                updateRoute="/cities/:id"
            >
                {({ onReset, onSave }) => (
                    <React.Fragment>
                        <FormFieldString prop="name" label="Name" />
                        <FormFieldString required prop="label" label="Label" />
                        <FormFieldLatLong required />

                        <div>
                            <button onClick={onReset}>reset</button>
                            <button onClick={onSave}>save</button>
                        </div>
                    </React.Fragment>
                )}
            </FormEditableContentLoader>
        </FormProvider>
    );
}
