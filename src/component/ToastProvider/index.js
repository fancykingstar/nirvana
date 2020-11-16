import React from "react";
import { nanoid } from "nanoid";

import ModalPortal from "../ModalPortal";
import classed from "../ClassedComponent";

const ToastContext = React.createContext({});

const ToastsContainer = classed.div("items-center", "flex", "flex-col", "p-1");

const ToastWrapper = classed.div("p-2", "pointer-events-auto");

const ToastContainer = classed.div(
    "bg-white",
    "border",
    "border-gray-500",
    "px-3",
    "py-4",
    "relative",
    "text-lg",
);

const ToastClose = classed.div(
    "absolute",
    "top-0",
    "right-0",
    "m-1",
    "text-xl",
);

const ToastTitle = classed.div("pb-2", "text-lg", "font-bold");

export function useToast() {
    const dispatch = React.useContext(ToastContext);

    return {
        removeToast: (id) => dispatch({ type: "REMOVE", id }),

        addToast: (toast) => {
            const id = nanoid();

            dispatch({
                type: "ADD",
                toast: {
                    ...toast,
                    id,
                    created: new Date(),
                },
            });

            setTimeout(() => {
                dispatch({ type: "REMOVE", id });
            }, toast.timeout || 5000);

            return id;
        },
    };
}

export default function ToastProvider({ children }) {
    const [toasts, dispatch] = React.useReducer((state, action) => {
        switch (action.type) {
            case "ADD":
                return {
                    ...state,
                    [action.toast.id]: action.toast,
                };

            case "REMOVE": {
                const newState = { ...state };
                delete newState[action.id];
                return newState;
            }

            default:
                return state;
        }
    }, {});

    const toastsSorted = React.useMemo(
        () =>
            Object.values(toasts).sort(
                (lhs, rhs) => lhs.created.getTime() - rhs.created.getTime(),
            ),
        [toasts],
    );

    return (
        <ToastContext.Provider value={dispatch}>
            {children}
            <ModalPortal>
                <ToastsContainer>
                    {toastsSorted.map(({ id, color, title, message }) => (
                        <ToastWrapper key={id}>
                            <ToastContainer
                                color={color}
                                onClick={() => dispatch({ type: "REMOVE", id })}
                            >
                                <ToastClose>✕</ToastClose>
                                <ToastTitle>{title}</ToastTitle>
                                {message}
                            </ToastContainer>
                        </ToastWrapper>
                    ))}
                </ToastsContainer>
            </ModalPortal>
        </ToastContext.Provider>
    );
}
