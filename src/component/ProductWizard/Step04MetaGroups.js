import React from "react";

import FormFieldDebug from "../FormFieldDebug";
import ButtonEnvLink from "../ButtonEnvLink";
import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import FormFieldLinkedManySelect from "../FormFieldLinkedManySelect";
import { FormFieldButtonSave, FormFieldButtonBlock } from "../FormFieldButton";

export default function Step01Description({
    match: {
        params: { id },
    },
}) {
    return (
        <FormFieldGrid>
            <div className="form-field-grid-row-all">
                <h2 className="text-xl">Step 4: Categories and Regions</h2>
            </div>

            <FormContentLoader getApi={`/products/${id}`} />

            <hr className="form-field-grid-row-all" />

            <FormFieldLinkedManySelect
                label="Categories"
                prop="categories"
                nameProp="name"
                searchApi="/categories"
                mutateApi={`/products/${id}`}
            />

            <hr className="form-field-grid-row-all" />

            <FormFieldLinkedManySelect
                label="Regions"
                prop="regions"
                nameProp="name"
                searchApi="/product-regions"
            />

            <FormFieldDebug />

            <hr className="form-field-grid-row-all" />

            <FormFieldButtonBlock className="save-btn-list gap-4">
                <ButtonEnvLink
                    to={`/wizard/product/${id}/departures`}
                    color="orange"
                >
                    Back
                </ButtonEnvLink>

                <FormFieldButtonSave
                    nameProp="name"
                    listApi="/products"
                    getApi={`/products/${id}`}
                    putApi={`/products/${id}`}
                />
            </FormFieldButtonBlock>
        </FormFieldGrid>
    );
}
