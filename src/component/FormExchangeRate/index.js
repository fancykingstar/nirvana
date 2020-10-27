import React from "react";

import { FormProvider } from "../../hooks/useFormContext";

import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import TitleBox, { TitleBoxPadder } from "../TitleBox";

import FormFieldUUID from "../FormFieldUUID";
import FormFieldLinkedSingle from "../FormFieldLinkedSingle";
import FormFieldNumber from "../FormFieldNumber";

import {
    FormFieldButtonBlock,
    FormFieldButtonReset,
    FormFieldButtonCreate,
    FormFieldButtonSave,
} from "../FormFieldButton";

function LinkedCurrency({ currency_code, symbol }) {
    return (
        <span>
            {currency_code} ({symbol})
        </span>
    );
}

function SearchResultCurrency({ id, currency_code, set }) {
    return <li onClick={set.bind(null, id)}>{currency_code}</li>;
}

function FormFields() {
    return (
        <React.Fragment>
            <FormFieldNumber
                required
                step=".01"
                min="0"
                prop="exhange_rate"
                label="Exchange Rate"
            />
            <FormFieldLinkedSingle
                required
                label="From Currency"
                prop="from_currency"
                searchProp="currency_code"
                searchUrl="/currencies"
                RenderLinked={LinkedCurrency}
                RenderSearchResult={SearchResultCurrency}
            />
            <FormFieldLinkedSingle
                required
                label="To Currency"
                prop="to_currency"
                searchProp="currency_code"
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
    history,
}) {
    const createApi = "/exchange-rates";
    const listApi = "/exchange-rates";

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
                                onCreated={(id) =>
                                    history.push(
                                        `/${env}/exchange-rates/edit/${id}`,
                                    )
                                }
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
