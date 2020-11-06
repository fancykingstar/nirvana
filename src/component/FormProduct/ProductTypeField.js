import * as React from "react";

import FormFieldLinkedSingle from "../FormFieldLinkedSingle";

export default function ProductTypeField() {
    return (
        <FormFieldLinkedSingle
            required
            label="Product Type"
            prop="product_type"
            searchProp="name"
            searchApi="/product-type"
            RenderLinked={function LinkedProductType({ name }) {
                return <span>{name}</span>;
            }}
            RenderSearchResult={function ResultProductType({ id, name, set }) {
                return <li onClick={set.bind(null, id)}>{name}</li>;
            }}
        />
    );
}
