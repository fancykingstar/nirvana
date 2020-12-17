import React from "react";
import { mutate } from "swr";

import Button from "../../Button";
import FormFieldDate from "../../FormFieldDate";
import FormFieldGrid from "../../FormFieldGrid";
import FormFieldStatic from "../../FormFieldStatic";
import TitleBoxModalWithVisibilityButton from "../../TitleBoxModalWithVisibilityButton";
import { FormProvider, useFormField } from "../../../hooks/useFormContext";
import { useAPIFetch } from "../../AppContextProvider";

import {
    FormFieldButtonBlock,
    FormFieldButtonCreate,
} from "../../FormFieldButton";

export default function CreateNewDepartureModal({ accommodationGrades }) {
    const fetch = useAPIFetch();
    const [productId] = useFormField("id", null);

    return (
        <TitleBoxModalWithVisibilityButton
            Header={({ onClose }) => (
                <React.Fragment>
                    <span className="flex-1 pr-4">Create New Departure</span>
                    <Button color="red" onClick={onClose}>
                        Close
                    </Button>
                </React.Fragment>
            )}
            buttonText="Create New Departure"
        >
            {({ onClose }) => (
                <FormProvider>
                    <FormFieldGrid>
                        <FormFieldDate prop="date" label="Date" />
                        <FormFieldStatic prop="product" value={productId} />
                        <FormFieldButtonBlock>
                            <FormFieldButtonCreate
                                nameProp="date"
                                listApi="/departures"
                                createApi="/departures"
                                onCreated={async (departure) => {
                                    await Promise.all(
                                        accommodationGrades.map(
                                            ({ id: accommodation_grade }) =>
                                                fetch("/prices", {
                                                    method: "POST",
                                                    body: JSON.stringify({
                                                        accommodation_grade,
                                                        departure,
                                                        now_price: 0.0,
                                                        generic_price: 0.0,
                                                    }),
                                                }),
                                        ),
                                    );

                                    await mutate(`/products/${productId}`);

                                    onClose();
                                }}
                            />
                        </FormFieldButtonBlock>
                    </FormFieldGrid>
                </FormProvider>
            )}
        </TitleBoxModalWithVisibilityButton>
    );
}
