import React from "react";

import { FormProvider } from "../../hooks/useFormContext";

import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import TitleBox from "../TitleBox";

import FormFieldUUID from "../FormFieldUUID";
import FormFieldRichText from "../FormFieldRichText";
import FormFieldString from "../FormFieldString";

import {
    FormFieldButtonBlock,
    FormFieldButtonReset,
    FormFieldButtonCreate,
    FormFieldButtonSave,
} from "../FormFieldButton";

function FormFields() {
    return (
        <React.Fragment>
            <FormFieldString required prop="name" label="Name" />
            <FormFieldString required prop="label" label="Name" />
            <FormFieldRichText prop="content" label="Content" />
        </React.Fragment>
    );
}

export function FormEventCreate({
    match: {
        params: { env },
    },
    history,
}) {
    const createApi = "/events";
    const listApi = "/events";

    return (
        <FormProvider>
            <TitleBox>
                <TitleBox.Header>Create Event</TitleBox.Header>
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
                                    history.push(`/${env}/events/edit/${id}`)
                                }
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox.Body>
            </TitleBox>
        </FormProvider>
    );
}

export function FormEventEdit({
    match: {
        params: { id },
    },
}) {
    const getApi = `/events/${id}`;
    const listApi = "/events";
    const putApi = `/events/${id}`;

    return (
        <FormProvider>
            <FormContentLoader getApi={getApi} />

            <TitleBox>
                <TitleBox.Header>Edit Event</TitleBox.Header>
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
