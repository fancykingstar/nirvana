import React from "react";

import { FormProvider } from "../../hooks/useFormContext";

import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import TitleBox from "../TitleBox";

import FormFieldLinkedSingle from "../FormFieldLinkedSingle";
import FormFieldString from "../FormFieldString";
import FormFieldRichText from "../FormFieldRichText";
import FormFieldDebug from "../FormFieldDebug";
import FormFieldBoolean from "../FormFieldBoolean";
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

/*
apis
categories
code
feed_product
operator
primary_accommodation
product_groups
product_includes
product_template
product_type
regions
related_products
versions
*/

function FormFields() {
    return (
        <React.Fragment>
            <FormFieldDebug />
            <FormFieldString required prop="name" label="Name" />
            <FormFieldString required prop="label" label="Label" />
            <FormFieldString required prop="code" label="Code" />

            <FormFieldBoolean prop="active" label="Is Active" />
            <FormFieldBoolean
                prop="include_in_search"
                label="Include in Search"
            />
            <FormFieldRichText prop="description" label="Description" />

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

export function FormProductCreate({
    match: {
        params: { env },
    },
    history,
}) {
    const createApi = "/products";
    const listApi = "/products";

    return (
        <FormProvider>
            <TitleBox>
                <TitleBox.Header>Create Product</TitleBox.Header>
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
                                    history.push(`/${env}/products/edit/${id}`)
                                }
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox.Body>
            </TitleBox>
        </FormProvider>
    );
}

export function FormProductEdit({
    match: {
        params: { id },
    },
}) {
    const getApi = `/products/${id}`;
    const listApi = "/products";
    const putApi = `/products/${id}`;

    return (
        <FormProvider>
            <FormContentLoader getApi={getApi} />

            <TitleBox>
                <TitleBox.Header>Edit Product</TitleBox.Header>
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
