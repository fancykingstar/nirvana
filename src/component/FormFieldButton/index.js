import React from "react";
import { mutate } from "swr";
import { mutateMany } from "swr-mutate-many";
import { useHistory } from "react-router-dom";

import { TitleBoxModal, FormContext } from "@imagine-developer/utopia-forms";

import { useAPIFetch } from "../AppContextProvider";
import { useToast } from "../ToastProvider";
import classed from "../ClassedComponent";

import FormFieldButton from "../Button";

function noop() {}

export const FormFieldButtonBlock = classed.div(
    "flex",
    "form-field-grid-row-input",
);

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

export function FormFieldButtonDelete({
    nameProp,
    listApi,
    deleteApi,
    onDeleted = noop,
    children,
}) {
    const fetcher = useAPIFetch();
    const { addToast, removeToast } = useToast();

    const {
        state: { local },
    } = React.useContext(FormContext);

    async function onDelete(onClose) {
        const startSaveToastId = addToast({
            title: "Deleting",
            message: local[nameProp],
        });

        try {
            await fetcher(deleteApi, {
                method: "DELETE",
            });

            onClose();
            onDeleted();

            removeToast(startSaveToastId);

            addToast({
                color: "green",
                title: "Deleted",
                timeout: 3000,
                message: local[nameProp],
            });

            mutateMany(`${listApi}*`);
        } catch (e) {
            removeToast(startSaveToastId);

            addToast({
                color: "red",
                title: "Delete Failed",
                timeout: 3000,
                message: Object.values(e).join("\n"),
            });
        }
    }

    return (
        <TitleBoxModal
            buttonText={children ? children : "Delete"}
            buttonColor="red"
            Header={() => <React.Fragment>Confirm Delete</React.Fragment>}
        >
            {({ onClose }) => (
                <React.Fragment>
                    <div>
                        Are you sure you want to delete{" "}
                        {`"${local[nameProp]}"?`}
                    </div>

                    <div className="flex justify-between">
                        <FormFieldButton color="green" onClick={onClose}>
                            No, Go Back
                        </FormFieldButton>
                        <FormFieldButton
                            color="red"
                            onClick={onDelete.bind(null, onClose)}
                        >
                            Yes, Delete
                        </FormFieldButton>
                    </div>
                </React.Fragment>
            )}
        </TitleBoxModal>
    );
}
export function FormFieldButtonSave({
    nameProp,
    listApi,
    getApi,
    putApi,
    onSaved = noop,
    children,
}) {
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

        try {
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

            onSaved();
        } catch (e) {
            removeToast(startSaveToastId);

            addToast({
                color: "red",
                title: "Save Failed",
                timeout: 3000,
                message: Object.values(e).join("\n"),
            });
        }
    }

    return (
        <FormFieldButton color="blue" onClick={onSave}>
            {children ? children : "Save"}
        </FormFieldButton>
    );
}

export function FormFieldButtonCreate({
    nameProp,
    listApi,
    createApi,
    onCreated = noop,
}) {
    const fetcher = useAPIFetch();
    const { addToast, removeToast } = useToast();

    const {
        state: { local },
    } = React.useContext(FormContext);

    async function onCreate() {
        const startSaveToastId = addToast({
            title: "Creating",
            message: local[nameProp],
        });

        try {
            const response = await fetcher(createApi, {
                method: "POST",
                body: JSON.stringify(local),
            });

            removeToast(startSaveToastId);

            addToast({
                color: "green",
                title: "Created",
                timeout: 3000,
                message: local[nameProp],
            });

            const { id } = response;

            mutate(listApi);

            onCreated(id);
        } catch (e) {
            removeToast(startSaveToastId);

            addToast({
                color: "red",
                title: "Create Failed",
                timeout: 3000,
                message: Object.values(e).join("\n"),
            });
        }
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
