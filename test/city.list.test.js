import React from "react";

import { render, fireEvent } from "@testing-library/react";

import { createWrapper } from "./utils";

import App from "../src/App";

describe("city/list", () => {
    it("can get a list of cities", async () => {
        const { wrapper } = createWrapper({
            route: "/local/city/list",
        });

        const { findByText } = render(<App />, { wrapper });

        await findByText(/15494 entries matching current filter/);
    });

    it("can navigate to the last page", async () => {
        const { getCurrentLocation, wrapper } = createWrapper({
            route: "/local/city/list",
        });

        const { findByText, getByText } = render(<App />, { wrapper });

        await findByText(/15494 entries matching current filter/);

        fireEvent.click(getByText("774"));

        expect(getCurrentLocation()).toMatchObject({
            pathname: "/local/city/list",
            query: {
                pageNumber: "774",
            },
        });

        await findByText("Zurich");
    });

    it("can load directly to the last page", async () => {
        const { wrapper } = createWrapper({
            route: "/local/city/list?pageNumber=774",
        });

        const { findByText } = render(<App />, { wrapper });

        await findByText(/15494 entries matching current filter/);
        await findByText("Zurich");
    });
});
