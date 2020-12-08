import React from "react";

import {
    queryByText as queryByTextUnbound,
    getByText as getByTextUnbound,
    getByLabelText as getByLabelTextUnbound,
    waitFor,
    render,
    fireEvent,
} from "@testing-library/react";

import { createWrapper } from "./utils";

import App from "../src/App";

describe("itineraryItems/forms", () => {
    describe("edit", () => {
        it("will automatically display the currently used physical location", async () => {
            const { wrapper } = createWrapper({
                route: "/local/itinerary-items/edit/1",
            });
            const { queryByTestId } = render(<App />, { wrapper });

            await waitFor(() =>
                expect(
                    queryByTestId("form-field-one-of-fields-group"),
                ).toBeInTheDocument(),
            );

            const queryByText = queryByTextUnbound.bind(
                null,
                queryByTestId("form-field-one-of-fields-group"),
            );

            await waitFor(() =>
                expect(queryByText(/athens/i)).toBeInTheDocument(),
            );

            expect(queryByText(/latitude/i)).not.toBeInTheDocument();
        });

        it("will retain state for unfocused physical locations", async () => {
            const { wrapper } = createWrapper({
                route: "/local/itinerary-items/edit/1",
            });
            const { queryByTestId } = render(<App />, { wrapper });

            await waitFor(() =>
                expect(
                    queryByTestId("form-field-one-of-fields-group"),
                ).toBeInTheDocument(),
            );

            const queryByText = queryByTextUnbound.bind(
                null,
                queryByTestId("form-field-one-of-fields-group"),
            );
            const getByText = getByTextUnbound.bind(
                null,
                queryByTestId("form-field-one-of-fields-group"),
            );

            await waitFor(() =>
                expect(queryByText(/athens/i)).toBeInTheDocument(),
            );

            fireEvent.click(getByText(/coords/i));

            expect(queryByText(/athens/i)).not.toBeInTheDocument();
            expect(queryByText(/latitude/i)).toBeInTheDocument();

            fireEvent.click(getByText(/city/i));

            expect(queryByText(/athens/i)).toBeInTheDocument();
            expect(queryByText(/latitude/i)).not.toBeInTheDocument();
        });

        it.skip("will update the new physical location, and clear the old one", async () => {
            const { apiFetch, resetDb, wrapper } = createWrapper({
                route: "/local/itinerary-items/edit/1",
            });
            const {
                unmount,
                findByText: findByTextWholeApp,
                container,
                queryByTestId,
            } = render(<App />, { wrapper });

            // wait for the form to load
            await waitFor(() =>
                expect(
                    queryByTestId("form-field-one-of-fields-group"),
                ).toBeInTheDocument(),
            );

            // bind some testing helpers to just opperate over the Physical Location
            // section of the form
            const queryByText = queryByTextUnbound.bind(
                null,
                queryByTestId("form-field-one-of-fields-group"),
            );
            const getByText = getByTextUnbound.bind(
                null,
                queryByTestId("form-field-one-of-fields-group"),
            );
            const getByLabelText = getByLabelTextUnbound.bind(
                null,
                queryByTestId("form-field-one-of-fields-group"),
            );

            // wait for the data to load
            await waitFor(() =>
                expect(queryByText(/athens/i)).toBeInTheDocument(),
            );
            await waitFor(() =>
                expect(queryByText(/(greece)/i)).toBeInTheDocument(),
            );

            // check that the API is returning the correct current value
            expect(await apiFetch("/itinerary-items/1")).toMatchObject({
                id: 1,
                latitude: null,
                longitude: null,
                city: {
                    id: 723,
                },
            });

            fireEvent.click(getByText(/coords/i));

            fireEvent.change(getByLabelText(/latitude/i), {
                target: { value: "1" },
            });
            fireEvent.change(getByLabelText(/longitude/i), {
                target: { value: "2" },
            });

            fireEvent.click(container.querySelector(`button[color="blue"]`));

            // wait for the toasts
            await findByTextWholeApp(/Saving/i);
            await findByTextWholeApp(/Saved/i);

            // unmount the form, we don't need it anymore
            await unmount();

            //check to see if the API has updated as we'd expect
            expect(await apiFetch("/itinerary-items/1")).toMatchObject({
                id: 1,
                latitude: 1,
                longitude: 2,
                city: null,
            });

            // we've mutated the test DB, we need to clean up after outselves
            await resetDb();
        });
    });
});
