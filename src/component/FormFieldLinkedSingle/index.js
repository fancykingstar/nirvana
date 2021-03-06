import React from "react";
import useSWR from "swr";
import qs from "qs";

import { useFormField } from "../../hooks/useFormContext";
import useStableRandomId from "../../hooks/useStableRandomId";

import classed from "../ClassedComponent";
import FormFieldLabel from "../FormFieldLabel";
import { KeyboardInputBox } from "../Input";

const InputArea = classed.div("p-1", "form-field-grid-row-input");

export default function FormFieldLinkedSingle({
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
    const id = useStableRandomId();

    const { data } = useSWR(
        search.length
            ? `${searchApi}?${qs.stringify({
                  [`${searchProp}_contains`]: search,
              })}`
            : null,
    );

    const isLoading = search.length && !data;
    const searchResults = data ?? [];

    function set(id) {
        const idNumber = Number(id);

        setLinked(searchResults.find(({ id }) => id === idNumber));

        setSearch("");
    }

    return (
        <React.Fragment>
            <FormFieldLabel required={required}>{label}</FormFieldLabel>
            <InputArea>
                <h3>Current:</h3>
                <ul>
                    <RenderLinked {...linked} />
                </ul>

                <br />

                <h3>
                    <label htmlFor={id}>Replace:</label>
                </h3>
                <KeyboardInputBox
                    id={id}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <ul className="list-dist pl-4">
                    {isLoading ? (
                        <React.Fragment>
                            <li>Loading</li>
                            <li>Loading</li>
                            <li>Loading</li>
                        </React.Fragment>
                    ) : null}
                    {searchResults
                        .filter(({ id }) => id !== linked.id)
                        .map((searchResult) => (
                            <RenderSearchResult
                                key={searchResult.id}
                                {...searchResult}
                                set={set}
                            />
                        ))}
                </ul>
            </InputArea>
        </React.Fragment>
    );
}
