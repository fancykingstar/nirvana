import "babel-core/register";
import "babel-polyfill";

import React from "react";
import { render } from "react-dom";
import { WidgetLoader } from "react-cloudinary-upload-widget";

import { BrowserRouter as RouterProvider } from "react-router-dom";

import AppContextProvider from "./component/AppContextProvider";
import ToastProvider from "./component/ToastProvider";
import SWRErrorProvider from "./component/SWRErrorProvider";

import App from "./App";

render(
    <RouterProvider>
        <AppContextProvider>
            <ToastProvider>
                <SWRErrorProvider>
                    <WidgetLoader />
                    <App />
                </SWRErrorProvider>
            </ToastProvider>
        </AppContextProvider>
    </RouterProvider>,
    document.getElementById("root"),
);
