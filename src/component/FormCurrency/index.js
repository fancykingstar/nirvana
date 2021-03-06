import React from "react";

import { FormProvider } from "../../hooks/useFormContext";

import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import TitleBox from "../TitleBox";

import FormFieldUUID from "../FormFieldUUID";
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
            <FormFieldString
                required
                prop="currency_code"
                label="Currency Code"
            />
            <FormFieldString required prop="symbol" label="Symbol" />
        </React.Fragment>
    );
}

export function FormCurrencyCreate({
    match: {
        params: { env },
    },
    history,
}) {
    const createApi = "/currencies";
    const listApi = "/currencies";

    return (
        <FormProvider>
            <TitleBox>
                <TitleBox.Header>Create Currency</TitleBox.Header>
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
                                        `/${env}/currencies/edit/${id}`,
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

export function FormCurrencyEdit({
    match: {
        params: { id },
    },
}) {
    const getApi = `/currencies/${id}`;
    const listApi = "/currencies";
    const putApi = `/currencies/${id}`;

    return (
        <FormProvider>
            <FormContentLoader getApi={getApi} />

            <TitleBox>
                <TitleBox.Header>Edit Currency</TitleBox.Header>
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
