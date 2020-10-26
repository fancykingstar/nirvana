import React from "react";

import { FormProvider } from "../../hooks/useFormContext";

import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import TitleBox from "../TitleBox";

import FormFieldUUID from "../FormFieldUUID";
import FormFieldString from "../FormFieldString";

import FormFieldItineraryItems from "./FormFieldItineraryItems";

import {
    FormFieldButtonBlock,
    FormFieldButtonReset,
    FormFieldButtonCreate,
    FormFieldButtonSave,
} from "../FormFieldButton";

function FormFields() {
    return (
        <React.Fragment>
            <FormFieldString required prop="name" label="Name" />
            <FormFieldString required prop="label" label="Label" />
        </React.Fragment>
    );
}

export function FormItineraryCreate({
    match: {
        params: { env },
    },
}) {
    const createApi = "/itineraries";
    const listApi = "/itineraries";
    const getPushToEditRoute = (id) => `/${env}/itineraries/edit/${id}`;

    return (
        <FormProvider>
            <TitleBox>
                <TitleBox.Header>Create Itinerary</TitleBox.Header>
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

export function FormItineraryEdit({
    match: {
        params: { id },
    },
}) {
    const getApi = `/itineraries/${id}`;
    const listApi = "/itineraries";
    const putApi = `/itineraries/${id}`;

    return (
        <FormProvider>
            <FormContentLoader getApi={getApi} />

            <TitleBox>
                <TitleBox.Header>Edit Itinerary</TitleBox.Header>
                <TitleBox.Body>
                    <FormFieldGrid>
                        <FormFields />

                        <FormFieldItineraryItems />

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
