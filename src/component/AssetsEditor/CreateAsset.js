import React from "react";

import FormFieldGrid from "../FormFieldGrid";
import FormFieldCloudinary from "../FormFieldCloudinary";
import FormFieldString from "../FormFieldString";
import TitleBox from "../TitleBox";
import { FormProvider } from "../../hooks/useFormContext";

import {
    FormFieldButtonBlock,
    FormFieldButtonCreate,
} from "../FormFieldButton";

export default function CreateAsset({ history }) {
    return (
        <FormProvider>
            <TitleBox>
                <TitleBox.Header>Create Asset</TitleBox.Header>
                <TitleBox.Body>
                    <FormFieldGrid>
                        <FormFieldString prop="name" label="Name" />
                        <FormFieldCloudinary prop="path" label="Media" />
                        <FormFieldString prop="alt_text" label="Alt Text" />

                        <FormFieldButtonBlock>
                            <FormFieldButtonCreate
                                nameProp="name"
                                listApi="/assets"
                                createApi="/assets"
                                onCreated={history.goBack}
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox.Body>
            </TitleBox>
        </FormProvider>
    );
}
