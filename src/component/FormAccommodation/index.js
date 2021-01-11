import React from "react";

import {
    FormFieldAsset,
    FormFieldLabel,
    FormFieldLinkedUtopiaEntity,
    FormFieldRichText,
    FormFieldString,
    FormProvider,
    SubFormProvider,
} from "@imagine-developer/utopia-forms";

import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import TitleBox from "../TitleBox";

import FormFieldDebug from "../FormFieldDebug";
import FormFieldEnum from "../FormFieldEnum";
import FormFieldSubformMultiple from "../FormFieldSubformMultiple";
import FormFieldLinkedSingle from "../FormFieldLinkedSingle";
import FormFieldUUID from "../FormFieldUUID";

import { FormFields as AccommodationGradeFormFields } from "../FormAccommodationGrades";

import {
    FormFieldButtonBlock,
    FormFieldButtonReset,
    FormFieldButtonCreate,
    FormFieldButtonSave,
} from "../FormFieldButton";

function Linked({ name }) {
    return <span>{name}</span>;
}

function Result({ id, name, set }) {
    return <li onClick={set.bind(null, id)}>{name}</li>;
}

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

export function FormFields() {
    return (
        <React.Fragment>
            <FormFieldDebug />

            <FormFieldString required prop="name" label="Name" />
            <FormFieldString required prop="label" label="Label" />

            <FormFieldEnum
                required
                prop="accommodation_type"
                label="Accommodation Type"
                defaultValue="Ship"
            >
                <FormFieldEnum.Option value="Ship">Ship</FormFieldEnum.Option>
            </FormFieldEnum>

            <FormFieldRichText prop="description" label="Description" />

            <hr className="form-field-grid-row-all" />

            <SubFormProvider prop="copy_items" defaultValue={{}}>
                <FormFieldLinkedUtopiaEntity
                    LinkedOf={FormFieldAsset}
                    collectionType="assets"
                    prop="lifestyleHeroBanner"
                    label="Lifestyle Hero Banner"
                />
                <hr className="form-field-grid-row-all" />
                <CopyItem prop="keyFacts" label="Key Facts" />
                <hr className="form-field-grid-row-all" />
                <CopyItem prop="entertainment" label="Entertainment" />
                <hr className="form-field-grid-row-all" />
                <CopyItem prop="dining" label="Dining" />
                <hr className="form-field-grid-row-all" />
                <CopyItem prop="activities" label="Activities" />
                <hr className="form-field-grid-row-all" />
                <CopyItem
                    prop="whatsIncludedNoFly"
                    label="What's included No Fly"
                />
                <hr className="form-field-grid-row-all" />
                <CopyItem
                    prop="whatsIncludedWithFly"
                    label="What's included Fly"
                />
            </SubFormProvider>
        </React.Fragment>
    );
}

export function FormAccommodationCreate({
    match: {
        params: { env },
    },
    history,
}) {
    const createApi = "/accommodations";
    const listApi = "/accommodations";

    return (
        <FormProvider>
            <TitleBox>
                <TitleBox.Header>Create Accommodation</TitleBox.Header>
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
                                        `/${env}/accommodations/edit/${id}`,
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

function PreviewAccommodationGrade({ i, id, name, openItem }) {
    return (
        <li onClick={openItem.bind(null, id)}>
            <span>{i + 1}</span>
            <span className="pl-1 text-blue-600 hover:text-blue-900 underline cursor-pointer">
                {name}
            </span>
        </li>
    );
}

function compareAccommodationGrade(lhs, rhs) {
    if (lhs.name < rhs.name) {
        return -1;
    } else {
        return 1;
    }
}

export function FormAccommodationEdit({
    match: {
        params: { id },
    },
}) {
    const getApi = `/accommodations/${id}`;
    const listApi = "/accommodations";
    const putApi = `/accommodations/${id}`;

    return (
        <FormProvider>
            <FormContentLoader getApi={getApi} />

            <TitleBox>
                <TitleBox.Header>Edit Accommodation</TitleBox.Header>
                <TitleBox.Body>
                    <FormFieldGrid>
                        <FormFields />

                        <hr className="form-field-grid-row-all" />

                        <FormFieldLinkedSingle
                            prop="city"
                            label="City"
                            searchProp="name"
                            searchApi="/cities"
                            RenderLinked={Linked}
                            RenderSearchResult={Result}
                        />

                        <FormFieldLinkedSingle
                            prop="organisation"
                            label="Organisation"
                            searchProp="name"
                            searchApi="/organisations"
                            RenderLinked={Linked}
                            RenderSearchResult={Result}
                        />

                        <hr className="form-field-grid-row-all" />

                        <FormFieldSubformMultiple
                            RenderCreateFields={AccommodationGradeFormFields}
                            RenderEditFields={AccommodationGradeFormFields}
                            RenderPreview={PreviewAccommodationGrade}
                            compareFn={compareAccommodationGrade}
                            createApi="/accommodation-grades"
                            getEditRoute={(id) =>
                                `/accommodation-grades/edit/${id}`
                            }
                            getGetApi={(id) => `/accommodation-grades/${id}`}
                            getPutApi={(id) => `/accommodation-grades/${id}`}
                            label="Accommodation Grades"
                            listApi="/accommodation-grades"
                            parentId={id}
                            parentProp="accommodations"
                        />

                        <FormFieldButtonBlock>
                            <FormFieldButtonReset />
                            <FormFieldButtonSave
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
