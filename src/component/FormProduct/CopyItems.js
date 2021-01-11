import React from "react";

import {
    FormFieldAsset,
    FormFieldLinkedUtopiaEntity,
    SubFormProvider,
} from "@imagine-developer/utopia-forms";

export default function CopyItems() {
    return (
        <SubFormProvider prop="copy_items">
            <FormFieldLinkedUtopiaEntity
                LinkedOf={FormFieldAsset}
                collectionType="assets"
                prop="heroImage"
                label="Hero Image"
            />
        </SubFormProvider>
    );
}
