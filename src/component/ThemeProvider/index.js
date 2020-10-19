import React from "react";
import { ThemeProvider as TP } from "styled-components";

const theme = {
    color: {
        black: "#111",
        blue: "#33b",
        gray: "#666",
        white: "#fff",
    },
    size: ["4px", "8px", "12px", "16px", "24px", "32px", "48px", "64px"],
    text: ["8px", "12px", "16px", "24px", "32px", "48px", "64px"],
};

export default function ThemeProvider({ children }) {
    return <TP theme={theme}>{children}</TP>;
}
