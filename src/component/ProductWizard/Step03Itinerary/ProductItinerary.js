import React from "react";
import useSWR, { mutate } from "swr";

import EnvLink from "../../EnvLink";
import FormFieldDebug from "../../FormFieldDebug";
import { useAPIFetch } from "../../AppContextProvider";
import { useToast } from "../../ToastProvider";

import ItineraryMover from "./ItineraryMover";

function useSwapWith({ id, index, next, prev, productId }) {
    const fetch = useAPIFetch();
    const { addToast, removeToast } = useToast();

    async function swapOrderings({ self, other }) {
        await Promise.all([
            fetch(`/product-itineraries/${self.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    id: self.id,
                    ordering: other.index,
                }),
            }),
            fetch(`/product-itineraries/${other.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    id: other.id,
                    ordering: index,
                }),
            }),
        ]);

        await mutate(`/products/${productId}`);
    }

    async function swapWithPrev() {
        if (!prev) {
            return;
        }

        const toastId = addToast({
            title: "moving itineraries",
        });

        await swapOrderings({
            self: {
                id,
                index,
            },
            other: prev,
        });

        removeToast(toastId);
    }

    async function swapWithNext() {
        if (!next) {
            return;
        }

        const toastId = addToast({
            title: "moving itineraries",
        });

        await swapOrderings({
            self: {
                id,
                index,
            },
            other: next,
        });

        removeToast(toastId);
    }

    return { swapWithNext, swapWithPrev };
}

export default function ProductItinerary({
    id,
    index,
    itinerary: itineraryId,
    next,
    prev,
    product: productId,
}) {
    const fetch = useAPIFetch();
    const { data: itinerary } = useSWR(`/itineraries/${itineraryId}`);
    const { swapWithNext, swapWithPrev } = useSwapWith({
        id,
        index,
        next,
        prev,
        productId,
    });

    const itineraryItemsSorted = React.useMemo(
        () =>
            (itinerary?.itinerary_items ?? []).sort(
                (lhs, rhs) => lhs.ordering - rhs.ordering,
            ),
        [itinerary],
    );

    async function deleteItinerary() {
        await fetch(`/product-itineraries/${id}`, {
            method: "DELETE",
        });

        await mutate(`/products/${productId}`);
    }

    if (!itinerary) {
        return <div> loading...</div>;
    }

    return (
        <div className="form-field-grid-row-input">
            <h4 className="text-sm flex items-end pb-2">
                <ItineraryMover
                    deleteItinerary={deleteItinerary}
                    swapWithPrev={swapWithPrev}
                    swapWithNext={swapWithNext}
                />
                <span className="text-lg font-bold">{itinerary.name}</span>
                <span className="px-2">
                    (used in <strong>{itinerary.products.length}</strong>{" "}
                    places)
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
