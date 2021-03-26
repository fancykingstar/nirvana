import React from "react";

import FormFieldGrid from "../FormFieldGrid";
import FormFieldCloudinary from "../FormFieldCloudinary";
import FormFieldLinkedMany from "../FormFieldLinkedMany";
import FormFieldRenderState from "../FormFieldRenderState";
import FormFieldString from "../FormFieldString";
import TitleBox from "../TitleBox";
import { FormProvider } from "../../hooks/useFormContext";

import {
    FormFieldButtonBlock,
    FormFieldButtonCreate,
} from "../FormFieldButton";

function requirementsMet(state) {
    if (!state?.name) {
        return false;
    }
    if (!state?.path) {
        return false;
    }

    return true;
}

export default function CreateAsset({ history }) {
    return (
        <FormProvider>
            <TitleBox>
                <TitleBox.Header>Create Asset</TitleBox.Header>
                <TitleBox.Body>
                    <FormFieldGrid>
                        <FormFieldString required prop="name" label="Name" />
                        <FormFieldString prop="alt_text" label="Alt Text" />

                        <hr className="form-field-grid-row-all" />

                        <FormFieldCloudinary
                            prop="path"
                            label="Desktop Media"
                            required={true}
                        />
                        <FormFieldCloudinary
                            prop="tablet_path"
                            label="Tablet Media"
                        />
                        <FormFieldCloudinary
                            prop="mobile_path"
                            label="Mobile Media"
                        />

                        <hr className="form-field-grid-row-all" />

                        <FormFieldLinkedMany
                            label="Categories"
                            prop="categories"
                            searchProp="name"
                            searchApi="/asset-categories"
                            RenderLinked={function LinkedCategory({
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
                            RenderSearchResult={function ResultCategory({
                                id,
                                name,
                                add,
                            }) {
                                return (
                                    <li onClick={add.bind(null, id)}>{name}</li>
                                );
                            }}
                        />
                        <FormFieldRenderState>
                            {(state) => {
                                return (
                                    <FormFieldButtonBlock>
                                        <FormFieldButtonCreate
                                            nameProp="name"
                                            listApi="/assets"
                                            createApi="/assets"
                                            onCreated={history.goBack}
                                            disabled={!requirementsMet(state)}
                                        />
                                    </FormFieldButtonBlock>
                                );
                            }}
                        </FormFieldRenderState>
                    </FormFieldGrid>
                </TitleBox.Body>
            </TitleBox>
        </FormProvider>
    );
}
