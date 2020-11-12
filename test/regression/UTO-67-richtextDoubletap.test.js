import React from "react";

import { act, render } from "@testing-library/react";

import { FormFieldTestable, createWrapper } from "../utils";

import { FormProvider } from "../../src/hooks/useFormContext";

import FormFieldRichText from "../../src/component/FormFieldRichText";

it("will not duplicate the first character typed into a description field", async () => {
    const { wrapper } = createWrapper({
        route: "/local/events/create",
    });

    const { container, getByTestId } = render(
        <FormProvider>
            <FormFieldRichText prop="description" label="Description" />

            <FormFieldTestable
                prop="description"
                data-testid="description-output"
            />
        </FormProvider>,
        {
            wrapper,
        },
    );

    expect(
        JSON.parse(getByTestId("description-output").dataset.testValue).state,
    ).toBeUndefined();

    act(() => {
        container
            .querySelector(".ql-editor")
            .parentElement.__quill.insertText(0, "x", "x", "x", "api");
    });

    expect(
        JSON.parse(getByTestId("description-output").dataset.testValue),
    ).not.toMatchObject({ state: "<p>xx</p>" });
    expect(
        JSON.parse(getByTestId("description-output").dataset.testValue),
    ).toMatchObject({ state: "<p>x</p>" });
});
