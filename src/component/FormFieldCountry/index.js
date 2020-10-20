import React from "react";
import useSWR from "swr";
import styled from "styled-components";
import qs from "qs";

import { useFormField } from "../../hooks/useFormContext";

import FormFieldLabel from "../FormFieldLabel";
import EnvLink from "../EnvLink";

const Divider = styled.hr`
    grid-column: label / end;
`;

const CountryInput = styled.div`
    padding: ${(p) => p.theme.size[0]};
    grid-column: input / input;
`;

export default function FormFieldCountry({ required }) {
    const [country, setCountry] = useFormField("country");

    const { data: countriesList = [] } = useSWR(
        country
            ? `/countries?${qs.stringify({
                  _limit: 999,
              })}`
            : null,
    );

    return (
        <React.Fragment>
            <Divider />
            <FormFieldLabel required={required}>Country</FormFieldLabel>
            <CountryInput>
                <span>Current Country: </span>
                {country ? (
                    <EnvLink to={`/edit/country/${country.id}`}>
                        {country.name}
                    </EnvLink>
                ) : (
                    "...loading"
                )}

                <br />

                {countriesList.length > 0 ? (
                    <select
                        value={country.id}
                        onChange={(e) =>
                            setCountry(
                                countriesList.find(
                                    ({ id }) => id == e.target.value,
                                ),
                            )
                        }
                    >
                        {countriesList.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                ) : (
                    <span>...loading other countries</span>
                )}
            </CountryInput>
            <Divider />
        </React.Fragment>
    );
}
