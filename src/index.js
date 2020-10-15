import "babel-core/register";
import "babel-polyfill";

import React from "react";
import { render } from "react-dom";

import { BrowserRouter as RouterProvider } from "react-router-dom";

import ThemeProvider from "./component/ThemeProvider";
import AppContextProvider from "./component/AppContextProvider";
import ToastProvider from "./component/ToastProvider";

import App from "./App";

render(
    <ThemeProvider>
        <RouterProvider>
            <AppContextProvider>
                <ToastProvider>
                    <App />
                </ToastProvider>
            </AppContextProvider>
        </RouterProvider>
    </ThemeProvider>,
    document.getElementById("root"),
);
