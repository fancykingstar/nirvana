import React from "react";
import { FormProvider } from "../../hooks/useFormContext";

import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import TitleBox from "../TitleBox";

import FormFieldUUID from "../FormFieldUUID";
import FormFieldString from "../FormFieldString";
import FormFieldRichText from "../FormFieldRichText";

import {
    FormFieldButtonBlock,
    FormFieldButtonReset,
    FormFieldButtonCreate,
    FormFieldButtonSave,
} from "../FormFieldButton";

export function FormFields() {
    return (
        <React.Fragment>
            <FormFieldString required prop="name" label="Name" />
            <FormFieldString required prop="label" label="Label" />
            <FormFieldRichText
                required
                prop="description"
                label="Description"
            />
        </React.Fragment>
    );
}

export function FormAccommodationGradesCreate({
    match: {
        params: { env },
    },
    history,
}) {
    const listApi = "/accommodation-grades";
    const createApi = "/accommodation-grades";

    return (
        <FormProvider>
            <TitleBox>
                <TitleBox.Header>Create Accommodation Grade</TitleBox.Header>
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
                                        `/${env}/accommodation-grades/edit/${id}`,
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

export function FormAccommodationGradesEdit({
    match: {
        params: { id },
    },
}) {
    const getApi = `/accommodation-grades/${id}`;
    const listApi = "/accommodation-grades";
    const putApi = `/accommodation-grades/${id}`;

    return (
        <FormProvider>
            <FormContentLoader getApi={getApi} />
            <TitleBox>
                <TitleBox.Header>Edit Accommodation Grade</TitleBox.Header>
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
