import React from "react";
import useSWR from "swr";

import { FormProvider, useFormField } from "../../hooks/useFormContext";

import Button from "../Button";
import FormContentLoader from "../FormContentLoader";
import FormFieldViewProp from "../FormFieldViewProp";
import FormFieldGrid from "../FormFieldGrid";
import FormFieldLabel from "../FormFieldLabel";
import FormFieldStatic from "../FormFieldStatic";
import FormFieldUUID from "../FormFieldUUID";
import TitleBox from "../TitleBox";
import { RequiredFormFields } from "../FormItineraryItem";

import {
    FormFieldButtonBlock,
    FormFieldButtonCreate,
    FormFieldButtonSave,
} from "../FormFieldButton";

function NewItemCreator({ itineraryId, invalidateLocalCache }) {
    const [showCreator, setShowCreator] = React.useState(false);

    if (!showCreator) {
        return (
            <Button onClick={setShowCreator.bind(null, true)} color="green">
                Add New Itinarary Item
            </Button>
        );
    }

    return (
        <FormProvider>
            <TitleBox>
                <ItemHeader i={"Create"} />
                <TitleBox.Body>
                    <FormFieldGrid>
                        <FormFieldUUID prop="uid" />
                        <FormFieldStatic prop="itinerary" value={itineraryId} />

                        <RequiredFormFields />

                        <FormFieldButtonBlock>
                            <FormFieldButtonCreate
                                nameProp="name"
                                createApi={"/itinerary-items"}
                                listApi={"/itinerary-items"}
                                onCreated={() => {
                                    setShowCreator(false);
                                    invalidateLocalCache();
                                }}
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox.Body>
            </TitleBox>
        </FormProvider>
    );
}

function ItemHeader({ i }) {
    return (
        <TitleBox.Header>
            {i}
            {". "}
            <FormFieldViewProp prop="name" />
            {" ["}
            <FormFieldViewProp prop="start_day" />
            {" - "}
            <FormFieldViewProp prop="end_day" />
            {" ("}
            <FormFieldViewProp prop="ordering" />
            {")]"}
        </TitleBox.Header>
    );
}

function InlineItemForm({
    i,
    id,
    name,
    start_day,
    end_day,
    isOpen,
    setOpenItem,
}) {
    const getApi = `/itinerary-items/${id}`;

    if (!isOpen) {
        return (
            <div onClick={setOpenItem.bind(null, id)} className="flex">
                {i + 1}.
                <div className=" text-blue-600 hover:text-blue-900 underline cursor-pointer">
                    {`"${name}" (${start_day} - ${end_day})`}
                </div>
            </div>
        );
    }

    return (
        <FormProvider>
            <FormContentLoader getApi={getApi} />

            <TitleBox>
                <ItemHeader i={i + 1} />
                <TitleBox.Body>
                    <FormFieldGrid>
                        <RequiredFormFields />

                        <FormFieldButtonBlock>
                            <FormFieldButtonSave
                                nameProp="name"
                                putApi={`/itinerary-items/${id}`}
                                getApi={`/itinerary-items/${id}`}
                                listApi={`/itinerary-items`}
                                onSaved={setOpenItem.bind(null, null)}
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox.Body>
            </TitleBox>
        </FormProvider>
    );
}

export default function FormFieldItineraryItems() {
    const [itineraryId] = useFormField("id");
    const [openItem, setOpenItem] = React.useState(null);

    const { data: itineraryItems = [], mutate } = useSWR(
        `/itinerary-items?itinerary.id=${itineraryId}`,
    );

    const itineraryItemsSorted = React.useMemo(
        () =>
            [...itineraryItems].sort(function compareItineraryItems(lhs, rhs) {
                if (lhs.start_day === rhs.start_day) {
                    return lhs.ordering - lhs.ordering;
                }

                return lhs.start_day - rhs.start_day;
            }),
        [itineraryItems],
    );

    return (
        <React.Fragment>
            <hr className="form-field-grid-row-all" />
            <FormFieldLabel>Items</FormFieldLabel>
            <div className="form-field-grid-row-input p-1">
                {itineraryItemsSorted.map((itineraryItem, i) => (
                    <InlineItemForm
                        key={itineraryItem.id}
                        {...itineraryItem}
                        i={i}
                        setOpenItem={setOpenItem}
                        isOpen={openItem === itineraryItem.id}
                    />
                ))}
                <NewItemCreator
                    itineraryId={itineraryId}
                    invalidateLocalCache={mutate}
                />
            </div>
            <hr className="form-field-grid-row-all" />
        </React.Fragment>
    );
}