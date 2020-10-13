import React from "react";

import FormProvider from "../FormProvider";
import FormSection from "../FormSection";

import FormFieldLatLong from "../FormFieldLatLong";
import FormFieldString from "../FormFieldString";

export default function FormEditCity({
    match: {
        params: { id },
    },
}) {
    return (
        <FormProvider
            edit
            id={id}
            nameProp="name"
            getRoute="/cities/:id"
            updateRoute="/cities/:id"
        >
            <FormSection label="Basic Data">
                <FormFieldString prop="name" label="Name" />
                <FormFieldString required prop="label" label="Label" />
            </FormSection>
            <FormSection label="Geographic Data">
                <FormFieldLatLong required />
            </FormSection>
        </FormProvider>
    );
}
