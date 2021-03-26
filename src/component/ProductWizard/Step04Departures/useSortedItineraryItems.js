import React from "react";
import useSWR from "swr";
import qs from "querystring";

import { useFormField } from "../../../hooks/useFormContext";

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

export default function useSortedItineraryItems() {
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

    return sortedItineraryItems;
}
