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
    const createRoute = "/cities";
    const listRoute = "/cities";
    const pushToEditRoute = (id) => `/${env}/cities/edit/${id}`;

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
                                createRoute={createRoute}
                                listRoute={listRoute}
                                pushToEditRoute={pushToEditRoute}
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
    const getRoute = `/cities/${id}`;
    const listRoute = "/cities";
    const putRoute = `/cities/${id}`;

    return (
        <FormProvider>
            <FormContentLoader getRoute={getRoute} />

            <TitleBoxPadder>
                <TitleBox title="Edit City">
                    <FormFieldGrid>
                        <FormFields />

                        <FormFieldButtonBlock>
                            <FormFieldButtonReset />
                            <FormFieldButtonSave
                                nameProp="name"
                                putRoute={putRoute}
                                getRoute={getRoute}
                                listRoute={listRoute}
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox>
            </TitleBoxPadder>
        </FormProvider>
    );
}