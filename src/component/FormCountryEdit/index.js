import React from "react";

import { FormProvider } from "../../hooks/useFormContext";

import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import TitleBox, { TitleBoxPadder } from "../TitleBox";

import FormFieldLinkedMany from "../FormFieldLinkedMany";
import FormFieldString from "../FormFieldString";

import {
    FormFieldButtonBlock,
    FormFieldButtonReset,
    FormFieldButtonSave,
} from "../FormFieldButton";

function LinkedCity({ id, name, remove }) {
    return <li onClick={remove.bind(null, id)}>{name}</li>;
}

function SearchResultCity({ id, name, add }) {
    return <li onClick={add.bind(null, id)}>{name}</li>;
}

export default function FormCountryEdit({
    match: {
        params: { id },
    },
}) {
    const getRoute = `/countries/${id}`;
    const listRoute = "/countries";
    const putRoute = `/countries/${id}`;

    return (
        <FormProvider>
            <FormContentLoader getRoute={getRoute} />
            <TitleBoxPadder>
                <TitleBox title="Edit Country">
                    <FormFieldGrid>
                        <FormFieldString required prop="name" label="Name" />
                        <FormFieldString required prop="label" label="Label" />
                        <FormFieldString
                            required
                            prop="iso_2"
                            label="ISO (2)"
                        />
                        <FormFieldString
                            required
                            prop="iso_3"
                            label="ISO (3)"
                        />

                        <FormFieldLinkedMany
                            label="Cities"
                            prop="cities"
                            searchUrl="/cities"
                            searchProp="name"
                            RenderLinked={LinkedCity}
                            RenderSearchResult={SearchResultCity}
                        />

                        <FormFieldButtonBlock>
                            <FormFieldButtonReset />
                            <FormFieldButtonSave
                                nameProp="name"
                                putRoute={putRoute}
                                getRoute={getRoute}
                                listRoute={listRoute}
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox>
            </TitleBoxPadder>
        </FormProvider>
    );
}
