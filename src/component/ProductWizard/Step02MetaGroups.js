import React from "react";

import FormFieldDebug from "../FormFieldDebug";
import ButtonEnvLink from "../ButtonEnvLink";
import FormContentLoader from "../FormContentLoader";
import FormFieldGrid from "../FormFieldGrid";
import FormFieldLinkedManySelect from "../FormFieldLinkedManySelect";
import { FormFieldButtonBlock } from "../FormFieldButton";
import RelatedProductsField from "../FormProduct/RelatedProductsField";

export default function Step02MetaGroups({
    match: {
        params: { id },
    },
}) {
    return (
        <FormFieldGrid>
            <div className="form-field-grid-row-all">
                <h2 className="text-xl">
                    Step 2: APIs, Categories, Regions and Related
                </h2>
            </div>

            <FormContentLoader getApi={`/products/${id}`} />

            <hr className="form-field-grid-row-all" />

            <FormFieldLinkedManySelect
                label="APIs"
                prop="apis"
                nameProp="name"
                searchApi="/apis"
                mutateApi={`/products/${id}`}
            />

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

            <hr className="form-field-grid-row-all" />

            <RelatedProductsField />

            <FormFieldDebug />

            <hr className="form-field-grid-row-all" />

            <FormFieldButtonBlock className="save-btn-list gap-4">
                <ButtonEnvLink
                    to={`/wizard/product/${id}/departures`}
                    color="orange"
                >
                    Back
                </ButtonEnvLink>

                <ButtonEnvLink
                    to={`/wizard/product/${id}/itinerary`}
                    color="blue"
                >
                    Next
                </ButtonEnvLink>
            </FormFieldButtonBlock>
        </FormFieldGrid>
    );
}
