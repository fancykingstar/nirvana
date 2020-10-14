import React from "react";
import { Switch, Route } from "react-router-dom";

import FormEditCity from "../FormEditCity";
import FilterListCity from "../FilterListCity";

export default function Main() {
    return (
        <main>
            <Switch>
                <Route path="/:env/edit/city/:id" component={FormEditCity} />
                <Route path="/:env/list/city" component={FilterListCity} />
            </Switch>
        </main>
    );
}
