import React from "react";
import { mutateMany } from "swr-mutate-many";

import { ControlSectionContainer } from "./styled";

import { useAPIFetch } from "../AppContextProvider";
import { useToast } from "../ToastProvider";
import Button from "../Button";

export default function DeleteSelected({
    checked,
    clearChecked,
    listApi,
    getDeleteApi,
}) {
    const fetcher = useAPIFetch();
    const { addToast, removeToast } = useToast();

    const checkedCount = Object.values(checked).reduce(
        (acc, val) => (val ? acc + 1 : acc),
        0,
    );

    async function deleteEntry(id) {
        const startSaveToastId = addToast({
            title: "deleteing",
            message: id,
            timeout: 1000,
        });

        await fetcher(getDeleteApi(id), {
            method: "DELETE",
        });

        removeToast(startSaveToastId);

        addToast({
            color: "green",
            title: "Deleted",
            timeout: 500,
            message: id,
        });
    }

    async function onDelete() {
        const idsToDelete = Object.entries(checked)
            .filter((x) => x[1])
            .map(([key]) => key);

        for (const id of idsToDelete) {
            await deleteEntry(id);
        }

        mutateMany(`${listApi}*`);

        addToast({
            color: "green",
            title: "Deleted All",
            timeout: 1000,
        });

        clearChecked();
    }

    if (checkedCount === 0) {
        return null;
    }

    return (
        <ControlSectionContainer>
            <div>{checkedCount} entries selected</div>

            <Button onClick={onDelete}>delete</Button>
        </ControlSectionContainer>
    );
}
