import React from "react";
import { Switch, Route } from "react-router-dom";

import Breadcrumb from "../Breadcrumb";
import FilterListCity from "../FilterListCity";
import FormEditCity from "../FormEditCity";

export default function Main() {
    return (
        <main>
            <Breadcrumb />
            <Switch>
                <Route path="/:env/city/edit/:id" component={FormEditCity} />
                <Route path="/:env/city" component={FilterListCity} />
            </Switch>
        </main>
    );
}
