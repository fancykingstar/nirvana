import React from "react";

import { FormProvider } from "../../hooks/useFormContext";

import FormFieldGrid from "../FormFieldGrid";
import TitleBox from "../TitleBox";

import FormContentLoader from "../FormContentLoader";
import FormFieldUUID from "../FormFieldUUID";
import FormFieldLinkedMany from "../FormFieldLinkedMany";
import FormFieldString from "../FormFieldString";
import FormFieldRichText from "../FormFieldRichText";

import {
    FormFieldButtonBlock,
    FormFieldButtonReset,
    FormFieldButtonSave,
    FormFieldButtonCreate,
} from "../FormFieldButton";

function LinkedCity({ id, name, remove }) {
    return <li onClick={remove.bind(null, id)}>{name}</li>;
}

function SearchResultCity({ id, name, add }) {
    return <li onClick={add.bind(null, id)}>{name}</li>;
}

function FormFields() {
    return (
        <React.Fragment>
            <FormFieldString required prop="name" label="Name" />
            <FormFieldString required prop="label" label="Label" />
            <FormFieldString required prop="iso_2" label="ISO (2)" />
            <FormFieldString required prop="iso_3" label="ISO (3)" />

            <FormFieldRichText prop="description" label="Description" />

            <FormFieldLinkedMany
                label="Cities"
                prop="cities"
                searchUrl="/cities"
                searchProp="name"
                RenderLinked={LinkedCity}
                RenderSearchResult={SearchResultCity}
            />
        </React.Fragment>
    );
}

export function FormCountryCreate({
    match: {
        params: { env },
    },
    history,
}) {
    const listApi = "/cities";
    const createApi = "/cities";

    return (
        <FormProvider>
            <TitleBox>
                <TitleBox.Header>Create City</TitleBox.Header>
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
                                    history.push(`/${env}/countries/edit/${id}`)
                                }
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox.Body>
            </TitleBox>
        </FormProvider>
    );
}

export function FormCountryEdit({
    match: {
        params: { id },
    },
}) {
    const getApi = `/countries/${id}`;
    const listApi = "/countries";
    const putApi = `/countries/${id}`;

    return (
        <FormProvider>
            <FormContentLoader getApi={getApi} />
            <TitleBox>
                <TitleBox.Header>Edit City</TitleBox.Header>
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
