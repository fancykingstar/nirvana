import * as React from "react";

import FormFieldLinkedMany from "../FormFieldLinkedMany";

export default function VersionsField() {
    return (
        <FormFieldLinkedMany
            required
            label="Versions"
            prop="versions"
            searchProp="name"
            searchApi="/versions"
            RenderLinked={function LinkedVersion({ id, name, remove }) {
                return <li onClick={remove.bind(null, id)}>{name}</li>;
            }}
            RenderSearchResult={function ResultVersion({ id, name, set }) {
                return <li onClick={set.bind(null, id)}>{name}</li>;
            }}
        />
    );
}
