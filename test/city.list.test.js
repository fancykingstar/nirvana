import React from "react";

import { render, fireEvent } from "@testing-library/react";

import { createWrapper } from "./utils";

import App from "../src/App";

describe("cities/list", () => {
    it("can get a list of cities", async () => {
        const { wrapper } = createWrapper({
            route: "/local/cities/list",
        });

        const { findByText } = render(<App />, { wrapper });

        await findByText(/15496 entries matching current filter/);
    });

    it("can navigate to the last page", async () => {
        const { getCurrentLocation, wrapper } = createWrapper({
            route: "/local/cities/list",
        });

        const { findByText, getByText } = render(<App />, { wrapper });

        await findByText(/15496 entries matching current filter/);

        fireEvent.click(getByText("774"));

        expect(getCurrentLocation()).toMatchObject({
            pathname: "/local/cities/list",
            query: {
                pageNumber: "774",
            },
        });

        await findByText("Zurich");
    });

    it("can load directly to the last page", async () => {
        const { wrapper } = createWrapper({
            route: "/local/cities/list?pageNumber=774",
        });

        const { findByText } = render(<App />, { wrapper });

        await findByText(/15496 entries matching current filter/);
        await findByText("Zurich");
    });

    it("can navigate to a city's edit page", async () => {
        const { getCurrentLocation, wrapper } = createWrapper({
            route: "/local/cities/list",
        });

        const { findByText, getByText } = render(<App />, { wrapper });

        await findByText(/15496 entries matching current filter/);

        fireEvent.click(getByText("20"));

        expect(getCurrentLocation()).toMatchObject({
            pathname: "/local/cities/edit/20",
        });
    });

    it("can navigate to a country's edit page", async () => {
        const { getCurrentLocation, wrapper } = createWrapper({
            route: "/local/cities/list",
        });

        const { findByText, getByText } = render(<App />, { wrapper });

        await findByText(/15496 entries matching current filter/);

        fireEvent.click(getByText("Russia"));

        expect(getCurrentLocation()).toMatchObject({
            pathname: "/local/countries/edit/165",
        });
    });

    it("can search for cities by name", async () => {
        const { wrapper } = createWrapper({
            route: "/local/cities/list",
        });

        const { findByText, getByLabelText, queryByText } = render(<App />, {
            wrapper,
        });

        await findByText(/15496 entries matching current filter/);

        expect(queryByText(/addis ababa/i)).not.toBeInTheDocument();

        fireEvent.change(getByLabelText(/search/i), {
            target: { value: "aba" },
        });

        await findByText(/158 entries matching current filter/);
        await findByText(/addis ababa/i);
    });
});
