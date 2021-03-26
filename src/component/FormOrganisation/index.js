import React from "react";

import {
    FormFieldMultiple,
    FormFieldLabel,
    FormFieldAsset,
    FormFieldLinkedUtopiaEntity,
    FormFieldRichText,
    FormFieldString,
    FormProvider,
    SubFormProvider,
} from "@imagine-developer/utopia-forms";

import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import FormFieldLinkedMany from "../FormFieldLinkedMany";
import FormFieldUUID from "../FormFieldUUID";
import TitleBox from "../TitleBox";

import {
    FormFieldButtonBlock,
    FormFieldButtonReset,
    FormFieldButtonCreate,
    FormFieldButtonSave,
} from "../FormFieldButton";

function CopyItem({ prop, label }) {
    return (
        <SubFormProvider prop={prop} defaultValue={{}}>
            <FormFieldLabel>{label}</FormFieldLabel>

            <FormFieldGrid className="form-field-grid-row-input">
                <FormFieldString prop="title" label="Title" />
                <FormFieldLinkedUtopiaEntity
                    LinkedOf={FormFieldAsset}
                    collectionType="assets"
                    prop="image"
                    label="Image"
                />
                <FormFieldRichText prop="description" label="Body" />
            </FormFieldGrid>
        </SubFormProvider>
    );
}

function FormFields() {
    return (
        <React.Fragment>
            <FormFieldString prop="name" label="Name" />
            <FormFieldString prop="label" label="Label" />
            <FormFieldRichText prop="description" label="Description" />
            <FormFieldMultiple
                label="Media"
                prop="media"
                addNewButton="Add New Image"
                MultipleOf={FormFieldAsset}
            />
            <hr className="form-field-grid-row-all" />
            <SubFormProvider prop="copy_items" defaultValue={{}}>
                <CopyItem prop="accommodation" label="Accommodation" />
                <hr className="form-field-grid-row-all" />
                <CopyItem prop="activities" label="Activities" />
                <hr className="form-field-grid-row-all" />
                <CopyItem prop="dining" label="Dining" />
                <hr className="form-field-grid-row-all" />
                <CopyItem prop="entertainment" label="Entertainment" />
                <hr className="form-field-grid-row-all" />
                <CopyItem prop="events" label="Events" />
                <hr className="form-field-grid-row-all" />
                <CopyItem prop="experience" label="Experience" />
                <hr className="form-field-grid-row-all" />
            </SubFormProvider>

            <hr className="form-field-grid-row-all" />
        </React.Fragment>
    );
}

export function FormOrganisationCreate({
    match: {
        params: { env },
    },
    history,
}) {
    const createApi = "/organisations";
    const listApi = "/organisations";

    return (
        <FormProvider>
            <TitleBox>
                <TitleBox.Header>Create Organisation</TitleBox.Header>
                <TitleBox.Body>
                    <FormFieldGrid>
                        <FormFieldUUID prop="uid" />

                        <FormFields />

                        <FormFieldButtonBlock>
                            <FormFieldButtonReset />
                            <FormFieldButtonCreate
                                nameProp="name"
                                createApi={createApi}
                                listApi={listApi}
                                onCreated={(id) =>
                                    history.push(
                                        `/${env}/organisations/edit/${id}`,
                                    )
                                }
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox.Body>
            </TitleBox>
        </FormProvider>
    );
}

export function FormOrganisationEdit({
    match: {
        params: { id },
    },
}) {
    const getApi = `/organisations/${id}`;
    const listApi = "/organisations";
    const putApi = `/organisations/${id}`;

    return (
        <FormProvider>
            <FormContentLoader getApi={getApi} />

            <TitleBox>
                <TitleBox.Header>Edit Organisation</TitleBox.Header>
                <TitleBox.Body>
                    <FormFieldGrid className="organisation-block-bx">
                        <FormFields />

                        <FormFieldLinkedMany
                            label="Accommodations"
                            prop="accommodations"
                            searchProp="name"
                            RenderLinked={function LinkedAccomodation({
                                id,
                                name,
                                remove,
                            }) {
                                return (
                                    <li onClick={remove.bind(null, id)}>
                                        {name}
                                    </li>
                                );
                            }}
                            RenderSearchResult={function ResultAccomodation({
                                id,
                                name,
                                add,
                            }) {
                                return (
                                    <li onClick={add.bind(null, id)}>{name}</li>
                                );
                            }}
                        />

                        <FormFieldButtonBlock className="save-btn-list">
                            <FormFieldButtonReset />
                            <FormFieldButtonSave
                                color="orange"
                                nameProp="name"
                                putApi={putApi}
                                getApi={getApi}
                                listApi={listApi}
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox.Body>
            </TitleBox>
        </FormProvider>
    );
}
