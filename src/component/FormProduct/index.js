import React from "react";

import {
    FormProvider,
    FormFieldMultiple,
    FormFieldAsset,
} from "@imagine-developer/utopia-forms";

import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import TitleBox from "../TitleBox";

import FormFieldBoolean from "../FormFieldBoolean";
import FormFieldEnum from "../FormFieldEnum";
import FormFieldRenderState from "../FormFieldRenderState";
import FormFieldRichText from "../FormFieldRichText";
import FormFieldString from "../FormFieldString";
import FormFieldUUID from "../FormFieldUUID";

import {
    FormFieldButtonBlock,
    FormFieldButtonReset,
    FormFieldButtonCreate,
    FormFieldButtonSave,
} from "../FormFieldButton";

import AccommodationField from "./AccommodationField";
import ApisField from "./ApisField";
import CategoriesField from "./CategoriesField";
import CopyItems from "./CopyItems";
import OperatorField from "./OperatorField";
import RegionsField from "./RegionsField";
import RelatedProductsField from "./RelatedProductsField";

function FormFields() {
    return (
        <React.Fragment>
            <FormFieldString required prop="name" label="Name" />
            <FormFieldString required prop="label" label="Label" />
            <FormFieldString required prop="code" label="Code" />

            <hr className="form-field-grid-row-all" />

            <FormFieldBoolean
                prop="exclude_from_search"
                label="Exclude From Search"
            />

            <FormFieldEnum
                prop="product_template"
                label="Product Template"
                defaultValue="operated"
            >
                <FormFieldEnum.Option value="operated">
                    Operated
                </FormFieldEnum.Option>
                <FormFieldEnum.Option value="imported">
                    Imported
                </FormFieldEnum.Option>
            </FormFieldEnum>

            <FormFieldEnum prop="status" label="Status" defaultValue="draft">
                <FormFieldEnum.Option value="live">Live</FormFieldEnum.Option>
                <FormFieldEnum.Option value="draft">Draft</FormFieldEnum.Option>
            </FormFieldEnum>

            <hr className="form-field-grid-row-all" />

            <FormFieldRichText prop="description" label="Description" />

            <hr className="form-field-grid-row-all" />

            <FormFieldRichText
                prop="product_includes"
                label="Product Includes"
            />

            <hr className="form-field-grid-row-all" />

            <CopyItems />

            <hr className="form-field-grid-row-all" />
            <OperatorField />
            <hr className="form-field-grid-row-all" />
            <AccommodationField primaryOnly={false} />
            <hr className="form-field-grid-row-all" />
            <ApisField />
            <hr className="form-field-grid-row-all" />
            <CategoriesField />
            <hr className="form-field-grid-row-all" />
            <RegionsField />
            <hr className="form-field-grid-row-all" />
            <FormFieldMultiple
                label="Media"
                prop="media"
                addNewButton="Add New Image"
                MultipleOf={FormFieldAsset}
            />
            <hr className="form-field-grid-row-all" />
            <RelatedProductsField />
            <hr className="form-field-grid-row-all" />
        </React.Fragment>
    );
}

export function FormProductCreate({
    match: {
        params: { env },
    },
    history,
}) {
    const createApi = "/products";
    const listApi = "/products";

    return (
        <FormProvider>
            <TitleBox>
                <TitleBox.Header>Create Product</TitleBox.Header>
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
                                    history.push(`/${env}/products/edit/${id}`)
                                }
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </TitleBox.Body>
            </TitleBox>
        </FormProvider>
    );
}

export function FormProductEdit({
    match: {
        params: { id },
    },
}) {
    const getApi = `/products/${id}`;
    const listApi = "/products";
    const putApi = `/products/${id}`;

    return (
        <FormProvider>
            <FormContentLoader getApi={getApi} />

            <TitleBox>
                <TitleBox.Header>
                    Edit <FormFieldRenderState prop="name" />
                </TitleBox.Header>
                <TitleBox.Body>
                    <FormFieldGrid>
                        <FormFields />

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
