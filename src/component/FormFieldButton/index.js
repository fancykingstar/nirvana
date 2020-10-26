import React from "react";
import styled from "styled-components";
import { mutate } from "swr";
import { mutateMany } from "swr-mutate-many";
import { useHistory } from "react-router-dom";

import { useAPIFetch } from "../AppContextProvider";
import { useToast } from "../ToastProvider";

import { FormContext } from "../../hooks/useFormContext";

export const FormFieldButton = styled.button`
    background-color: ${(p) => p.theme.color[p.color || "white"]};
    border-radius: ${(p) => p.theme.size[0]};
    color: ${(p) => (p.color ? p.theme.color.white : p.theme.color.black)};
    cursor: pointer;
    padding: ${(p) => p.theme.size[0]} ${(p) => p.theme.size[1]};

    ${(p) => p.theme.shadow[2]};
`;

export const FormFieldButtonBlock = styled.div`
    display: flex;
    grid-column: input / input;

    ${FormFieldButton} {
        border-radius: 0;
    }

    ${FormFieldButton}:first-child {
        border-top-left-radius: ${(p) => p.theme.size[0]};
        border-bottom-left-radius: ${(p) => p.theme.size[0]};
    }

    ${FormFieldButton}:last-child {
        border-top-right-radius: ${(p) => p.theme.size[0]};
        border-bottom-right-radius: ${(p) => p.theme.size[0]};
    }
`;

export function FormFieldButtonReset() {
    const { dispatch } = React.useContext(FormContext);

    return (
        <FormFieldButton
            color="red"
            onClick={dispatch.bind(null, { type: "RESET" })}
        >
            Reset
        </FormFieldButton>
    );
}

export function FormFieldButtonSave({ nameProp, listApi, getApi, putApi }) {
    const fetcher = useAPIFetch();
    const { addToast, removeToast } = useToast();

    const {
        state: { local },
    } = React.useContext(FormContext);

    async function onSave() {
        const startSaveToastId = addToast({
            title: "Saving",
            message: local[nameProp],
        });

        mutate(getApi, local, false);

        await fetcher(putApi, {
            method: "PUT",
            body: JSON.stringify(local),
        });

        removeToast(startSaveToastId);

        addToast({
            color: "green",
            title: "Saved",
            timeout: 3000,
            message: local[nameProp],
        });

        mutate(getApi);
        mutateMany(`${listApi}*`);
    }

    return (
        <FormFieldButton color="blue" onClick={onSave}>
            Save
        </FormFieldButton>
    );
}

export function FormFieldButtonCreate({
    nameProp,
    listApi,
    createApi,
    getPushToEditRoute,
}) {
    const fetcher = useAPIFetch();
    const { addToast, removeToast } = useToast();
    const { push } = useHistory();

    const {
        state: { local },
    } = React.useContext(FormContext);

    async function onCreate() {
        const startSaveToastId = addToast({
            title: "Creating",
            message: local[nameProp],
        });

        const response = await fetcher(createApi, {
            method: "POST",
            body: JSON.stringify(local),
        });

        removeToast(startSaveToastId);

        addToast({
            color: "green",
            title: "Saved",
            timeout: 3000,
            message: local[nameProp],
        });

        const { id } = response;

        mutate(listApi);

        push(getPushToEditRoute(id));
    }

    return (
        <FormFieldButton color="green" onClick={onCreate}>
            Create
        </FormFieldButton>
    );
}

export function FormFieldButtonDuplicate({
    nameProp,
    listApi,
    duplicateApi,
    getPushToEditRoute,
}) {
    const fetcher = useAPIFetch();
    const { addToast, removeToast } = useToast();
    const { push } = useHistory();

    const {
        state: { local },
    } = React.useContext(FormContext);

    async function onDuplicate() {
        const startSaveToastId = addToast({
            title: "Duplicating",
            message: local[nameProp],
        });

        const response = await fetcher(duplicateApi, {
            method: "POST",
        });

        removeToast(startSaveToastId);

        addToast({
            color: "green",
            title: "Duplicated",
            timeout: 3000,
            message: local[nameProp],
        });

        const { id } = response;

        mutate(listApi);

        push(getPushToEditRoute(id));
    }

    return (
        <FormFieldButton color="orange" onClick={onDuplicate}>
            Duplicate
        </FormFieldButton>
    );
}

export default FormFieldButton;
