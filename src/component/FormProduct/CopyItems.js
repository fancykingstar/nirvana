import React from "react";

import {
    FormFieldAsset,
    FormFieldLinkedUtopiaEntity,
    SubFormProvider,
} from "@imagine-developer/utopia-forms";

import FormFieldString from "../FormFieldString";
import FormFieldProductCardIncludes from "../FormFieldProductCardIncludes";

export default function CopyItems() {
    return (
        <SubFormProvider prop="copy_items" defaultValue={{}}>
            <FormFieldString label="USP Top" prop="uspTop" />
            <FormFieldString label="USP Bottom" prop="uspBottom" />
            <FormFieldLinkedUtopiaEntity
                LinkedOf={FormFieldAsset}
                collectionType="assets"
                prop="heroImage"
                label="Card Image"
            />
            <FormFieldProductCardIncludes />
        </SubFormProvider>
    );
}
