import React from "react";
import { ThemeProvider as TP } from "styled-components";

const theme = {
    color: {
        black: "#111",
        blue: "#33b",
        red: "#b33",
        gray: "#666",
        white: "#ededed",
    },
    size: ["4px", "8px", "12px", "16px", "24px", "32px", "48px", "64px"],
    text: ["8px", "12px", "16px", "24px", "32px", "48px", "64px"],

    shadow: [
        "box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);",
        "box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);",
        "box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);",
        "box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);",
        "box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
    ],
};

export default function ThemeProvider({ children }) {
    return <TP theme={theme}>{children}</TP>;
}
