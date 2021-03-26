import * as React from "react";

import FormFieldLinkedSingle from "../FormFieldLinkedSingle";
import FormFieldLinkedMany from "../FormFieldLinkedMany";

export default function AccommodationField({ primaryOnly }) {
    const displayAdditional = primaryOnly ?? true;

    return (
        <React.Fragment>
            <FormFieldLinkedSingle
                required
                label="Primary Accommodation"
                prop="primary_accommodation"
                searchProp="name"
                searchApi="/accommodations"
                RenderLinked={function LinkedAccomodation({ name }) {
                    return <span>{name}</span>;
                }}
                RenderSearchResult={function ResultAccomodation({
                    id,
                    name,
                    set,
                }) {
                    return <li onClick={set.bind(null, id)}>{name}</li>;
                }}
            />

            {!displayAdditional && (
                <React.Fragment>
                    <hr className="form-field-grid-row-input" />

                    <FormFieldLinkedMany
                        label="Secondary Accomodations"
                        prop="additional_accommodations"
                        searchProp="name"
                        searchApi="/accommodations"
                        RenderLinked={function LinkedAccomodation({
                            name,
                            id,
                            remove,
                        }) {
                            return (
                                <li onClick={remove.bind(null, id)}>{name}</li>
                            );
                        }}
                        RenderSearchResult={function ResultAccomodation({
                            id,
                            name,
                            add,
                        }) {
                            return <li onClick={add.bind(null, id)}>{name}</li>;
                        }}
                    />
                </React.Fragment>
            )}
        </React.Fragment>
    );
}
