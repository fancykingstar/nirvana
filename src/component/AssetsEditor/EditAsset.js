import React from "react";

import Button from "../Button";
import FormContentLoader from "../FormContentLoader";
import FormFieldCloudinary from "../FormFieldCloudinary";
import FormFieldGrid from "../FormFieldGrid";
import FormFieldLinkedMany from "../FormFieldLinkedMany";
import FormFieldRenderState from "../FormFieldRenderState";
import FormFieldString from "../FormFieldString";
import TitleBox from "../TitleBox";
import { FormProvider, useFormField } from "../../hooks/useFormContext";

import {
    FormFieldButtonReset,
    FormFieldButtonBlock,
    FormFieldButtonSave,
} from "../FormFieldButton";

function RemoveImageButton({ prop, label }) {
    const [state, setState] = useFormField(prop, "");
    if (!state) {
        return;
    }

    return (
        <div className="pr-2">
            <Button color="red" onClick={() => setState(null)}>
                Remove {label}
            </Button>
        </div>
    );
}

function FormFieldWriteOnceImage({ prop, label, removable }) {
    return (
        <FormFieldRenderState>
            {({ [prop]: path }) => {
                return path ? (
                    <React.Fragment>
                        <div className="form-field-grid-row-label">{label}</div>
                        <div className="form-field-grid-row-input">
                            <img
                                className="border rounded shadow my-2"
                                src={`https://res.cloudinary.com/dbx23fuif/image/upload/${[
                                    "w_400",
                                    "h_400",
                                    "c_fit",
                                ].join(",")}/${path}`}
                            />
                            {removable && (
                                <RemoveImageButton prop={prop} label={label} />
                            )}
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <FormFieldCloudinary prop={prop} label={label} />
                    </React.Fragment>
                );
            }}
        </FormFieldRenderState>
    );
}

export default function EditAsset({
    match: {
        params: { id },
    },
    history,
}) {
    return (
        <FormProvider>
            <TitleBox>
                <TitleBox.Header>Edit Asset</TitleBox.Header>
                <TitleBox.Body>
                    <FormFieldGrid>
                        <FormContentLoader getApi={`/assets/${id}`} />
                        <FormFieldString prop="name" label="Name" />
                        <FormFieldString prop="alt_text" label="Alt Text" />

                        <hr className="form-field-grid-row-all" />

                        <FormFieldWriteOnceImage
                            prop="path"
                            label="Desktop Media"
                        />
                        <FormFieldWriteOnceImage
                            prop="tablet_path"
                            label="Tablet Media"
                            removable={true}
                        />
                        <FormFieldWriteOnceImage
                            prop="mobile_path"
                            label="Mobile Media"
                            removable={true}
                        />

                        <hr className="form-field-grid-row-all" />

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

                        <FormFieldButtonBlock>
                            <FormFieldButtonReset />
                            <FormFieldButtonSave
                                nameProp="name"
                                listApi="/assets"
                                putApi={`/assets/${id}`}
                                onSaved={history.goBack}
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox.Body>
            </TitleBox>
        </FormProvider>
    );
}
