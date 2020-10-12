import React from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";

import ModalPortal from "../ModalPortal";

const ToastContext = React.createContext({});

const ToastsContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
`;

const ToastWrapper = styled.div`
    padding: 0.5rem;
`;

const ToastContainer = styled.div`
    padding: 0.5rem;
    border-style: solid;
    border-width: 2px;
    border-color: ${({ color }) => color || "grey"};
    background-color: white;
`;

const ToastTitle = styled.div`
    padding: 0.25rem 0;
    font-size: 1.25em;
    font-weight: bold;
`;

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
    const [toasts, dispatch] = React.useReducer((state = {}, action) => {
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
                            <ToastContainer color={color}>
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
