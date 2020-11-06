import * as React from "react";

import FormFieldLinkedMany from "../FormFieldLinkedMany";

export default function RegionsField() {
    return (
        <FormFieldLinkedMany
            required
            label="Regions"
            prop="regions"
            searchProp="name"
            searchApi="/product-regions"
            RenderLinked={function LinkedRegion({ id, name, remove }) {
                return <li onClick={remove.bind(null, id)}>{name}</li>;
            }}
            RenderSearchResult={function ResultRegion({ id, name, add }) {
                return <li onClick={add.bind(null, id)}>{name}</li>;
            }}
        />
    );
}
