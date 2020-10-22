import React from "react";

import { FormProvider } from "../../hooks/useFormContext";

import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import TitleBox, { TitleBoxPadder } from "../TitleBox";

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
}) {
    const createApi = "/currencies";
    const listApi = "/currencies";
    const getPushToEditRoute = (id) => `/${env}/currencies/edit/${id}`;

    return (
        <FormProvider>
            <TitleBoxPadder>
                <TitleBox title="Create Currency">
                    <FormFieldGrid>
                        <FormFieldUUID prop="uid" />
                        <FormFields />
                        <FormFieldButtonBlock>
                            <FormFieldButtonReset />
                            <FormFieldButtonCreate
                                nameProp="name"
                                createApi={createApi}
                                listApi={listApi}
                                getPushToEditRoute={getPushToEditRoute}
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox>
            </TitleBoxPadder>
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

            <TitleBoxPadder>
                <TitleBox title="Edit Currency">
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
                </TitleBox>
            </TitleBoxPadder>
        </FormProvider>
    );
}
