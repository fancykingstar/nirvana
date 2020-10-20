import React from "react";

import { FormProvider } from "../../hooks/useFormContext";

import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import TitleBox, { TitleBoxPadder } from "../TitleBox";

import FormFieldCountry from "../FormFieldCountry";
import FormFieldLatLong from "../FormFieldLatLong";
import FormFieldString from "../FormFieldString";

import {
    FormFieldButtonBlock,
    FormFieldButtonReset,
    FormFieldButtonSave,
} from "../FormFieldButton";

export default function FormCityEdit({
    match: {
        params: { id },
    },
}) {
    const getRoute = `/cities/${id}`;
    const listRoute = "/cities";
    const putRoute = `/cities/${id}`;

    return (
        <FormProvider>
            <FormContentLoader getRoute={getRoute} />

            <TitleBoxPadder>
                <TitleBox title="Edit City">
                    <FormFieldGrid>
                        <FormFieldString required prop="name" label="Name" />
                        <FormFieldString required prop="label" label="Label" />
                        <FormFieldLatLong required />
                        <FormFieldCountry />

                        <FormFieldButtonBlock>
                            <FormFieldButtonReset />
                            <FormFieldButtonSave
                                nameProp="name"
                                putRoute={putRoute}
                                getRoute={getRoute}
                                listRoute={listRoute}
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox>
            </TitleBoxPadder>
        </FormProvider>
    );
}
