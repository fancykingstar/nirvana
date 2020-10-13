import React from "react";
import { Switch, Route } from "react-router-dom";

import FormEditCity from "../FormEditCity";

export default function Main() {
    return (
        <main>
            <Switch>
                <Route path="/:env/edit/city/:id" component={FormEditCity} />
            </Switch>
        </main>
    );
}
