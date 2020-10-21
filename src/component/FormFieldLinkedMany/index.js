import React from "react";
import useSWR from "swr";
import styled from "styled-components";
import qs from "qs";

import { useFormField } from "../../hooks/useFormContext";

import FormFieldLabel from "../FormFieldLabel";

const Divider = styled.hr`
    grid-column: label / end;
`;

const InputArea = styled.div`
    padding: ${(p) => p.theme.size[0]};
    grid-column: input / input;
`;

export default function FormFieldLinkedMany({
    required,
    label,
    prop,
    searchProp,
    searchUrl,
    RenderLinked,
    RenderSearchResult,
}) {
    const [search, setSearch] = React.useState("");
    const [linked, setLinked] = useFormField(prop, []);

    const { data } = useSWR(
        search.length
            ? `${searchUrl}?${qs.stringify({
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
            <Divider />
            <FormFieldLabel required={required}>{label}</FormFieldLabel>
            <InputArea>
                <h3>Add:</h3>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <ul>
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

                <br />

                <h3>Current:</h3>
                <ul>
                    {linked.map((linkedEntity) => (
                        <RenderLinked
                            key={linkedEntity.id}
                            {...linkedEntity}
                            remove={remove}
                        />
                    ))}
                </ul>
            </InputArea>
        </React.Fragment>
    );
}
