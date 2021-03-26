import React from "react";

import {
    FormFieldAsset,
    FormFieldMultiple,
} from "@imagine-developer/utopia-forms";

import ButtonEnvLink from "../ButtonEnvLink";
import CopyItems from "../FormProduct/CopyItems";
import FormContentLoader from "../FormContentLoader";
import FormFieldBoolean from "../FormFieldBoolean";
import FormFieldEnum from "../FormFieldEnum";
import FormFieldGrid from "../FormFieldGrid";
import FormFieldLinkedMany from "../FormFieldLinkedMany";
import FormFieldLinkedSingleSelect from "../FormFieldLinkedSingleSelect";
import FormFieldProductCode from "../FormFieldProductCode";
import FormFieldRenderState from "../FormFieldRenderState";
import FormFieldRichText from "../FormFieldRichText";
import FormFieldString from "../FormFieldString";
import { FormFieldButtonSave, FormFieldButtonBlock } from "../FormFieldButton";

function requirementsMet(state) {
    if (!state?.name) {
        return false;
    }
    if (!state?.label) {
        return false;
    }
    if (!state?.code) {
        return false;
    }
    if (!state?.operator) {
        return false;
    }
    if (!state?.primary_accommodation) {
        return false;
    }

    return true;
}

export default function Step01BasicDetails({
    match: {
        params: { id },
    },
}) {
    return (
        <FormFieldGrid className="product-basic-1">
            <div className="form-field-grid-row-all">
                <h2 className="text-xl">Step 1: Product Basic Details</h2>
            </div>

            <FormContentLoader getApi={`/products/${id}`} />

            <FormFieldString required label="Name" prop="name" />
            <FormFieldString required label="Label" prop="label" />
            <FormFieldProductCode required label="Product Code" prop="code" />

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

            <FormFieldLinkedSingleSelect
                label="Primary Operator"
                nameProp="name"
                prop="operator"
                searchApi="/organisations"
            />

            <hr className="form-field-grid-row-all" />

            <FormFieldRenderState>
                {({ operator }) => (
                    <FormFieldLinkedSingleSelect
                        label="Primary Accomodation"
                        nameProp="name"
                        prop="primary_accommodation"
                        searchApi="/accommodations"
                        staticFilter={{
                            organisation:
                                typeof operator === "number"
                                    ? operator
                                    : operator?.id,
                        }}
                    />
                )}
            </FormFieldRenderState>

            <hr className="form-field-grid-row-input" />

            <FormFieldLinkedMany
                label="Secondary Accomodations"
                prop="additional_accommodations"
                searchProp="name"
                searchApi="/accommodations"
                RenderLinked={function LinkedAccomodation({
                    name,
                    id,
                    remove,
                }) {
                    return <li onClick={remove.bind(null, id)}>{name}</li>;
                }}
                RenderSearchResult={function ResultAccomodation({
                    id,
                    name,
                    add,
                }) {
                    return <li onClick={add.bind(null, id)}>{name}</li>;
                }}
            />
            <hr className="form-field-grid-row-all" />
            <FormFieldMultiple
                label="Media"
                prop="media"
                addNewButton="Add New Image"
                MultipleOf={FormFieldAsset}
            />

            <hr className="form-field-grid-row-all" />

            <FormFieldButtonBlock className="save-btn-list">
                <FormFieldButtonSave
                    color="orange"
                    nameProp="name"
                    listApi="/products"
                    getApi={`/products/${id}`}
                    putApi={`/products/${id}`}
                />
                <FormFieldRenderState>
                    {(state) => (
                        <ButtonEnvLink
                            to={`/wizard/product/${id}/itinerary`}
                            color="orange"
                            disabled={!requirementsMet(state)}
                        >
                            Next
                        </ButtonEnvLink>
                    )}
                </FormFieldRenderState>
            </FormFieldButtonBlock>
        </FormFieldGrid>
    );
}
