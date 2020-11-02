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
} from "../FormFieldButton";

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
            <FormFieldString prop="label" label="Label" />
            <FormFieldString
                required
                prop="airport_code"
                label="Airport Code"
            />
            <FormFieldLatLong required />

            <FormFieldLinkedSingle
                required
                label="City"
                prop="city"
                searchProp="name"
                searchApi="/cities"
                RenderLinked={LinkedCity}
                RenderSearchResult={SearchResultCity}
            />
        </React.Fragment>
    );
}

export function FormAirportCreate({
    match: {
        params: { env },
    },
    history,
}) {
    const listApi = "/airports";
    const createApi = "/airports";

    return (
        <FormProvider>
            <TitleBox>
                <TitleBox.Header>Create Airport</TitleBox.Header>
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
                                    history.push(`/${env}/airports/edit/${id}`)
                                }
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox.Body>
            </TitleBox>
        </FormProvider>
    );
}

export function FormAirportEdit({
    match: {
        params: { id },
    },
}) {
    const getApi = `/airports/${id}`;
    const listApi = "/airports";
    const putApi = `/airports/${id}`;

    return (
        <FormProvider>
            <FormContentLoader getApi={getApi} />
            <TitleBox>
                <TitleBox.Header>Edit Airport</TitleBox.Header>
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
