import React from "react";

import { FormProvider } from "../../hooks/useFormContext";

import FormFieldGrid from "../FormFieldGrid";
import TitleBox, { TitleBoxPadder } from "../TitleBox";

import FormFieldUUID from "../FormFieldUUID";
import FormFieldCountry from "../FormFieldCountry";
import FormFieldLatLong from "../FormFieldLatLong";
import FormFieldString from "../FormFieldString";

import {
    FormFieldButtonBlock,
    FormFieldButtonReset,
    FormFieldButtonCreate,
} from "../FormFieldButton";

export default function FormCityCreate({
    match: {
        params: { env },
    },
}) {
    const createRoute = "/cities";
    const listRoute = "/cities";
    const pushToEditRoute = (id) => `/${env}/cities/edit/${id}`;

    return (
        <FormProvider>
            <TitleBoxPadder>
                <TitleBox title="Create City">
                    <FormFieldGrid>
                        <FormFieldUUID prop="uid" />

                        <FormFieldString prop="name" label="Name" />
                        <FormFieldString required prop="label" label="Label" />
                        <FormFieldLatLong required />
                        <FormFieldCountry />

                        <FormFieldButtonBlock>
                            <FormFieldButtonReset />
                            <FormFieldButtonCreate
                                nameProp="name"
                                createRoute={createRoute}
                                listRoute={listRoute}
                                pushToEditRoute={pushToEditRoute}
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox>
            </TitleBoxPadder>
        </FormProvider>
    );
}
