import React from "react";

import FormContentLoader from "../FormContentLoader";
import FormFieldRenderState from "../FormFieldRenderState";
import FormFieldGrid from "../FormFieldGrid";
import FormFieldLinkedMany from "../FormFieldLinkedMany";
import FormFieldString from "../FormFieldString";
import TitleBox from "../TitleBox";
import { FormProvider } from "../../hooks/useFormContext";

import {
    FormFieldButtonReset,
    FormFieldButtonBlock,
    FormFieldButtonSave,
} from "../FormFieldButton";

export default function EditAsset({
    match: {
        params: { id },
    },
}) {
    return (
        <FormProvider>
            <TitleBox>
                <TitleBox.Header>Edit Asset</TitleBox.Header>
                <TitleBox.Body>
                    <FormFieldGrid>
                        <FormContentLoader getApi={`/assets/${id}`} />
                        <FormFieldString prop="name" label="Name" />

                        <div className="form-field-grid-row-input">
                            <FormFieldRenderState>
                                {({ path }) => (
                                    <img
                                        className="border rounded shadow my-2"
                                        src={`https://res.cloudinary.com/dbx23fuif/image/upload/${[
                                            "w_400",
                                            "h_400",
                                            "c_fit",
                                        ].join(",")}/${path}`}
                                    />
                                )}
                            </FormFieldRenderState>
                        </div>

                        <FormFieldLinkedMany
                            showAll
                            prop="categories"
                            label="Categories"
                            searchProp="name"
                            searchApi="/asset-categories"
                            RenderLinked={({ name, id, remove }) => (
                                <li onClick={remove.bind(null, id)}>{name}</li>
                            )}
                            RenderSearchResult={({ name, id, add }) => (
                                <li onClick={add.bind(null, id)}>{name}</li>
                            )}
                        />
                        <FormFieldString prop="alt_text" label="Alt Text" />

                        <FormFieldButtonBlock>
                            <FormFieldButtonReset />
                            <FormFieldButtonSave
                                nameProp="name"
                                listApi="/assets"
                                putApi={`/assets/${id}`}
                                onSaved={() => {}}
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox.Body>
            </TitleBox>
        </FormProvider>
    );
}
