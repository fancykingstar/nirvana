import React from "react";
import useSWR, { mutate } from "swr";

import Button from "../Button";
import EnvLink from "../EnvLink";
import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import FormFieldLabel from "../FormFieldLabel";
import FormFieldStatic from "../FormFieldStatic";
import FormFieldUUID from "../FormFieldUUID";
import TitleBox from "../TitleBox";
import { FormProvider } from "../../hooks/useFormContext";

import {
    FormFieldButtonBlock,
    FormFieldButtonCreate,
    FormFieldButtonSave,
} from "../FormFieldButton";

function CreateForm({
    RenderCreateFields,
    createApi,
    invalidateLocalCache,
    listApi,
    parentId,
    parentProp,
    mutateApis,
}) {
    const [isVisible, setIsVisible] = React.useState(false);

    if (!isVisible) {
        return (
            <Button onClick={setIsVisible.bind(null, true)} color="green">
                Add New
            </Button>
        );
    }

    return (
        <FormProvider>
            <TitleBox>
                <TitleBox.Header>Create</TitleBox.Header>
                <TitleBox.Body>
                    <FormFieldGrid>
                        <FormFieldUUID prop="uid" />
                        <FormFieldStatic prop={parentProp} value={parentId} />

                        <RenderCreateFields />

                        <FormFieldButtonBlock>
                            <Button
                                color="red"
                                onClick={setIsVisible.bind(null, false)}
                            >
                                Cancel
                            </Button>
                            <FormFieldButtonCreate
                                nameProp="name"
                                createApi={createApi}
                                listApi={listApi}
                                onCreated={() => {
                                    setIsVisible(false);
                                    invalidateLocalCache();

                                    for (const api of mutateApis) {
                                        mutate(api);
                                    }
                                }}
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox.Body>
            </TitleBox>
        </FormProvider>
    );
}

function EditForm({
    RenderEditFields,
    i,
    getEditRoute,
    getGetApi,
    getPutApi,
    item: { id },
    listApi,
    mutateApis,
    setOpenedItem,
}) {
    return (
        <FormProvider>
            <FormContentLoader getApi={getGetApi(id)} />

            <TitleBox>
                <TitleBox.Header>
                    <div className="flex-1">{i + 1}. Edit</div>
                    <EnvLink to={getEditRoute(id)} className="text-lg self-end">
                        Edit Details
                    </EnvLink>
                </TitleBox.Header>

                <TitleBox.Body>
                    <FormFieldGrid>
                        <RenderEditFields />

                        <FormFieldButtonBlock>
                            <Button
                                color="red"
                                onClick={setOpenedItem.bind(null, false)}
                            >
                                Cancel
                            </Button>

                            <FormFieldButtonSave
                                nameProp="name"
                                putApi={getPutApi(id)}
                                getApi={getGetApi(id)}
                                listApi={listApi}
                                onSaved={() => {
                                    setOpenedItem(false);

                                    for (const api of mutateApis) {
                                        mutate(api);
                                    }
                                }}
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox.Body>
            </TitleBox>
        </FormProvider>
    );
}

export default function FormFieldSubformMultiple({
    RenderCreateFields,
    RenderEditFields,
    RenderPreview,
    compareFn,
    createApi,
    getEditRoute,
    getGetApi,
    getPutApi,
    label,
    listApi,
    parentId,
    parentProp,
    mutateApis,
}) {
    const [openedItem, setOpenedItem] = React.useState(null);
    const { data: items = [], mutate: invalidateLocalCache } = useSWR(
        `${listApi}?${parentProp}.id=${parentId}`,
    );

    const itemsSorted = React.useMemo(() => [...items].sort(compareFn), [
        items,
    ]);

    return (
        <React.Fragment>
            <FormFieldLabel>{label}</FormFieldLabel>

            <div className="form-field-grid-row-input">
                <ol className="">
                    {itemsSorted.map((item, i) =>
                        item.id === openedItem ? (
                            <EditForm
                                key={item.id}
                                {...{
                                    i,
                                    RenderEditFields,
                                    getEditRoute,
                                    getGetApi,
                                    getPutApi,
                                    item,
                                    setOpenedItem,
                                    mutateApis,
                                }}
                            />
                        ) : (
                            <RenderPreview
                                key={item.id}
                                {...item}
                                i={i}
                                openItem={setOpenedItem}
                            />
                        ),
                    )}
                </ol>

                <CreateForm
                    {...{
                        RenderCreateFields,
                        createApi,
                        getEditRoute,
                        invalidateLocalCache,
                        listApi,
                        parentId,
                        parentProp,
                        mutateApis,
                    }}
                />
            </div>
        </React.Fragment>
    );
}
