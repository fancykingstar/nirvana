import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";

import Breadcrumb from "../Breadcrumb";
import EntityList from "../EntityList";

import FilterListAirport from "../FilterListAirport";
import FilterListCity from "../FilterListCity";
import FilterListCountry from "../FilterListCountry";
import FilterListCurrency from "../FilterListCurrency";
import FilterListEvent from "../FilterListEvent";
import FilterListExchangeRate from "../FilterListExchangeRate";
import FilterListItinerary from "../FilterListItinerary";
import FilterListItineraryItem from "../FilterListItineraryItem";
import FilterListPort from "../FilterListPort";
import { FormAirportCreate, FormAirportEdit } from "../FormAirport";
import { FormCityCreate, FormCityEdit } from "../FormCity";
import { FormCountryCreate, FormCountryEdit } from "../FormCountry";
import { FormCurrencyCreate, FormCurrencyEdit } from "../FormCurrency";
import { FormEventCreate, FormEventEdit } from "../FormEvent";
import {
    FormExchangeRateCreate,
    FormExchangeRateEdit,
} from "../FormExchangeRate";
import { FormItineraryCreate, FormItineraryEdit } from "../FormItinerary";
import {
    FormItineraryItemCreate,
    FormItineraryItemEdit,
} from "../FormItineraryItem";
import { FormPortCreate, FormPortEdit } from "../FormPort";

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

function createEntityBlock({ entityName, Create, Edit, List }) {
    return function EntityBlock({
        match: {
            params: { env },
        },
    }) {
        return (
            <Switch>
                {Create ? (
                    <Route
                        path={`/:env/${entityName}/create`}
                        component={Create}
                    />
                ) : null}
                {Edit ? (
                    <Route
                        path={`/:env/${entityName}/edit/:id`}
                        component={Edit}
                    />
                ) : null}
                {List ? (
                    <Route path={`/:env/${entityName}`} component={List} />
                ) : null}
                <EntityRootRedirect to={`/${env}/cities`} />
            </Switch>
        );
    };
}

export default function Main() {
    return (
        <main>
            <Breadcrumb />
            <Switch>
                <Route
                    path="/:env/airports"
                    component={createEntityBlock({
                        entityName: "airports",
                        Create: FormAirportCreate,
                        Edit: FormAirportEdit,
                        List: FilterListAirport,
                    })}
                />

                <Route
                    path="/:env/cities"
                    component={createEntityBlock({
                        entityName: "cities",
                        Create: FormCityCreate,
                        Edit: FormCityEdit,
                        List: FilterListCity,
                    })}
                />

                <Route
                    path="/:env/countries"
                    component={createEntityBlock({
                        entityName: "countries",
                        Create: FormCountryCreate,
                        Edit: FormCountryEdit,
                        List: FilterListCountry,
                    })}
                />

                <Route
                    path="/:env/currencies"
                    component={createEntityBlock({
                        entityName: "currencies",
                        Create: FormCurrencyCreate,
                        Edit: FormCurrencyEdit,
                        List: FilterListCurrency,
                    })}
                />

                <Route
                    path="/:env/events"
                    component={createEntityBlock({
                        entityName: "events",
                        Create: FormEventCreate,
                        Edit: FormEventEdit,
                        List: FilterListEvent,
                    })}
                />

                <Route
                    path="/:env/exchange-rates"
                    component={createEntityBlock({
                        entityName: "exchange-rates",
                        Create: FormExchangeRateCreate,
                        Edit: FormExchangeRateEdit,
                        List: FilterListExchangeRate,
                    })}
                />

                <Route
                    path="/:env/itineraries"
                    component={createEntityBlock({
                        entityName: "itineraries",
                        Create: FormItineraryCreate,
                        Edit: FormItineraryEdit,
                        List: FilterListItinerary,
                    })}
                />

                <Route
                    path="/:env/itinerary-items"
                    component={createEntityBlock({
                        entityName: "itinerary-items",
                        Create: FormItineraryItemCreate,
                        Edit: FormItineraryItemEdit,
                        List: FilterListItineraryItem,
                    })}
                />

                <Route
                    path="/:env/ports"
                    component={createEntityBlock({
                        entityName: "ports",
                        Create: FormPortCreate,
                        Edit: FormPortEdit,
                        List: FilterListPort,
                    })}
                />

                <Route component={EntityList} />
            </Switch>
        </main>
    );
}
