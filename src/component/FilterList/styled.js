import classed from "../ClassedComponent";

import "./index.css";

export const TableContainer = classed.div("block", "p-1", "relative");

export const LoadingOverlay = classed.div(
    "absolute",
    "inset-0",
    "m-1",

    "flex",
    "items-center",
    "justify-center",
    "text-white",
    "text-xl",
    "bg-gray-400",

    "semi-transparent-black-background",
);

export const TableStyled = classed.table(
    "w-full",
    "table-with-alternating-rows",
);

`
    thead,
    tfoot {
        background-color:
    }

    tbody tr:nth-child(odd) {
        background-color:
    }

    tbody tr:nth-child(even) {
        background-color:
    }
`;

export const ControlSectionContainer = classed.div(
    "p-1",
    "border-b-2",
    "border-gray-500",
);

export const Cell = classed.td("px-0", "py-1");

export const LoadingCell = classed(Cell);

export const ControlCell = classed(
    Cell,
    "cursor-pointer",
    "relative",
    "control-cell-with-indicator",
    ({ arrowDirection }) => {
        if (arrowDirection === "ASC") {
            return "control-cell-with-indicator-up";
        }

        if (arrowDirection === "DESC") {
            return "control-cell-with-indicator-down";
        }
    },
);
