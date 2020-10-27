import React from "react";

import { FormProvider } from "../../hooks/useFormContext";

import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import TitleBox from "../TitleBox";

import FormFieldBoolean from "../FormFieldBoolean";
import FormFieldNumber from "../FormFieldNumber";
import FormFieldString from "../FormFieldString";
import FormFieldUUID from "../FormFieldUUID";

import {
    FormFieldButtonBlock,
    FormFieldButtonReset,
    FormFieldButtonCreate,
    FormFieldButtonSave,
} from "../FormFieldButton";

export function RequiredFormFields() {
    return (
        <React.Fragment>
            <FormFieldString required prop="name" label="Name" />
            <FormFieldString required prop="label" label="Label" />
            <FormFieldNumber
                required
                min={0}
                step={1}
                prop="start_day"
                label="Start Day"
            />
            <FormFieldNumber
                required
                min={1}
                step={1}
                prop="end_day"
                label="End Day"
            />
            <FormFieldBoolean
                required
                prop="display_map_marker"
                label="Display Map Marker"
            />
        </React.Fragment>
    );
}

export function FormItineraryCreate({
    match: {
        params: { env },
    },
    history,
}) {
    const createApi = "/itineraries";
    const listApi = "/itineraries";

    return (
        <FormProvider>
            <TitleBox>
                <TitleBox.Header>Create Itinerary</TitleBox.Header>
                <TitleBox.Body>
                    <FormFieldGrid>
                        <FormFieldUUID prop="uid" />

                        <RequiredFormFields />

                        <FormFieldButtonBlock>
                            <FormFieldButtonReset />
                            <FormFieldButtonCreate
                                nameProp="name"
                                createApi={createApi}
                                listApi={listApi}
                                onCreated={(id) =>
                                    history.push(
                                        `/${env}/itineraries/edit/${id}`,
                                    )
                                }
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
                        <RequiredFormFields />

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
