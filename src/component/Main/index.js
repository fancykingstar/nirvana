import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";

import Breadcrumb from "../Breadcrumb";
import EntityList from "../EntityList";

import FilterListCity from "../FilterListCity";
import FilterListCountry from "../FilterListCountry";
import FormCityCreate from "../FormCityCreate";
import FormCityEdit from "../FormCityEdit";
import FormCountryCreate from "../FormCountryCreate";
import FormCountryEdit from "../FormCountryEdit";

function EntityRootRedirect({ path, to }) {
    function Redirecter({
        match: {
            params: { env },
        },
    }) {
        return <Redirect to={`/${env}/${to}`} />;
    }

    return <Route path={path} component={Redirecter} />;
}

export default function Main() {
    return (
        <main>
            <Breadcrumb />
            <Switch>
                <Route path="/:env/cities/create" component={FormCityCreate} />
                <Route path="/:env/cities/edit/:id" component={FormCityEdit} />
                <Route path="/:env/cities" component={FilterListCity} />
                <EntityRootRedirect
                    path="/:env/cities/:foo"
                    to="/:env/cities"
                />

                <Route
                    path="/:env/countries/create"
                    component={FormCountryCreate}
                />
                <Route
                    path="/:env/countries/edit/:id"
                    component={FormCountryEdit}
                />
                <Route path="/:env/countries" component={FilterListCountry} />
                <EntityRootRedirect
                    path="/:env/countries/:foo"
                    to="/:env/countries"
                />

                <Route component={EntityList} />
            </Switch>
        </main>
    );
}
