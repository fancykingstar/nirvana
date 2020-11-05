import React from "react";

import { FormProvider } from "../../hooks/useFormContext";

import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import TitleBox from "../TitleBox";

import FormFieldDate from "../FormFieldDate";
import FormFieldSubformMultiple from "../FormFieldSubformMultiple";
import FormFieldLinkedSingle from "../FormFieldLinkedSingle";
import FormFieldNumber from "../FormFieldNumber";
import FormFieldUUID from "../FormFieldUUID";
import FormFieldBoolean from "../FormFieldBoolean";

import { FormFields as PriceFormFields } from "../FormPrice";

import {
    FormFieldButtonBlock,
    FormFieldButtonReset,
    FormFieldButtonCreate,
    FormFieldButtonSave,
} from "../FormFieldButton";

function AirportLinked({ name }) {
    return <span>{name}</span>;
}

function AirportResult({ id, name, set }) {
    return <li onClick={set.bind(null, id)}>{name}</li>;
}

function FormFields() {
    return (
        <React.Fragment>
            <FormFieldDate required prop="date" label="Date" />
            <FormFieldBoolean
                required
                prop="include_in_serach"
                label="Include in Search"
            />

            <FormFieldNumber
                required
                prop="start_date_offset"
                label="Start Date Offset"
            />
            <FormFieldNumber prop="end_date_offset" labe="End Date Offset" />

            <hr className="form-field-grid-row-all" />

            <FormFieldLinkedSingle
                RenderLinked={AirportLinked}
                RenderSearchResult={AirportResult}
                label="From Airport"
                prop="from_airport"
                required
                searchApi="/airports"
                searchProp="name"
            />
        </React.Fragment>
    );
}

export function FormDepartureCreate({
    match: {
        params: { env },
    },
    history,
}) {
    const createApi = "/departures";
    const listApi = "/departures";

    return (
        <FormProvider>
            <TitleBox>
                <TitleBox.Header>Create Departure</TitleBox.Header>
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
                                        `/${env}/departures/edit/${id}`,
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

function PreviewPrice({ i, id, now_price, currency, openItem }) {
    return (
        <li onClick={openItem.bind(null, id)}>
            <span>{i + 1}</span>
            <span className="pl-1 text-blue-600 hover:text-blue-900 underline cursor-pointer">
                {currency.symbol} {now_price}
            </span>
        </li>
    );
}

function comparePrice(lhs, rhs) {
    return lhs.now_price - rhs.now_price;
}

export function FormDepartureEdit({
    match: {
        params: { id },
    },
}) {
    const getApi = `/departures/${id}`;
    const listApi = "/departures";
    const putApi = `/departures/${id}`;

    return (
        <FormProvider>
            <FormContentLoader getApi={getApi} />

            <TitleBox>
                <TitleBox.Header>Edit Departure</TitleBox.Header>
                <TitleBox.Body>
                    <FormFieldGrid>
                        <FormFields />

                        <hr className="form-field-grid-row-all" />

                        <FormFieldSubformMultiple
                            RenderCreateFields={PriceFormFields}
                            RenderEditFields={PriceFormFields}
                            RenderPreview={PreviewPrice}
                            compareFn={comparePrice}
                            createApi="/prices"
                            getEditRoute={(id) => `/prices/edit/${id}`}
                            getGetApi={(id) => `/prices/${id}`}
                            getPutApi={(id) => `/prices/${id}`}
                            label="Prices"
                            listApi="/prices"
                            parentId={id}
                            parentProp="departure"
                        />

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
