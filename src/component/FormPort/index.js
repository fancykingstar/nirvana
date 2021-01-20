import React from "react";
import useSWR from "swr";

import { FormProvider } from "../../hooks/useFormContext";

import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import TitleBox from "../TitleBox";

import FormFieldUUID from "../FormFieldUUID";
import FormFieldLinkedSingle from "../FormFieldLinkedSingle";
import FormFieldLatLong from "../FormFieldLatLong";
import FormFieldString from "../FormFieldString";

import {
    FormFieldButtonBlock,
    FormFieldButtonReset,
    FormFieldButtonCreate,
    FormFieldButtonSave,
    FormFieldRichText,
} from "../FormFieldButton";

import {
    FormFieldMultiple,
    FormFieldAsset,
} from "@imagine-developer/utopia-forms";

function LinkedAirport({ name }) {
    return <span>{name}</span>;
}

function SearchResultAirport({ id, name, set }) {
    return <li onClick={set.bind(null, id)}>{name}</li>;
}

function LinkedCity({ name, id }) {
    const { data: cityData } = useSWR(id ? `/cities/${id}` : null);

    return (
        <span>
            {name} ({cityData?.country?.name ?? "..."})
        </span>
    );
}

function SearchResultCity({ id, name, set, country }) {
    return (
        <li onClick={set.bind(null, id)}>
            {name} ({country?.name ?? "..."})
        </li>
    );
}

function FormFields() {
    return (
        <React.Fragment>
            <FormFieldString prop="name" label="Name" />
            <FormFieldString required prop="label" label="Label" />
            <FormFieldLatLong required />

            <FormFieldLinkedSingle
                required
                label="Nearest Airport"
                prop="nearest_airport"
                searchProp="name"
                searchApi="/airports"
                RenderLinked={LinkedAirport}
                RenderSearchResult={SearchResultAirport}
            />

            <FormFieldLinkedSingle
                required
                label="City"
                prop="city"
                searchProp="name"
                searchApi="/cities"
                RenderLinked={LinkedCity}
                RenderSearchResult={SearchResultCity}
            />

            <FormFieldRichText prop="description" label="Description" />

            <FormFieldMultiple
                label="Media"
                prop="media"
                addNewButton="Add New Image"
                MultipleOf={FormFieldAsset}
            />
        </React.Fragment>
    );
}

export function FormPortCreate({
    match: {
        params: { env },
    },
    history,
}) {
    const listApi = "/ports";
    const createApi = "/ports";

    return (
        <FormProvider>
            <TitleBox>
                <TitleBox.Header>Create Port</TitleBox.Header>
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
                                    history.push(`/${env}/ports/edit/${id}`)
                                }
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox.Body>
            </TitleBox>
        </FormProvider>
    );
}

export function FormPortEdit({
    match: {
        params: { id },
    },
}) {
    const getApi = `/ports/${id}`;
    const listApi = "/ports";
    const putApi = `/ports/${id}`;

    return (
        <FormProvider>
            <FormContentLoader getApi={getApi} />
            <TitleBox>
                <TitleBox.Header>Edit Port</TitleBox.Header>
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
