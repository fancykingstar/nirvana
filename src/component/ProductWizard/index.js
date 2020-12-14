import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";

import TitleBox from "../TitleBox";
import { FormProvider } from "../../hooks/useFormContext";

import SelectProduct from "./SelectProduct";
import Step01BasicDetails from "./Step01BasicDetails";
import Step02Structure from "./Step02Structure";

function StepSelector() {
    return (
        <FormProvider>
            <Switch>
                <Route
                    path={`/:env/wizard/product/:id/basic-details`}
                    component={Step01BasicDetails}
                />
                <Route
                    path={`/:env/wizard/product/:id/itinerary`}
                    component={Step02Structure}
                />
            </Switch>
        </FormProvider>
    );
}

export default function ProductWizard({
    match: {
        params: { env },
    },
}) {
    return (
        <TitleBox>
            <TitleBox.Header>Product Wizard</TitleBox.Header>
            <TitleBox.Body>
                <Switch>
                    <Route
                        path={`/:env/wizard/product/:id/:step`}
                        component={StepSelector}
                    />

                    <Route
                        path={`/:env/wizard/product/:id`}
                        component={function StepOneRedirect({
                            match: {
                                params: { id },
                            },
                        }) {
                            return (
                                <Redirect
                                    to={`/${env}/wizard/product/${id}/basic-details`}
                                />
                            );
                        }}
                    />

                    <Route
                        path={`/:env/wizard/product`}
                        component={SelectProduct}
                    />
                </Switch>
            </TitleBox.Body>
        </TitleBox>
    );
}
