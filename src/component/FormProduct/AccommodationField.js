import * as React from "react";

import FormFieldLinkedSingle from "../FormFieldLinkedSingle";

export default function AccommodationField() {
    return (
        <FormFieldLinkedSingle
            required
            label="Primary Accommodation"
            prop="primary_accommodation"
            searchProp="name"
            searchApi="/accommodations"
            RenderLinked={function LinkedAccomodation({ name }) {
                return <span>{name}</span>;
            }}
            RenderSearchResult={function ResultAccomodation({ id, name, set }) {
                return <li onClick={set.bind(null, id)}>{name}</li>;
            }}
        />
    );
}
