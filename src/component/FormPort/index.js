import React from "react";

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

function LinkedAirport({ name }) {
    return <span>{name}</span>;
}

function SearchResultAirport({ id, name, set }) {
    return <li onClick={set.bind(null, id)}>{name}</li>;
}

function LinkedCity({ name }) {
    return <span>{name}</span>;
}

function SearchResultCity({ id, name, set }) {
    return <li onClick={set.bind(null, id)}>{name}</li>;
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
                searchUrl="/airports"
                RenderLinked={LinkedAirport}
                RenderSearchResult={SearchResultAirport}
            />

            <FormFieldLinkedSingle
                required
                label="City"
                prop="city"
                searchProp="name"
                searchUrl="/cities"
                RenderLinked={LinkedCity}
                RenderSearchResult={SearchResultCity}
            />
        </React.Fragment>
    );
}

export function FormPortCreate({
    match: {
        params: { env },
    },
}) {
    const listApi = "/ports";
    const createApi = "/ports";
    const getPushToEditRoute = (id) => `/${env}/ports/edit/${id}`;

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
                                getPushToEditRoute={getPushToEditRoute}
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
