import React from "react";

import FormContentLoader from "../FormContentLoader";
import FormFieldBoolean from "../FormFieldBoolean";
import FormFieldGrid from "../FormFieldGrid";
import FormFieldItineraryItems from "./FormFieldItineraryItems";
import FormFieldString from "../FormFieldString";
import FormFieldUUID from "../FormFieldUUID";
import TitleBox from "../TitleBox";
import { FormProvider } from "../../hooks/useFormContext";

import {
    FormFieldButtonBlock,
    FormFieldButtonReset,
    FormFieldButtonCreate,
    FormFieldButtonSave,
    FormFieldButtonDuplicate,
} from "../FormFieldButton";

function FormFields() {
    return (
        <React.Fragment>
            <FormFieldString required prop="name" label="Name" />
            <FormFieldString required prop="label" label="Label" />

            <FormFieldBoolean prop="feed_itinerary" label="Is Feed Itinerary" />
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

                        <FormFields />

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
    history,
    match: {
        params: { env, id },
    },
}) {
    const getApi = `/itineraries/${id}`;
    const listApi = "/itineraries";
    const putApi = `/itineraries/${id}`;
    const duplicateApi = `/itineraries/${id}`;

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

                            <FormFieldButtonDuplicate
                                nameProp="name"
                                listApi={listApi}
                                duplicateApi={duplicateApi}
                                onDuplicated={(id) =>
                                    history.push(
                                        `/${env}/itineraries/edit/${id}`,
                                    )
                                }
                            />
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
