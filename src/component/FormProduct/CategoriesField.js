import * as React from "react";

import FormFieldLinkedMany from "../FormFieldLinkedMany";

export default function CategoriesField() {
    return (
        <FormFieldLinkedMany
            required
            label="Categories"
            prop="categories"
            searchProp="name"
            searchApi="/categories"
            RenderLinked={function LinkedCategory({ id, name, remove }) {
                return <li onClick={remove.bind(null, id)}>{name}</li>;
            }}
            RenderSearchResult={function ResultCategory({ id, name, add }) {
                return <li onClick={add.bind(null, id)}>{name}</li>;
            }}
        />
    );
}
