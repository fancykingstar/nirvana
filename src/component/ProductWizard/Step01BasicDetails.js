import React from "react";

import ButtonEnvLink from "../ButtonEnvLink";
import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import FormFieldProductCode from "../FormFieldProductCode";
import FormFieldRenderState from "../FormFieldRenderState";
import FormFieldRichText from "../FormFieldRichText";
import FormFieldString from "../FormFieldString";
import { SubFormProvider } from "../../hooks/useFormContext";
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
    if (!state?.description) {
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

            <SubFormProvider prop="product" defaultValue={{}}>
                <FormContentLoader getApi={`/products/${id}`} />

                <FormFieldString required label="Name" prop="name" />
                <FormFieldString required label="Label" prop="label" />
                <FormFieldProductCode
                    required
                    label="Product Code"
                    prop="code"
                />

                <FormFieldRichText
                    required
                    label="Description"
                    prop="description"
                />

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
                                to={`/wizard/product/${id}/structure`}
                                color="blue"
                                disabled={!requirementsMet(state)}
                            >
                                Next
                            </ButtonEnvLink>
                        )}
                    </FormFieldRenderState>
                </FormFieldButtonBlock>
            </SubFormProvider>
        </FormFieldGrid>
    );
}
