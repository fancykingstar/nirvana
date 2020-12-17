import React from "react";

import ButtonEnvLink from "../../ButtonEnvLink";
import FormContentLoader from "../../FormContentLoader";
import FormFieldGrid from "../../FormFieldGrid";
import { FormFieldButtonBlock } from "../../FormFieldButton";
import { useFormField, SubFormProvider } from "../../../hooks/useFormContext";

import ProductItinerary from "./ProductItinerary";
import ItinerarySearchByName from "./ItinerarySearchByName";
import ItinerarySearchByProduct from "./ItinerarySearchByProduct";

function ProductItineraries() {
    const [productId] = useFormField("id", []);
    const [productItineraries] = useFormField("itineraries", []);

    const productItinerariesSorted = React.useMemo(() => {
        const sorted = [...productItineraries]
            .sort((lhs, rhs) => lhs.ordering - rhs.ordering)
            .map((x, index) => ({ index, ...x }));

        for (let i = 0; i < sorted.length; i++) {
            sorted[i].prev = sorted[i - 1] ? { ...sorted[i - 1] } : null;
            sorted[i].next = sorted[i + 1] ? { ...sorted[i + 1] } : null;

            delete sorted[i].next?.next;
            delete sorted[i].next?.prev;
            delete sorted[i].prev?.next;
            delete sorted[i].prev?.prev;
        }

        return sorted;
    }, [productItineraries]);

    return (
        <SubFormProvider prop="itineraries" defaultValue={[]}>
            {productItinerariesSorted.map((props, index) => (
                <React.Fragment key={props.id}>
                    <ProductItinerary {...props} index={index} />
                    <hr className="form-field-grid-row-input" />
                </React.Fragment>
            ))}

            <FormFieldButtonBlock>
                <ItinerarySearchByName productId={productId} />
                <ItinerarySearchByProduct productId={productId} />
            </FormFieldButtonBlock>
        </SubFormProvider>
    );
}

export default function Step02Itinerary({
    match: {
        params: { id },
    },
}) {
    return (
        <FormFieldGrid>
            <div className="form-field-grid-row-all">
                <h2 className="text-xl">Step 2: Itineraries</h2>
            </div>

            <FormContentLoader getApi={`/products/${id}`} />

            <hr className="form-field-grid-row-all" />

            <h3 className="form-field-grid-row-label">Itineraries</h3>

            <ProductItineraries />

            <hr className="form-field-grid-row-all" />

            <FormFieldButtonBlock>
                <ButtonEnvLink
                    to={`/wizard/product/${id}/basic-details`}
                    color="blue"
                >
                    Back
                </ButtonEnvLink>
                <ButtonEnvLink
                    to={`/wizard/product/${id}/departures`}
                    color="blue"
                >
                    Next
                </ButtonEnvLink>
            </FormFieldButtonBlock>
        </FormFieldGrid>
    );
}
