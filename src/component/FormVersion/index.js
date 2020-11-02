import React from "react";

import { FormProvider } from "../../hooks/useFormContext";

import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import TitleBox from "../TitleBox";

import FormFieldDebug from "../FormFieldDebug";
import FormFieldLinkedSingle from "../FormFieldLinkedSingle";
import FormFieldString from "../FormFieldString";
import FormFieldUUID from "../FormFieldUUID";

import {
    FormFieldButtonBlock,
    FormFieldButtonReset,
    FormFieldButtonCreate,
    FormFieldButtonSave,
} from "../FormFieldButton";

function LinkedItinerary({ name }) {
    return <span>{name}</span>;
}

function LinkedProduct({ name }) {
    return <span>{name}</span>;
}

function SearchResultItinerary({ id, name, set }) {
    return <li onClick={set.bind(null, id)}>{name}</li>;
}

function SearchResultProduct({ id, name, set }) {
    return <li onClick={set.bind(null, id)}>{name}</li>;
}

function FormFields() {
    return (
        <React.Fragment>
            <FormFieldDebug />
            <FormFieldString prop="name" label="Name" />
            <FormFieldString required prop="label" label="Label" />

            <FormFieldLinkedSingle
                required
                label="Itinerary"
                prop="itinerary"
                searchProp="name"
                searchApi="/itineraries"
                RenderLinked={LinkedItinerary}
                RenderSearchResult={SearchResultItinerary}
            />

            <FormFieldLinkedSingle
                required
                label="Product"
                prop="product"
                searchProp="name"
                searchApi="/products"
                RenderLinked={LinkedProduct}
                RenderSearchResult={SearchResultProduct}
            />
        </React.Fragment>
    );
}

export function FormVersionCreate({
    match: {
        params: { env },
    },
    history,
}) {
    const createApi = "/versions";
    const listApi = "/versions";

    return (
        <FormProvider>
            <TitleBox>
                <TitleBox.Header>Create Version</TitleBox.Header>
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
                                    history.push(`/${env}/versions/edit/${id}`)
                                }
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox.Body>
            </TitleBox>
        </FormProvider>
    );
}

export function FormVersionEdit({
    match: {
        params: { id },
    },
}) {
    const getApi = `/versions/${id}`;
    const listApi = "/versions";
    const putApi = `/versions/${id}`;

    return (
        <FormProvider>
            <FormContentLoader getApi={getApi} />

            <TitleBox>
                <TitleBox.Header>Edit Version</TitleBox.Header>
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
