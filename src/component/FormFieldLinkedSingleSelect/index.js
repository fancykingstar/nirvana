import React from "react";
import useSWR from "swr";
import qs from "qs";

import FormFieldLabel from "../FormFieldLabel";
import useStableRandomId from "../../hooks/useStableRandomId";
import { Select } from "../Input";
import { useFormField } from "../../hooks/useFormContext";

export default function FormFieldLinkedSingleSelect({
    required,
    label,
    prop,
    nameProp,
    searchApi,
    staticFilter = {},
}) {
    const [linked, setLinked] = useFormField(prop, null);
    const id = useStableRandomId();

    React.useEffect(() => {
        if (linked && typeof linked === "object") {
            setLinked(linked.id);
        }
    }, [linked]);

    const { data } = useSWR(
        `${searchApi}?${qs.stringify({
            ...staticFilter,
            _limit: 999,
        })}`,
    );

    const options = data ?? [];

    return (
        <React.Fragment>
            <FormFieldLabel htmlFor={id} required={required}>
                {label}
            </FormFieldLabel>
            <Select
                className="form-field-grid-row-input"
                id={id}
                value={linked ?? ""}
                onChange={(e) => setLinked(Number(e.target.value) || null)}
            >
                <option>{data ? "Please Select" : "Loading..."}</option>

                {options.map(({ id, [nameProp]: name }) => (
                    <option key={id} value={id}>
                        {name}
                    </option>
                ))}
            </Select>
        </React.Fragment>
    );
}
