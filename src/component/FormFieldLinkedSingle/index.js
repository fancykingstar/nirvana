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

export default function FormFieldLinkedSingle({
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

    function set(id) {
        const idNumber = Number(id);

        setLinked(searchResults.find(({ id }) => id === idNumber));
    }

    return (
        <React.Fragment>
            <Divider />
            <FormFieldLabel required={required}>{label}</FormFieldLabel>
            <InputArea>
                <h3>Current:</h3>
                <ul>
                    <RenderLinked {...linked} />
                </ul>

                <br />

                <h3>Replace:</h3>
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
