import React from "react";

import { FormProvider } from "../../hooks/useFormContext";

import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import TitleBox from "../TitleBox";

import FormFieldBoolean from "../FormFieldBoolean";
import FormFieldRichText from "../FormFieldRichText";
import FormFieldLinkedSingle from "../FormFieldLinkedSingle";
import FormFieldString from "../FormFieldString";
import FormFieldUUID from "../FormFieldUUID";
import FormFieldLatLong from "../FormFieldLatLong";

import FormFieldItemOrder from "./FormFieldItemOrder";

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

            <FormFieldItemOrder label="Start - End (Ordering)" />

            <FormFieldBoolean
                required
                prop="display_map_marker"
                label="Display Map Marker"
            />
        </React.Fragment>
    );
}

function LinkedCity({ name }) {
    return <span>{name}</span>;
}
function LinkedPort({ name }) {
    return <span>{name}</span>;
}
function LinkedEvent({ name }) {
    return <span>{name}</span>;
}

function ResultCity({ id, name, set }) {
    return <li onClick={set.bind(null, id)}>{name}</li>;
}
function ResultPort({ id, name, set }) {
    return <li onClick={set.bind(null, id)}>{name}</li>;
}
function ResultEvent({ id, name, set }) {
    return <li onClick={set.bind(null, id)}>{name}</li>;
}

function FormFields() {
    return (
        <React.Fragment>
            <RequiredFormFields />

            <FormFieldLatLong />
            <FormFieldRichText prop="description" label="Description" />

            <FormFieldLinkedSingle
                prop="city"
                label="City"
                searchProp="name"
                searchApi="/cities"
                RenderLinked={LinkedCity}
                RenderSearchResult={ResultCity}
            />
            <FormFieldLinkedSingle
                prop="port"
                label="Port"
                searchProp="name"
                searchApi="/ports"
                RenderLinked={LinkedPort}
                RenderSearchResult={ResultPort}
            />
            <FormFieldLinkedSingle
                prop="event"
                label="Event"
                searchProp="name"
                searchApi="/events"
                RenderLinked={LinkedEvent}
                RenderSearchResult={ResultEvent}
            />
        </React.Fragment>
    );
}

export function FormItineraryItemCreate({
    match: {
        params: { env },
    },
    history,
}) {
    const createApi = "/itinerary-items";
    const listApi = "/itinerary-items";

    return (
        <FormProvider>
            <TitleBox>
                <TitleBox.Header>Create Itinerary Item</TitleBox.Header>
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
                                        `/${env}/itinerary-items/edit/${id}`,
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

export function FormItineraryItemEdit({
    match: {
        params: { id },
    },
}) {
    const getApi = `/itinerary-items/${id}`;
    const listApi = "/itinerary-items";
    const putApi = `/itinerary-items/${id}`;

    return (
        <FormProvider>
            <FormContentLoader getApi={getApi} />

            <TitleBox>
                <TitleBox.Header>Edit Itinerary Item</TitleBox.Header>
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
