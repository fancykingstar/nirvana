import React from "react";

import classed from "../../ClassedComponent";

const ItineraryMoveButton = classed.button(
    "bg-gray-600",
    "cursor-pointer",
    "no-underline",
    "px-3",
    "py-1",
    "shadow",
    "text-base",
    "text-white",

    "hover:bg-gray-700",
    "hover:shadow-md",
    "hover:text-gray-100",
);

export default function ItineraryMover({
    id,
    deleteItinerary,
    swapWithPrev,
    swapWithNext,
}) {
    return (
        <div className="flex items-stretch pr-2">
            <ItineraryMoveButton
                className="bg-red-500 rounded-l"
                onClick={deleteItinerary.bind(null, id)}
            >
                &#10005;
            </ItineraryMoveButton>
            <ItineraryMoveButton className="" onClick={swapWithPrev}>
                ▲
            </ItineraryMoveButton>
            <ItineraryMoveButton className="rounded-r" onClick={swapWithNext}>
                ▼
            </ItineraryMoveButton>
        </div>
    );
}
