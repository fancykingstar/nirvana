import React from "react";

import { useFormField } from "../../hooks/useFormContext";

import FormFieldLabel from "../FormFieldLabel";
import { KeyboardInboxBox } from "../Input";

export default function FormFieldItemOrder({ label }) {
    const [startDay, setStartDay, c1] = useFormField("start_day", 1);
    const [endDay, setEndDay, c2] = useFormField("end_day", 1);
    const [ordering, setOrdering, c3] = useFormField("ordering", 1);

    return (
        <React.Fragment>
            <FormFieldLabel required>{label}</FormFieldLabel>
            <div className="form-field-grid-row-input">
                <KeyboardInboxBox
                    type="number"
                    value={startDay}
                    onChange={(e) => setStartDay(Number(e.target.value))}
                />

                <span className="px-2 text-2xl font-bold">-</span>
                <KeyboardInboxBox
                    type="number"
                    value={endDay}
                    onChange={(e) => setEndDay(Number(e.target.value))}
                />

                <span className="px-2 text-2xl font-bold">(</span>
                <KeyboardInboxBox
                    type="number"
                    value={ordering}
                    onChange={(e) => setOrdering(Number(e.target.value))}
                />
                <span className="px-2 text-2xl font-bold">)</span>
            </div>

            {c1 || c2 || c3 ? (
                <span className="form-field-grid-row-updated">updated</span>
            ) : null}
        </React.Fragment>
    );
}
