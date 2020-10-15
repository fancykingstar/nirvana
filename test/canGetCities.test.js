import React from "react";

import { render } from "@testing-library/react";

import TestHarness from "./Harness";

import App from "../src/App";

describe("demo test", () => {
    it("can get cities", async () => {
        const { findByText } = render(
            <TestHarness route="/local/list/city">
                <App />
            </TestHarness>,
        );

        await findByText("Cities");
    });
});
