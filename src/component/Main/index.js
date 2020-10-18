import React from "react";
import { Switch, Route } from "react-router-dom";

import Breadcrumb from "../Breadcrumb";
import EntityList from "../EntityList";
import FilterListCity from "../FilterListCity";
import FormEditCity from "../FormEditCity";

export default function Main() {
    return (
        <main>
            <Breadcrumb />
            <Switch>
                <Route path="/:env/cities/edit/:id" component={FormEditCity} />
                <Route path="/:env/cities" component={FilterListCity} />
                <Route component={EntityList} />
            </Switch>
        </main>
    );
}
