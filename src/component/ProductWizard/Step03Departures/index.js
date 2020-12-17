import React from "react";
import useSWR from "swr";

import ButtonEnvLink from "../../ButtonEnvLink";
import FormContentLoader from "../../FormContentLoader";
import FormFieldGrid from "../../FormFieldGrid";
import { useFormField } from "../../../hooks/useFormContext";
import { FormFieldButtonBlock } from "../../FormFieldButton";

import useSortedItineraryItems from "./useSortedItineraryItems";
import CreateNewDepartureModal from "./CreateNewDepartureModal";
import DepartureEditor from "./DepartureEditor";

export default function Step03Departures({
    match: {
        params: { id },
    },
}) {
    const sortedItineraryItems = useSortedItineraryItems();
    const [departures] = useFormField("departures", []);
    const [accommodation] = useFormField("primary_accommodation", null);

    const {
        data: { accommodation_grades: accommodationGrades = [] } = {},
    } = useSWR(accommodation ? `/accommodations/${accommodation.id}` : null);

    return (
        <FormFieldGrid>
            <div className="form-field-grid-row-all">
                <h2 className="text-xl">Step 3: Departures</h2>
            </div>

            <FormContentLoader getApi={`/products/${id}`} />

            {[...(departures ?? [])]
                .sort(
                    (lhs, rhs) =>
                        new Date(lhs.date).getTime() -
                        new Date(rhs.date).getTime(),
                )
                .map(({ id }) => (
                    <DepartureEditor
                        key={id}
                        id={id}
                        sortedItineraryItems={sortedItineraryItems}
                    />
                ))}

            <div className="form-field-grid-row-input">
                <CreateNewDepartureModal
                    accommodationGrades={accommodationGrades}
                />
            </div>

            <hr className="form-field-grid-row-all" />

            <FormFieldButtonBlock>
                <ButtonEnvLink
                    to={`/wizard/product/${id}/itinerary`}
                    color="blue"
                >
                    Back
                </ButtonEnvLink>
                <ButtonEnvLink
                    to={`/wizard/product/${id}/meta-groups`}
                    color="blue"
                >
                    Next
                </ButtonEnvLink>
            </FormFieldButtonBlock>
        </FormFieldGrid>
    );
}
