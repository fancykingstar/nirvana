import * as React from "react";

import FormFieldLinkedSingle from "../FormFieldLinkedSingle";

export default function OperatorField() {
    return (
        <FormFieldLinkedSingle
            required
            label="Operator"
            prop="operator"
            searchProp="name"
            searchApi="/organisations"
            RenderLinked={function LinkedOperator({ name }) {
                return <span>{name}</span>;
            }}
            RenderSearchResult={function ResultOperator({ id, name, set }) {
                return <li onClick={set.bind(null, id)}>{name}</li>;
            }}
        />
    );
}
