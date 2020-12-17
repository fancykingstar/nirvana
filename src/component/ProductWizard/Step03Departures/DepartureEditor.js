import React from "react";
import { format, addDays } from "date-fns";
import cn from "classnames";

import FormContentLoader from "../../FormContentLoader";
import FormFieldBoolean from "../../FormFieldBoolean";
import FormFieldDate from "../../FormFieldDate";
import FormFieldGrid from "../../FormFieldGrid";
import FormFieldNumber from "../../FormFieldNumber";
import FormFieldRenderState from "../../FormFieldRenderState";
import { FormProvider, useFormField } from "../../../hooks/useFormContext";
import {
    FormFieldButtonSave,
    FormFieldButtonReset,
} from "../../FormFieldButton";

function DepartureHeader() {
    const [id] = useFormField("id");
    const [dateIso] = useFormField("date", 0);
    const date = new Date(dateIso);

    return (
        <React.Fragment>
            <h3 className="form-field-grid-row-all text-lg">
                {dateIso ? format(date, "dd/MM/yyyy") : "loading..."}
            </h3>
            <FormFieldDate prop="date" label="Date" />
            <FormFieldButtonSave
                nameProp="date"
                listApi="/departures"
                getApi={`/departures/${id}`}
                putApi={`/departures/${id}`}
            />
        </React.Fragment>
    );
}

function PriceEditor({ id }) {
    return (
        <FormProvider>
            <FormContentLoader getApi={`/prices/${id}`} />

            <div className="pr-2">
                <FormFieldRenderState>
                    {({ accommodation_grade: accommodationGrade }) =>
                        accommodationGrade?.label ?? ""
                    }
                </FormFieldRenderState>
            </div>

            <div>
                <FormFieldNumber prop="now_price" />
            </div>

            <div>
                <FormFieldNumber prop="was_price" />
            </div>

            <div>
                <FormFieldBoolean prop="sold_out" />
            </div>

            <div>
                <FormFieldBoolean prop="generic_price" />
            </div>

            <div>
                <FormFieldButtonSave
                    nameProp="now_price"
                    listApi="/prices"
                    getApi={`/prices/${id}`}
                    putApi={`/prices/${id}`}
                />
                <FormFieldButtonReset />
            </div>

            <hr className="col-span-full justify-self-stretch" />
        </FormProvider>
    );
}

function PricesEditor() {
    const [prices] = useFormField("prices", []);

    return (
        <div
            className={cn(
                "list-disc",
                "pl-4",
                "form-field-grid-row-input",
                "gap-2",
                "grid",
                "grid-cols-6-auto",
                "items-center",
                "justify-items-center",
            )}
        >
            <div>Accommodation Grade</div>
            <div>Now Price</div>
            <div>Was Price</div>
            <div>Sold Out</div>
            <div>Generic Price</div>

            <hr className="col-span-full justify-self-stretch" />

            {prices.map(({ id }) => (
                <PriceEditor key={id} id={id} />
            ))}
        </div>
    );
}

function ShowDepartureItineraryItems({ sortedItineraryItems }) {
    const [dateIso] = useFormField("date", new Date());
    const date = new Date(dateIso);

    return (
        <ol className="list-disc pl-4">
            {sortedItineraryItems.map(({ id, label, startDay, endDay }, i) => (
                <li key={"" + id + i}>
                    <span className="px-1">
                        {format(addDays(date, startDay), "dd/MM/yyyy")}
                    </span>
                    -
                    <span className="px-1">
                        {format(addDays(date, endDay), "dd/MM/yyyy")}
                    </span>
                    <span className="px-1">{label}</span>
                </li>
            ))}
        </ol>
    );
}

export default function DepartureEditor({ id, sortedItineraryItems }) {
    return (
        <FormProvider>
            <FormFieldGrid className="form-field-grid-row-input border rounded shadow p-2 m-2">
                <FormContentLoader getApi={`/departures/${id}`} />
                <DepartureHeader />
                <PricesEditor />

                <details className="form-field-grid-row-all cursor-pointer">
                    <summary>Specific Itinarary Days</summary>

                    <ShowDepartureItineraryItems
                        sortedItineraryItems={sortedItineraryItems}
                    />
                </details>
            </FormFieldGrid>
        </FormProvider>
    );
}
