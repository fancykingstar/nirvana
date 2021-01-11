import React from "react";
import { Route, Switch } from "react-router-dom";

import CreateAsset from "./CreateAsset";
import EditAsset from "./EditAsset";
//import ListAssets from "./ListAssets";

export default function AssetsEditor({ match: { path } }) {
    return (
        <Switch>
            <Route path={`${path}/create`} component={CreateAsset} />
            <Route path={`${path}/edit/:id`} component={EditAsset} />
            {/*
            <Route path={path} component={ListAssets} />
            */}
        </Switch>
    );
}
