import * as React from "react";

import FormFieldLinkedMany from "../FormFieldLinkedMany";

export default function RelatedProductsField() {
    return (
        <FormFieldLinkedMany
            required
            label="Related Products"
            prop="related_products"
            searchProp="name"
            searchApi="/products"
            RenderLinked={function LinkedProduct({ id, name, remove }) {
                return <li onClick={remove.bind(null, id)}>{name}</li>;
            }}
            RenderSearchResult={function ResultProduct({ id, name, add }) {
                return <li onClick={add.bind(null, id)}>{name}</li>;
            }}
        />
    );
}
