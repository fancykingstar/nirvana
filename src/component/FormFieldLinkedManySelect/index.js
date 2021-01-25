import React from "react";
import useSWR from "swr";
import qs from "qs";

import Button from "../Button";
import FormFieldLabel from "../FormFieldLabel";
import useStableRandomId from "../../hooks/useStableRandomId";
import { Select } from "../Input";
import { useFormField } from "../../hooks/useFormContext";

export default function FormFieldLinkedManySelect({
    label,
    nameProp,
    prop,
    required,
    searchApi,
    staticFilter = {},
}) {
    const [selectToAdd, setSelectToAdd] = React.useState("");
    const [linked, setLinked] = useFormField(prop, null);
    const id = useStableRandomId();

    React.useEffect(() => {
        if (linked?.[0] && typeof linked?.[0] === "object") {
            setLinked((x) => x.map(({ id }) => id));
        }
    }, [linked]);

    const { data } = useSWR(
        `${searchApi}?${qs.stringify({
            ...staticFilter,
            _limit: 999,
        })}`,
    );

    const { selectedOptions, unselectedOptions } = React.useMemo(() => {
        const selectedOptions = [];
        const unselectedOptions = [];

        for (const option of data ?? []) {
            if (
                (linked ?? []).find(
                    (linkedInstanceId) => linkedInstanceId === option.id,
                )
            ) {
                selectedOptions.push(option);
            } else {
                unselectedOptions.push(option);
            }
        }

        return { selectedOptions, unselectedOptions };
    }, [data, linked]);

    async function addSelectedToLinked() {
        setLinked((linked) => [...(linked ?? []), selectToAdd]);

        setSelectToAdd("");
    }

    async function removeSelectedFromLinked(id) {
        setLinked((linked) =>
            (linked ?? []).filter((linkedId) => id !== linkedId),
        );
    }

    return (
        <React.Fragment>
            <FormFieldLabel htmlFor={id} required={required}>
                {label}
            </FormFieldLabel>
            <div className="form-field-grid-row-input bg-list-selected">
                <ul className="">
                    {selectedOptions.map(({ id, [nameProp]: name }) => (
                        <li className="close-button" key={id}>
                            <Button
                                className="m-1"
                                color="red"
                                onClick={removeSelectedFromLinked.bind(
                                    null,
                                    id,
                                )}
                            >
                                &#10005;
                            </Button>
                            {name}
                        </li>
                    ))}
                </ul>
                <div className="flex gap-4 select-option">
                    <Select
                        id={id}
                        value={selectToAdd}
                        onChange={(e) =>
                            setSelectToAdd(Number(e.target.value) || null)
                        }
                    >
                        <option>{data ? "Please Select" : "Loading..."}</option>

                        {unselectedOptions.map(({ id, [nameProp]: name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </Select>
                    <Button
                        color="orange"
                        className="w-16"
                        onClick={addSelectedToLinked}
                    >
                        <i className="fa fa-plus"></i>
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
}
