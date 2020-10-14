import React from "react";
import useSWR from "swr";
import styled from "styled-components";

import { useFormField } from "../../hooks/useFormContext";
import { useAPIFetch } from "../AppContextProvider";

const CountryContainer = styled.div`
    border: ${(p) => p.theme.color.black} 2px solid;
    border-radius: ${(p) => p.theme.size[0]};
`;

export default function FormFieldCountry() {
    const fetcher = useAPIFetch();
    const { data: countriesList = [] } = useSWR(
        "/countries?_limit=999",
        fetcher,
    );

    const [country, setCountry] = useFormField("country");

    if (!country) {
        return <CountryContainer>Loading</CountryContainer>;
    }

    return (
        <CountryContainer>
            <h4>Country:</h4>
            <div>{country.name}</div>

            <select
                value={country.id}
                onChange={(e) => {
                    const newIdNumber = Number(e.target.value);

                    const newCountry = countriesList.find(
                        ({ id }) => id === newIdNumber,
                    );

                    setCountry(newCountry);
                }}
            >
                {countriesList.map(({ id, name }) => (
                    <option key={id} value={id}>
                        {name}
                    </option>
                ))}
            </select>
        </CountryContainer>
    );
}
