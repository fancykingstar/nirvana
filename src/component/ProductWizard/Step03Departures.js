import React from "react";
import useSWR from "swr";
import qs from "querystring";

import FormFieldDebug from "../FormFieldDebug";
import ButtonEnvLink from "../ButtonEnvLink";
import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import FormFieldLinkedSingleSelect from "../FormFieldLinkedSingleSelect";
import FormFieldProductCode from "../FormFieldProductCode";
import FormFieldRenderState from "../FormFieldRenderState";
import FormFieldRichText from "../FormFieldRichText";
import FormFieldString from "../FormFieldString";
import { FormFieldButtonSave, FormFieldButtonBlock } from "../FormFieldButton";
import { useFormField } from "../../hooks/useFormContext";

function requirementsMet(state) {
    return true;
}

function pureSortByOrdering(xs) {
    return [...(xs ?? [])].sort((lhs, rhs) => lhs.ordering - rhs.ordering);
}

function pureSortItineraryItems(xs) {
    return [...(xs ?? [])].sort(function compareItineraryItems(lhs, rhs) {
        if (lhs.start_day === rhs.start_day) {
            return lhs.ordering - lhs.ordering;
        }

        return lhs.start_day - rhs.start_day;
    });
}

export default function Step03Departures({
    match: {
        params: { id },
    },
}) {
    const [productItineraries] = useFormField("itineraries", null);
    const { data: itineraries } = useSWR(
        productItineraries
            ? `/itineraries?${qs.encode({
                  id_in: productItineraries.map((pi) => pi.itinerary),
              })}`
            : null,
    );

    const sortedItineraryItems = React.useMemo(
        () =>
            pureSortByOrdering(productItineraries ?? [])
                .map((pi) =>
                    (itineraries ?? []).find((i) => i.id == pi.itinerary),
                )
                .filter(Boolean)
                .map((itinerary) =>
                    pureSortItineraryItems(itinerary.itinerary_items),
                )
                .reduce(
                    (acc, val) => [
                        ...acc,
                        ...val.map(
                            ({ end_day, start_day, ...itineraryItem }) => ({
                                ...itineraryItem,
                                endDay:
                                    end_day + (acc.slice(-1)[0]?.endDay ?? 0),
                                startDay:
                                    start_day + (acc.slice(-1)[0]?.endDay ?? 0),
                            }),
                        ),
                    ],
                    [],
                ),

        [(productItineraries, itineraries)],
    );

    console.log({ sortedItineraryItems });

    return (
        <FormFieldGrid>
            <div className="form-field-grid-row-all">
                <h2 className="text-xl">Step 3: Departures</h2>
            </div>

            <FormContentLoader getApi={`/products/${id}`} />

            <FormFieldDebug />

            <FormFieldString required label="Name" prop="name" />

            <ol className="list-disc form-field-grid-row-input ">
                {sortedItineraryItems.map(({ id, name, startDay, endDay }) => (
                    <li key={id}>
                        {startDay} - {endDay} {name}
                    </li>
                ))}
            </ol>

            <hr className="form-field-grid-row-all" />

            <FormFieldButtonBlock>
                <ButtonEnvLink
                    to={`/wizard/product/${id}/itinerary`}
                    color="blue"
                >
                    Back
                </ButtonEnvLink>
                <FormFieldRenderState>
                    {(state) => (
                        <ButtonEnvLink
                            to={`/wizard/product/${id}/itinerary`}
                            color="blue"
                            disabled={!requirementsMet(state)}
                        >
                            Next
                        </ButtonEnvLink>
                    )}
                </FormFieldRenderState>
            </FormFieldButtonBlock>
        </FormFieldGrid>
    );
}
