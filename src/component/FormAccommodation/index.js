import React from "react";

import { FormProvider } from "../../hooks/useFormContext";

import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import TitleBox from "../TitleBox";

import FormFieldDebug from "../FormFieldDebug";
import FormFieldRichText from "../FormFieldRichText";
import FormFieldString from "../FormFieldString";
import FormFieldEnum from "../FormFieldEnum";
import FormFieldSubformMultiple from "../FormFieldSubformMultiple";
import FormFieldLinkedSingle from "../FormFieldLinkedSingle";
import FormFieldUUID from "../FormFieldUUID";

//import { FormFields as AccommodationGradeFormFields } from "../FormAccommodationGrades";

import {
    FormFieldButtonBlock,
    FormFieldButtonReset,
    FormFieldButtonCreate,
    FormFieldButtonSave,
} from "../FormFieldButton";

function AccommodationGradeFormFields() {
    return <h1>TODO</h1>;
}

function LinkedCity({ name }) {
    return <span>{name}</span>;
}

function ResultCity({ id, name, set }) {
    return <li onClick={set.bind(null, id)}>{name}</li>;
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

            <FormFieldLinkedSingle
                prop="city"
                label="City"
                searchProp="name"
                searchApi="/cities"
                RenderLinked={LinkedCity}
                RenderSearchResult={ResultCity}
            />
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

                        <FormFieldSubformMultiple
                            RenderCreateFields={AccommodationGradeFormFields}
                            RenderEditFields={AccommodationGradeFormFields}
                            RenderPreview={PreviewAccommodationGrade}
                            compareFn={compareAccommodationGrade}
                            createApi="/accommodation_grades"
                            getEditRoute={(id) =>
                                `/accommodation_grades/edit/${id}`
                            }
                            getGetApi={(id) => `/accommodation-grades/${id}`}
                            getPutApi={(id) => `/accommodation-grades/${id}`}
                            label="Accommodation Grades"
                            listApi="/accommodation-grades"
                            parentId={id}
                            parentProp="accommodation"
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
