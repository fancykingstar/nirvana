import React from "react";

import {
    FormFieldEnum,
    FormFieldMultiple,
    FormFieldString,
    SubFormProvider,
} from "@imagine-developer/utopia-forms";

function ProductCardInclude({ prop }) {
    return (
        <SubFormProvider prop={prop} defaultValue={{}}>
            <FormFieldEnum prop="icon" label="Icon" defaultValue="PLANE">
                <FormFieldEnum.Option value="PLANE">Plane</FormFieldEnum.Option>
                <FormFieldEnum.Option value="TRAIN">Train</FormFieldEnum.Option>
                <FormFieldEnum.Option value="AUTOMOBILE">
                    Automobile
                </FormFieldEnum.Option>
            </FormFieldEnum>

            <FormFieldString prop="text" label="Text" />
        </SubFormProvider>
    );
}

export default function FormFieldProductCardIncludes() {
    return (
        <FormFieldMultiple
            label="Product Card Includes"
            prop="productCardIncludes"
            addNewButton="Add New Product Card Include"
            MultipleOf={ProductCardInclude}
        />
    );
}
