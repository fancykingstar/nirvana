import React from "react";

import { SubFormProvider } from "@imagine-developer/utopia-forms";

import ButtonEnvLink from "../ButtonEnvLink";
import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import FormFieldLinkedSingleSelect from "../FormFieldLinkedSingleSelect";
import FormFieldProductCardIncludes from "../FormFieldProductCardIncludes";
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

export default function Step01Description({
    match: {
        params: { id },
    },
}) {
    return (
        <FormFieldGrid>
            <div className="form-field-grid-row-all">
                <h2 className="text-xl">Step 1: Product Basic Details</h2>
            </div>

            <FormContentLoader getApi={`/products/${id}`} />

            <FormFieldString required label="Name" prop="name" />
            <FormFieldString required label="Label" prop="label" />
            <FormFieldProductCode required label="Product Code" prop="code" />

            <hr className="form-field-grid-row-all" />

            <FormFieldLinkedSingleSelect
                label="Primary Operator"
                nameProp="name"
                prop="operator"
                searchApi="/organisations"
            />

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

            <hr className="form-field-grid-row-all" />

            <FormFieldString label="USP Top" prop="uspTop" />
            <FormFieldString label="USP Bottom" prop="uspBottom" />
            <FormFieldRichText prop="description" label="Description" />
            <FormFieldRichText
                prop="product_includes"
                label="Product Includes"
            />

            <SubFormProvider prop="copy_items" defaultValue={{}}>
                <FormFieldProductCardIncludes />
            </SubFormProvider>

            <hr className="form-field-grid-row-all" />

            <FormFieldButtonBlock>
                <FormFieldButtonSave
                    nameProp="name"
                    listApi="/products"
                    getApi={`/products/${id}`}
                    putApi={`/products/${id}`}
                />
                <FormFieldRenderState>
                    {(state) => (
                        <ButtonEnvLink
                            to={`/wizard/product/${id}/itinerary`}
                            color="blue"
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
