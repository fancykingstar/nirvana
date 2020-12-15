import React from "react";

import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import FormFieldLinkedMany from "../FormFieldLinkedMany";
import FormFieldString from "../FormFieldString";
import FormFieldRichText from "../FormFieldRichText";
import FormFieldUUID from "../FormFieldUUID";
import TitleBox from "../TitleBox";
import { FormProvider } from "../../hooks/useFormContext";

import {
    FormFieldButtonBlock,
    FormFieldButtonReset,
    FormFieldButtonCreate,
    FormFieldButtonSave,
} from "../FormFieldButton";

function FormFields() {
    return (
        <React.Fragment>
            <FormFieldString prop="name" label="Name" />
            <FormFieldString prop="label" label="Label" />
            <FormFieldRichText prop="description" label="Description" />
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
                    <FormFieldGrid>
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
