import React from "react";

import { FormProvider } from "../../hooks/useFormContext";

import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import TitleBox, { TitleBoxPadder } from "../TitleBox";

import FormFieldUUID from "../FormFieldUUID";
import FormFieldLinkedSingle from "../FormFieldLinkedSingle";
import FormFieldString from "../FormFieldString";

import {
    FormFieldButtonBlock,
    FormFieldButtonReset,
    FormFieldButtonCreate,
    FormFieldButtonSave,
} from "../FormFieldButton";

function LinkedCurrency({ name }) {
    return <span>{name}</span>;
}

function SearchResultCurrency({ id, name, set }) {
    return <li onClick={set.bind(null, id)}>{name}</li>;
}

function FormFields() {
    return (
        <React.Fragment>
            <FormFieldString
                required
                prop="exchange-rate"
                label="Exchange Rate"
            />
            <FormFieldLinkedSingle
                required
                label="From Currency"
                prop="from_currency"
                searchProp="from_exchange_rates"
                searchUrl="/currencies"
                RenderLinked={LinkedCurrency}
                RenderSearchResult={SearchResultCurrency}
            />
            <FormFieldLinkedSingle
                required
                label="To Currency"
                prop="to_currency"
                searchProp="to_exchange_rates"
                searchUrl="/currencies"
                RenderLinked={LinkedCurrency}
                RenderSearchResult={SearchResultCurrency}
            />
        </React.Fragment>
    );
}

export function FormExchangeRateCreate({
    match: {
        params: { env },
    },
}) {
    const createApi = "/exchange-rates";
    const listApi = "/exchange-rates";
    const getPushToEditRoute = (id) => `/${env}/exchange-rates/edit/${id}`;

    return (
        <FormProvider>
            <TitleBoxPadder>
                <TitleBox title="Create Exchange Rate">
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

export function FormExchangeRateEdit({
    match: {
        params: { id },
    },
}) {
    const getApi = `/exchange-rates/${id}`;
    const listApi = "/exchange-rates";
    const putApi = `/exchange-rates/${id}`;

    return (
        <FormProvider>
            <FormContentLoader getApi={getApi} />

            <TitleBoxPadder>
                <TitleBox title="Edit Exchange Rate">
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
