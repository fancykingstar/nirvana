import React from "react";

import { FormProvider } from "../../hooks/useFormContext";

import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import TitleBox, { TitleBoxPadder } from "../TitleBox";

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

export function FormCityCreate({
    match: {
        params: { env },
    },
}) {
    const createApi = "/cities";
    const listApi = "/cities";
    const getPushToEditRoute = (id) => `/${env}/cities/edit/${id}`;

    return (
        <FormProvider>
            <TitleBoxPadder>
                <TitleBox title="Create City">
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

export function FormCityEdit({
    match: {
        params: { id },
    },
}) {
    const getApi = `/cities/${id}`;
    const listApi = "/cities";
    const putApi = `/cities/${id}`;

    return (
        <FormProvider>
            <FormContentLoader getApi={getApi} />

            <TitleBoxPadder>
                <TitleBox title="Edit City">
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
