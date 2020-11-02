import React from "react";
import { Switch, Route } from "react-router-dom";

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
import FilterListPrice from "../FilterListPrice";
import FilterListVersion from "../FilterListVersion";
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
import { FormPriceCreate, FormPriceEdit } from "../FormPrice";
import { FormVersionCreate, FormVersionEdit } from "../FormVersion";

function createEntityBlock({ Create, Edit, List }) {
    return function EntityBlock({ match: { path } }) {
        return (
            <Switch>
                <Route path={`${path}/create`} component={Create} />
                <Route path={`${path}/edit/:id`} component={Edit} />
                <Route component={List} />
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
                        Create: FormAirportCreate,
                        Edit: FormAirportEdit,
                        List: FilterListAirport,
                    })}
                />

                <Route
                    path="/:env/cities"
                    component={createEntityBlock({
                        Create: FormCityCreate,
                        Edit: FormCityEdit,
                        List: FilterListCity,
                    })}
                />

                <Route
                    path="/:env/countries"
                    component={createEntityBlock({
                        Create: FormCountryCreate,
                        Edit: FormCountryEdit,
                        List: FilterListCountry,
                    })}
                />

                <Route
                    path="/:env/currencies"
                    component={createEntityBlock({
                        Create: FormCurrencyCreate,
                        Edit: FormCurrencyEdit,
                        List: FilterListCurrency,
                    })}
                />

                <Route
                    path="/:env/events"
                    component={createEntityBlock({
                        Create: FormEventCreate,
                        Edit: FormEventEdit,
                        List: FilterListEvent,
                    })}
                />

                <Route
                    path="/:env/exchange-rates"
                    component={createEntityBlock({
                        Create: FormExchangeRateCreate,
                        Edit: FormExchangeRateEdit,
                        List: FilterListExchangeRate,
                    })}
                />

                <Route
                    path="/:env/itineraries"
                    component={createEntityBlock({
                        Create: FormItineraryCreate,
                        Edit: FormItineraryEdit,
                        List: FilterListItinerary,
                    })}
                />

                <Route
                    path="/:env/itinerary-items"
                    component={createEntityBlock({
                        Create: FormItineraryItemCreate,
                        Edit: FormItineraryItemEdit,
                        List: FilterListItineraryItem,
                    })}
                />

                <Route
                    path="/:env/ports"
                    component={createEntityBlock({
                        Create: FormPortCreate,
                        Edit: FormPortEdit,
                        List: FilterListPort,
                    })}
                />

                <Route
                    path="/:env/prices"
                    component={createEntityBlock({
                        Create: FormPriceCreate,
                        Edit: FormPriceEdit,
                        List: FilterListPrice,
                    })}
                />

                <Route
                    path="/:env/versions"
                    component={createEntityBlock({
                        Create: FormVersionCreate,
                        Edit: FormVersionEdit,
                        List: FilterListVersion,
                    })}
                />

                <Route component={EntityList} />
            </Switch>
        </main>
    );
}
