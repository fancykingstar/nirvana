import React from "react";
import useSWR from "swr";

import {
    FormFieldMultiple,
    FormFieldAsset,
} from "@imagine-developer/utopia-forms";

import FormContentLoader from "../FormContentLoader";
import FormFieldBoolean from "../FormFieldBoolean";
import FormFieldGrid from "../FormFieldGrid";
import FormFieldItemOrder from "./FormFieldItemOrder";
import FormFieldLatLong from "../FormFieldLatLong";
import FormFieldLinkedSingle from "../FormFieldLinkedSingle";
import FormFieldOneOfFieldsGroup from "../FormFieldOneOfFieldsGroup";
import FormFieldRichText from "../FormFieldRichText";
import FormFieldString from "../FormFieldString";
import FormFieldUUID from "../FormFieldUUID";
import TitleBox from "../TitleBox";
import { FormProvider } from "../../hooks/useFormContext";

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

function LinkedCity({ name, id }) {
    const { data: cityData } = useSWR(id ? `/cities/${id}` : null);

    return (
        <span>
            {name} ({cityData?.country?.name ?? "..."})
        </span>
    );
}
function LinkedPort({ name }) {
    return <span>{name}</span>;
}
function LinkedEvent({ name }) {
    return <span>{name}</span>;
}

function ResultCity({ id, name, set, country }) {
    return (
        <li onClick={set.bind(null, id)}>
            {name} ({country.name})
        </li>
    );
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

            <FormFieldRichText prop="description" label="Description" />

            <FormFieldMultiple
                label="Media"
                prop="media"
                addNewButton="Add New Image"
                MultipleOf={FormFieldAsset}
            />

            <FormFieldOneOfFieldsGroup label="Physical Location">
                <FormFieldOneOfFieldsGroup.Section
                    label="Coords"
                    id="coords"
                    props={["latitude", "longitude"]}
                    defaultValues={{ latitude: null, longitude: null }}
                    isActive={({ latitude, longitude }) =>
                        latitude || longitude
                    }
                >
                    <FormFieldLatLong />
                </FormFieldOneOfFieldsGroup.Section>

                <FormFieldOneOfFieldsGroup.Section
                    label="City"
                    id="city"
                    props={["city"]}
                    defaultValues={{ city: null }}
                    isActive={(item) => item?.city?.id}
                >
                    <FormFieldLinkedSingle
                        prop="city"
                        label="City"
                        searchProp="name"
                        searchApi="/cities"
                        RenderLinked={LinkedCity}
                        RenderSearchResult={ResultCity}
                    />
                </FormFieldOneOfFieldsGroup.Section>

                <FormFieldOneOfFieldsGroup.Section
                    label="Port"
                    id="port"
                    props={["port"]}
                    defaultValues={{ port: null }}
                    isActive={(item) => item?.port?.id}
                >
                    <FormFieldLinkedSingle
                        prop="port"
                        label="Port"
                        searchProp="name"
                        searchApi="/ports"
                        RenderLinked={LinkedPort}
                        RenderSearchResult={ResultPort}
                    />
                </FormFieldOneOfFieldsGroup.Section>

                <FormFieldOneOfFieldsGroup.Section
                    label="Event"
                    id="event"
                    props={["event"]}
                    defaultValues={{ event: null }}
                    isActive={(item) => item?.event?.id}
                >
                    <FormFieldLinkedSingle
                        prop="event"
                        label="Event"
                        searchProp="name"
                        searchApi="/events"
                        RenderLinked={LinkedEvent}
                        RenderSearchResult={ResultEvent}
                    />
                </FormFieldOneOfFieldsGroup.Section>
            </FormFieldOneOfFieldsGroup>
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
