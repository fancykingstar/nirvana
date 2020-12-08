import React from "react";

import Button from "../Button";
import FormFieldProductCode from "../FormFieldProductCode";
import FormFieldRenderState from "../FormFieldRenderState";
import FormFieldRichText from "../FormFieldRichText";
import FormFieldString from "../FormFieldString";
import FormFieldUUID from "../FormFieldUUID";

import { SubFormProvider } from "../../hooks/useFormContext";

function requirementsMet(state) {
    if (!state?.product?.name) {
        return false;
    }
    if (!state?.product?.label) {
        return false;
    }
    if (!state?.product?.code) {
        return false;
    }
    if (!state?.product?.description) {
        return false;
    }

    return true;
}

export default function Step01Description({ incrementPage }) {
    return (
        <React.Fragment>
            <div className="form-field-grid-row-all">
                <h2 className="text-xl">Step 1: Product Basic Details</h2>
            </div>

            <SubFormProvider prop="product" defaultValue={{}}>
                <FormFieldUUID prop="uid" />

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
            </SubFormProvider>

            <hr className="form-field-grid-row-all" />

            <div className="form-field-grid-row-input">
                <FormFieldRenderState>
                    {(state) => (
                        <Button
                            color="blue"
                            disabled={!requirementsMet(state)}
                            onClick={incrementPage}
                        >
                            Next
                        </Button>
                    )}
                </FormFieldRenderState>
            </div>
        </React.Fragment>
    );
}
