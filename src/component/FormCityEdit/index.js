import React from "react";

import { FormProvider } from "../../hooks/useFormContext";

import FormContentLoaderEditable from "../FormContentLoaderEditable";

import FormFieldCountry from "../FormFieldCountry";
import FormFieldLatLong from "../FormFieldLatLong";
import FormFieldString from "../FormFieldString";

export default function FormCityEdit({
    match: {
        params: { id },
    },
}) {
    return (
        <FormProvider>
            <FormContentLoaderEditable
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
                        <FormFieldCountry />

                        <div>
                            <button onClick={onReset}>reset</button>
                            <button onClick={onSave}>save</button>
                        </div>
                    </React.Fragment>
                )}
            </FormContentLoaderEditable>
        </FormProvider>
    );
}
