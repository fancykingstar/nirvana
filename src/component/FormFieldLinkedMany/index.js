import React from "react";
import useSWR from "swr";
import qs from "qs";

import { useFormField } from "../../hooks/useFormContext";

import classed from "../ClassedComponent";
import FormFieldLabel from "../FormFieldLabel";
import { KeyboardInputBox } from "../Input";

const InputArea = classed.div("p-1", "form-field-grid-row-input");

export default function FormFieldLinkedMany({
    required,
    label,
    prop,
    searchProp,
    searchApi,
    RenderLinked,
    RenderSearchResult,
}) {
    const [search, setSearch] = React.useState("");
    const [linked, setLinked] = useFormField(prop, []);

    const { data } = useSWR(
        search.length
            ? `${searchApi}?${qs.stringify({
                  [`${searchProp}_contains`]: search,
              })}`
            : null,
    );

    const isLoading = search.length && !data;
    const searchResults = data ?? [];

    const linkedIds = linked.map(({ id }) => id);

    function remove(id) {
        const idNumber = Number(id);

        setLinked((linked) => linked.filter(({ id }) => id !== idNumber));
    }

    function add(id) {
        const idNumber = Number(id);

        setLinked((linked) => [
            ...linked,
            searchResults.find(({ id }) => id === idNumber),
        ]);
    }

    return (
        <React.Fragment>
            <FormFieldLabel required={required}>{label}</FormFieldLabel>
            <InputArea>
                <h3>Current:</h3>
                <ul className="list-disc list-deleteable pl-4">
                    {linked.map((linkedEntity) => (
                        <RenderLinked
                            key={linkedEntity.id}
                            {...linkedEntity}
                            remove={remove}
                        />
                    ))}
                </ul>

                <br />

                <h3>Add:</h3>
                <KeyboardInputBox
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <ul className="list-disc list-addable pl-4">
                    {isLoading ? (
                        <React.Fragment>
                            <li>Loading</li>
                            <li>Loading</li>
                            <li>Loading</li>
                        </React.Fragment>
                    ) : null}
                    {searchResults
                        .filter(({ id }) => !linkedIds.includes(id))
                        .map((searchResult) => (
                            <RenderSearchResult
                                key={searchResult.id}
                                {...searchResult}
                                add={add}
                            />
                        ))}
                </ul>
            </InputArea>
        </React.Fragment>
    );
}
