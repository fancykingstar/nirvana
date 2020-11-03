import * as React from "react";

import FormFieldLinkedMany from "../FormFieldLinkedMany";

export default function ApisField() {
    return (
        <FormFieldLinkedMany
            required
            label="Apis"
            prop="apis"
            searchProp="name"
            searchApi="/apis"
            RenderLinked={function LinkedApi({ id, name, remove }) {
                return <li onClick={remove.bind(null, id)}>{name}</li>;
            }}
            RenderSearchResult={function ResultApi({ id, name, add }) {
                return <li onClick={add.bind(null, id)}>{name}</li>;
            }}
        />
    );
}
