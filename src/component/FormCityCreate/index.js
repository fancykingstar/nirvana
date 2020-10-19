import React from "react";

import { FormProvider } from "../../hooks/useFormContext";

import FormContentLoaderCreate from "../FormContentLoaderCreate";

import FormFieldUUID from "../FormFieldUUID";
import FormFieldCountry from "../FormFieldCountry";
import FormFieldLatLong from "../FormFieldLatLong";
import FormFieldString from "../FormFieldString";

export default function FormCityCreate() {
    return (
        <FormProvider>
            <FormContentLoaderCreate
                nameProp="name"
                createRoute="/cities"
                getRoute="/cities/:id"
                listRoute="/cities"
                pushToEditRoute="/:env/cities/edit/:id"
            >
                {({ onCreate }) => (
                    <React.Fragment>
                        <FormFieldUUID prop="uid" />

                        <FormFieldString prop="name" label="Name" />
                        <FormFieldString required prop="label" label="Label" />
                        <FormFieldLatLong required />
                        <FormFieldCountry />

                        <div>
                            <button onClick={onCreate}>create</button>
                        </div>
                    </React.Fragment>
                )}
            </FormContentLoaderCreate>
        </FormProvider>
    );
}
