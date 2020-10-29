import React from "react";

import { FormProvider } from "../../hooks/useFormContext";

import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import TitleBox from "../TitleBox";

import FormFieldUUID from "../FormFieldUUID";
import FormFieldNumber from "../FormFieldNumber";
import FormFieldBoolean from "../FormFieldBoolean";
import FormFieldLinkedSingle from "../FormFieldLinkedSingle";

import {
    FormFieldButtonBlock,
    FormFieldButtonReset,
    FormFieldButtonCreate,
    FormFieldButtonSave,
} from "../FormFieldButton";

function LinkedCurrency({ currency_code, symbol }) {
    if (!currency_code) {
        return <span />;
    }

    return (
        <span>
            {currency_code} ({symbol})
        </span>
    );
}

function ResultCurrency({ id, currency_code, set }) {
    return <li onClick={set.bind(null, id)}>{currency_code}</li>;
}

function FormFields() {
    return (
        <React.Fragment>
            <FormFieldLinkedSingle
                required
                label="Currency"
                prop="currency"
                searchProp="currency_code"
                searchApi="/currencies"
                RenderLinked={LinkedCurrency}
                RenderSearchResult={ResultCurrency}
            />
            <FormFieldNumber prop="now_price" label="Now Price" />
            <FormFieldNumber prop="was_price" label="Was Price" />
            <FormFieldNumber prop="generic_price" label="Generic Price" />
            <FormFieldBoolean prop="sold_out" label="Sold Out" />
        </React.Fragment>
    );
}

export function FormPriceCreate({
    match: {
        params: { env },
    },
    history,
}) {
    const createApi = "/prices";
    const listApi = "/prices";

    return (
        <FormProvider>
            <TitleBox>
                <TitleBox.Header>Create Price</TitleBox.Header>
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
                                    history.push(`/${env}/prices/edit/${id}`)
                                }
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox.Body>
            </TitleBox>
        </FormProvider>
    );
}

export function FormPriceEdit({
    match: {
        params: { id },
    },
}) {
    const getApi = `/prices/${id}`;
    const listApi = "/prices";
    const putApi = `/prices/${id}`;

    return (
        <FormProvider>
            <FormContentLoader getApi={getApi} />

            <TitleBox>
                <TitleBox.Header>Edit Price</TitleBox.Header>
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
