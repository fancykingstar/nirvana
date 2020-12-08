import React from "react";

import Button from "../Button";
import FormFieldRenderState from "../FormFieldRenderState";

import { SubFormProvider } from "../../hooks/useFormContext";

function ProductConfirm() {
    return (
        <SubFormProvider prop="product">
            <ul className="list-disc pl-4">
                <li>
                    Name:
                    <code className="pl-2">
                        <FormFieldRenderState prop="name" />
                    </code>
                </li>
                <li>
                    Label:
                    <code className="pl-2">
                        <FormFieldRenderState prop="label" />
                    </code>
                </li>
                <li>
                    Code:
                    <code className="pl-2">
                        <FormFieldRenderState prop="code" />
                    </code>
                </li>
            </ul>
        </SubFormProvider>
    );
}

function CreateButton() {
    return <Button color="green">Create Product</Button>;
}

export default function ConfirmPage({ decrementPage }) {
    return (
        <React.Fragment>
            <div className="form-field-grid-row-all">
                <h2 className="text-xl">Confirm Product Creation</h2>
            </div>
            <div className="form-field-grid-row-all">
                <h3 className="text-lg">Summary</h3>
                <ul className="list-disc pl-4">
                    <li>
                        You are going to <strong>create</strong>
                        <ul className="list-disc pl-4">
                            <li>
                                <code>1</code> Product
                                <ProductConfirm />
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            <hr className="form-field-grid-row-all" />

            <div className="form-field-grid-row-input">
                <Button color="blue" onClick={decrementPage}>
                    Back
                </Button>

                <CreateButton />
            </div>
        </React.Fragment>
    );
}
