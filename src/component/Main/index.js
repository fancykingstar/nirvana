import React from "react";
import { Switch, Route } from "react-router-dom";

import FormEditCity from "../FormEditCity";
import FilterListCity from "../FilterListCity";

export default function Main() {
    return (
        <main>
            <Switch>
                <Route path="/:env/city/edit/:id" component={FormEditCity} />
                <Route path="/:env/city/list" component={FilterListCity} />
            </Switch>
        </main>
    );
}
