import * as React from "react";

import FormFieldLinkedMany from "../FormFieldLinkedMany";

export default function ProductGroupsField() {
    return (
        <FormFieldLinkedMany
            required
            label="Product Groups"
            prop="product_groups"
            searchProp="name"
            searchApi="/product-groups"
            RenderLinked={function LinkedProductGroup({ id, name, remove }) {
                return <li onClick={remove.bind(null, id)}>{name}</li>;
            }}
            RenderSearchResult={function ResultProductGroup({ id, name, add }) {
                return <li onClick={add.bind(null, id)}>{name}</li>;
            }}
        />
    );
}
