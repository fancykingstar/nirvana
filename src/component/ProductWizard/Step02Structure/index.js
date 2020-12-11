import React from "react";

import Button from "../../Button";
import ButtonEnvLink from "../../ButtonEnvLink";
import FormContentLoader from "../../FormContentLoader";
import FormFieldGrid from "../../FormFieldGrid";
import FormFieldLinkedSingleSelect from "../../FormFieldLinkedSingleSelect";
import FormFieldRenderState from "../../FormFieldRenderState";
import { FormFieldButtonBlock } from "../../FormFieldButton";
import { useFormField, SubFormProvider } from "../../../hooks/useFormContext";

import ProductItinerary from "./ProductItinerary";
import ItinerarySearchByName from "./ItinerarySearchByName";

function requirementsMet(state) {
    if (!state?.name) {
        return false;
    }

    return true;
}

function ProductItineraries() {
    const [productId] = useFormField("id", []);
    const [itineraryIds] = useFormField("itineraries", []);

    const itineraryIdsSorted = React.useMemo(() => {
        const sorted = (itineraryIds ?? [])
            .map((x, i) => ({ ...x, i }))
            .sort((lhs, rhs) => lhs.ordering - rhs.ordering);

        for (let i = 0; i < sorted.length; i++) {
            sorted[i].prev = sorted[i - 1];
            sorted[i].next = sorted[i + 1];
        }

        return sorted;
    }, [itineraryIds]);

    return (
        <SubFormProvider prop="itineraries" defaultValue={[]}>
            {itineraryIdsSorted.map(({ id, i, prev, next }) => (
                <SubFormProvider key={id} prop={i} defaultValue={{}}>
                    <ProductItinerary
                        productId={productId}
                        prev={prev}
                        next={next}
                    />
                    <hr className="form-field-grid-row-input" />
                </SubFormProvider>
            ))}

            <FormFieldButtonBlock>
                <ItinerarySearchByName productId={productId} />
                <Button color="blue">Add Itinary From Product</Button>
            </FormFieldButtonBlock>
        </SubFormProvider>
    );
}

export default function Step02Description({
    match: {
        params: { env, id },
    },
}) {
    return (
        <FormFieldGrid>
            <div className="form-field-grid-row-all">
                <h2 className="text-xl">Step 2: Product Structure</h2>
            </div>

            <SubFormProvider prop="product" defaultValue={{}}>
                <FormContentLoader getApi={`/products/${id}`} />

                <FormFieldLinkedSingleSelect
                    label="Operator"
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
                                organisation: operator?.id,
                            }}
                        />
                    )}
                </FormFieldRenderState>

                <hr className="form-field-grid-row-all" />

                <h3 className="form-field-grid-row-label">Itineraries</h3>

                <ProductItineraries />

                <hr className="form-field-grid-row-all" />

                <FormFieldButtonBlock>
                    <FormFieldRenderState>
                        {(state) => (
                            <ButtonEnvLink
                                to={`/${env}/wizard/product/${id}/step-2`}
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
