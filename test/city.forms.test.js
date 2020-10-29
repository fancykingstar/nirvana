import React from "react";

import { waitFor, render, fireEvent } from "@testing-library/react";

import { createWrapper } from "./utils";

import App from "../src/App";

describe("cities/forms", () => {
    describe("edit", () => {
        it("can update an existing a city", async () => {
            const { apiFetch, wrapper, resetDb } = createWrapper({
                route: "/local/cities/edit/100",
            });

            const {
                container,
                findByText,
                getByLabelText,
                getByText,
                queryByText,
                unmount,
            } = render(<App />, {
                wrapper,
            });

            // wait for the form to be populated with the current data
            await waitFor(() =>
                expect(
                    container.querySelector(`input[value="Agadir"]`),
                ).toBeInTheDocument(),
            );

            // check that the API is returning the correct current value
            expect(await apiFetch("/cities/100")).toMatchObject({
                id: 100,
                name: "Agadir",
                label: "Agadir",
                latitude: 30.44,
                longitude: -9.62,
                country: {
                    id: 139,
                },
            });

            // update the values using the form
            fireEvent.change(getByLabelText(/name/i), {
                target: { value: "Test City" },
            });
            fireEvent.change(getByLabelText(/label/i), {
                target: { value: "test-city" },
            });
            fireEvent.change(getByLabelText(/latitude/i), {
                target: { value: "1" },
            });
            fireEvent.change(getByLabelText(/longitude/i), {
                target: { value: "2" },
            });

            fireEvent.change(getByLabelText(/replace/i), {
                target: { value: "united king" },
            });
            await findByText(/united kingdom/i);
            fireEvent.click(getByText(/united kingdom/i));

            // there should be no info toasts
            expect(queryByText(/Saving/i)).not.toBeInTheDocument();
            expect(queryByText(/Saved/i)).not.toBeInTheDocument();

            // click the save button
            fireEvent.click(container.querySelector(`button[color="blue"]`));

            // wait for the toasts
            await findByText(/Saving/i);
            await findByText(/Saved/i);

            // unmount the form, we don't need it anymore
            await unmount();

            //check to see if the API has updated as we'd expect
            expect(await apiFetch("/cities/100")).toMatchObject({
                id: 100,
                name: "Test City",
                label: "test-city",
                latitude: 1,
                longitude: 2,
                country: {
                    id: 212,
                },
            });

            // we've mutated the test DB, we need to clean up after outselves
            await resetDb();
        });
    });
});
