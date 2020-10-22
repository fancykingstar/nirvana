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
                searchUrl="/cities"
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
}) {
    const listRoute = "/airports";
    const createRoute = "/airports";
    const pushToEditRoute = (id) => `/${env}/airports/edit/${id}`;

    return (
        <FormProvider>
            <TitleBoxPadder>
                <TitleBox title="Create Airport">
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

export function FormAirportEdit({
    match: {
        params: { id },
    },
}) {
    const getRoute = `/airports/${id}`;
    const listRoute = "/airports";
    const putRoute = `/airports/${id}`;

    return (
        <FormProvider>
            <FormContentLoader getRoute={getRoute} />
            <TitleBoxPadder>
                <TitleBox title="Edit Airport">
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
