import React from "react";
import useSWR from "swr";

import EnvLink from "../../EnvLink";
import FormFieldDebug from "../../FormFieldDebug";
import { useFormField } from "../../../hooks/useFormContext";

import ItineraryMover from "./ItineraryMover";

export default function ProductItinerary() {
    const [itineraryId] = useFormField("itinerary");

    const { data } = useSWR(`/itineraries/${itineraryId}`);

    const itineraryItemsSorted = React.useMemo(
        () =>
            (data?.itinerary_items ?? []).sort(
                (lhs, rhs) => lhs.ordering - rhs.ordering,
            ),
        [data],
    );

    async function deleteItinerary() {}
    async function swapWithPrev() {}
    async function swapWithNext() {}

    if (!data) {
        return <div> loading...</div>;
    }

    return (
        <div className="form-field-grid-row-input">
            <h4 className="text-sm flex items-end pb-2">
                <ItineraryMover
                    id={itineraryId}
                    deleteItinerary={deleteItinerary}
                    swapWithPrev={swapWithPrev}
                    swapWithNext={swapWithNext}
                />
                <span className="text-lg font-bold">{data.name}</span>
                <span className="px-2">
                    (used in <strong>{data.products.length}</strong> places)
                </span>
                <EnvLink to={`/itineraries/edit/${itineraryId}`}>View</EnvLink>
            </h4>
            <ol className="list-disc pl-4">
                {itineraryItemsSorted.map(
                    ({ id, name, start_day, end_day }) => (
                        <li key={id}>
                            ({start_day} - {end_day}) {name}
                        </li>
                    ),
                )}
            </ol>
            <FormFieldDebug />
        </div>
    );
}
