import React from "react";

import { FormProvider } from "../../hooks/useFormContext";

import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import TitleBox from "../TitleBox";

import FormFieldDebug from "../FormFieldDebug";
import FormFieldString from "../FormFieldString";
import FormFieldUUID from "../FormFieldUUID";

import {
    FormFieldButtonBlock,
    FormFieldButtonReset,
    FormFieldButtonCreate,
    FormFieldButtonSave,
} from "../FormFieldButton";

function FormFields() {
    return (
        <React.Fragment>
            <FormFieldDebug />
            <FormFieldString prop="name" label="Name" />
            <FormFieldString
                required
                prop="default_label"
                label="Default Label"
            />
        </React.Fragment>
    );
}

export function FormGradeMappingCreate({
    match: {
        params: { env },
    },
    history,
}) {
    const createApi = "/grade-mappings";
    const listApi = "/grade-mappings";

    return (
        <FormProvider>
            <TitleBox>
                <TitleBox.Header>Create GradeMapping</TitleBox.Header>
                <TitleBox.Body>
                    <FormFieldGrid>
                        <FormFieldUUID prop="uid" />

                        <FormFields />

                        <FormFieldButtonBlock>
                            <FormFieldButtonReset />
                            <FormFieldButtonCreate
                                nameProp="name"
                                createApi={createApi}
                                listApi={listApi}
                                onCreated={(id) =>
                                    history.push(
                                        `/${env}/grade-mappings/edit/${id}`,
                                    )
                                }
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox.Body>
            </TitleBox>
        </FormProvider>
    );
}

export function FormGradeMappingEdit({
    match: {
        params: { id },
    },
}) {
    const getApi = `/grade-mappings/${id}`;
    const listApi = "/grade-mappings";
    const putApi = `/grade-mappings/${id}`;

    return (
        <FormProvider>
            <FormContentLoader getApi={getApi} />

            <TitleBox>
                <TitleBox.Header>Edit GradeMapping</TitleBox.Header>
                <TitleBox.Body>
                    <FormFieldGrid>
                        <FormFields />

                        <FormFieldButtonBlock>
                            <FormFieldButtonReset />
                            <FormFieldButtonSave
                                nameProp="name"
                                putApi={putApi}
                                getApi={getApi}
                                listApi={listApi}
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox.Body>
            </TitleBox>
        </FormProvider>
    );
}
