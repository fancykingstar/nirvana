import React from "react";

import { FormProvider, useFormField } from "../../hooks/useFormContext";

import Button from "../Button";
import FormFieldGrid from "../FormFieldGrid";
import FormFieldLabel from "../FormFieldLabel";
import TitleBox from "../TitleBox";
import { RequiredFormFields } from "../FormItineraryItem";

function NewItemCreator() {
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
                <TitleBox.Header>Create New Itinerary Item</TitleBox.Header>
                <TitleBox.Body>
                    <FormFieldGrid>
                        <RequiredFormFields />
                    </FormFieldGrid>
                </TitleBox.Body>
            </TitleBox>
        </FormProvider>
    );
}

export default function FormFieldItineraryItems() {
    const [itineraryItems, setItineraryItems] = useFormField("itinerary_items");

    return (
        <React.Fragment>
            <hr className="form-field-grid-row-all" />
            <FormFieldLabel>Items</FormFieldLabel>
            <div className="form-field-grid-row-input p-1">
                <NewItemCreator
                    itineraryItems={itineraryItems}
                    setItineraryItems={setItineraryItems}
                />
            </div>
        </React.Fragment>
    );
}
