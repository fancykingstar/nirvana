import React from "react";

import { useFormField } from "../../hooks/useFormContext";

import { RequiredFormFields } from "../FormItineraryItem";

import FormFieldSubformMultiple from "../FormFieldSubformMultiple";

function compareItineraryItems(lhs, rhs) {
    if (lhs.start_day === rhs.start_day) {
        return lhs.ordering - lhs.ordering;
    }

    return lhs.start_day - rhs.start_day;
}

function ItineraryItemPreview({ i, id, name, start_day, end_day, openItem }) {
    return (
        <li onClick={openItem.bind(null, id)}>
            <span>{i + 1}</span>
            <span className="pl-1 text-blue-600 hover:text-blue-900 underline cursor-pointer">
                {`"${name}" (${start_day} - ${end_day})`}
            </span>
        </li>
    );
}

function FieldsCreate() {
    return (
        <React.Fragment>
            <RequiredFormFields />
        </React.Fragment>
    );
}

export default function FormFieldItineraryItems() {
    const [itineraryId] = useFormField("id");

    return (
        <FormFieldSubformMultiple
            RenderCreateFields={FieldsCreate}
            RenderEditFields={RequiredFormFields}
            RenderPreview={ItineraryItemPreview}
            compareFn={compareItineraryItems}
            createApi="/itinerary-items"
            getEditRoute={(id) => `/itinerary-items/edit/${id}`}
            getGetApi={(id) => `/itinerary-items/${id}`}
            getPutApi={(id) => `/itinerary-items/${id}`}
            label="Items"
            listApi={`/itinerary-items?itinerary.id=${itineraryId}`}
            parentId={itineraryId}
            parentProp="itinerary"
        />
    );
}
