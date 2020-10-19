import React from "react";

import { FormProvider } from "../../hooks/useFormContext";

import FormContentLoaderEditable from "../FormContentLoaderEditable";
import FormFieldGrid from "../FormFieldGrid";
import TitleBox, { TitleBoxPadder } from "../TitleBox";

import FormFieldCountry from "../FormFieldCountry";
import FormFieldLatLong from "../FormFieldLatLong";
import FormFieldString from "../FormFieldString";
import { FormFieldButton, FormFieldButtonBlock } from "../FormFieldButton";

export default function FormEditCity({
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
                {({ onReset, onSave, name }) => (
                    <TitleBoxPadder>
                        <TitleBox title={`Edit ${name ?? "..."}`}>
                            <FormFieldGrid>
                                <FormFieldString
                                    required
                                    prop="name"
                                    label="Name"
                                />
                                <FormFieldString
                                    required
                                    prop="label"
                                    label="Label"
                                />
                                <FormFieldLatLong required />
                                <FormFieldCountry />

                                <FormFieldButtonBlock>
                                    <FormFieldButton
                                        color="red"
                                        onClick={onReset}
                                    >
                                        Reset
                                    </FormFieldButton>
                                    <FormFieldButton
                                        color="green"
                                        onClick={onSave}
                                    >
                                        Save
                                    </FormFieldButton>
                                </FormFieldButtonBlock>
                            </FormFieldGrid>
                        </TitleBox>
                    </TitleBoxPadder>
                )}
            </FormContentLoaderEditable>
        </FormProvider>
    );
}
