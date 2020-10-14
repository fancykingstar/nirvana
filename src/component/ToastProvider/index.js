import React from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";

import ModalPortal from "../ModalPortal";

const ToastContext = React.createContext({});

const ToastsContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: ${(x) => x.theme.size[0]};
`;

const ToastWrapper = styled.div`
    padding: ${(x) => x.theme.size[2]};
    pointer-events: all;
`;

const ToastContainer = styled.div`
    background-color: white;
    border-color: ${({ color }) => color || "grey"};
    border-style: solid;
    border-width: 2px;
    padding: ${(x) => x.theme.size[3]} ${(x) => x.theme.size[4]};
    position: relative;
    font-size: ${(x) => x.theme.text[2]};
`;

const ToastClose = styled.div`
    position: absolute;
    top: ${(x) => x.theme.size[1]};
    right: ${(x) => x.theme.size[1]};
    font-size: ${(x) => x.theme.text[3]};
`;

const ToastTitle = styled.div`
    padding-bottom: ${(x) => x.theme.size[1]};
    font-size: ${(x) => x.theme.text[3]};
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
