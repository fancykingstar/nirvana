import React from "react";
import { Switch, Route } from "react-router-dom";

import Breadcrumb from "../Breadcrumb";
import EntityList from "../EntityList";

import ProductWizard from "../ProductWizard";
import FilterListAccommodation from "../FilterListAccommodation";
import FilterListAirport from "../FilterListAirport";
import FilterListAccommodationGrades from "../FilterListAccommodationGrades";
import FilterListCity from "../FilterListCity";
import FilterListCountry from "../FilterListCountry";
import FilterListCurrency from "../FilterListCurrency";
import FilterListDeparture from "../FilterListDeparture";
import FilterListEvent from "../FilterListEvent";
import FilterListExchangeRate from "../FilterListExchangeRate";
import FilterListGradeMapping from "../FilterListGradeMapping";
import FilterListItinerary from "../FilterListItinerary";
import FilterListItineraryItem from "../FilterListItineraryItem";
import FilterListOrganisation from "../FilterListOrganisation";
import FilterListPort from "../FilterListPort";
import FilterListPrice from "../FilterListPrice";
import FilterListProduct from "../FilterListProduct";
import FilterListVersion from "../FilterListVersion";
import {
    FormAccommodationCreate,
    FormAccommodationEdit,
} from "../FormAccommodation";
import { FormAirportCreate, FormAirportEdit } from "../FormAirport";
import {
    FormAccommodationGradesCreate,
    FormAccommodationGradesEdit,
} from "../FormAccommodationGrades";
import { FormCityCreate, FormCityEdit } from "../FormCity";
import { FormCountryCreate, FormCountryEdit } from "../FormCountry";
import { FormCurrencyCreate, FormCurrencyEdit } from "../FormCurrency";
import { FormDepartureCreate, FormDepartureEdit } from "../FormDeparture";
import { FormEventCreate, FormEventEdit } from "../FormEvent";
import {
    FormExchangeRateCreate,
    FormExchangeRateEdit,
} from "../FormExchangeRate";
import {
    FormGradeMappingCreate,
    FormGradeMappingEdit,
} from "../FormGradeMapping";
import { FormItineraryCreate, FormItineraryEdit } from "../FormItinerary";
import {
    FormItineraryItemCreate,
    FormItineraryItemEdit,
} from "../FormItineraryItem";
import {
    FormOrganisationCreate,
    FormOrganisationEdit,
} from "../FormOrganisation";
import { FormPortCreate, FormPortEdit } from "../FormPort";
import { FormPriceCreate, FormPriceEdit } from "../FormPrice";
import { FormProductCreate, FormProductEdit } from "../FormProduct";
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
                    path="/:env/accommodation-grades"
                    component={createEntityBlock({
                        Create: FormAccommodationGradesCreate,
                        Edit: FormAccommodationGradesEdit,
                        List: FilterListAccommodationGrades,
                    })}
                />
                <Route
                    path="/:env/accommodations"
                    component={createEntityBlock({
                        Create: FormAccommodationCreate,
                        Edit: FormAccommodationEdit,
                        List: FilterListAccommodation,
                    })}
                />

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
                    path="/:env/departures"
                    component={createEntityBlock({
                        Create: FormDepartureCreate,
                        Edit: FormDepartureEdit,
                        List: FilterListDeparture,
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
                    path="/:env/grade-mappings"
                    component={createEntityBlock({
                        Create: FormGradeMappingCreate,
                        Edit: FormGradeMappingEdit,
                        List: FilterListGradeMapping,
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
                    path="/:env/organisations"
                    component={createEntityBlock({
                        Create: FormOrganisationCreate,
                        Edit: FormOrganisationEdit,
                        List: FilterListOrganisation,
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
                    path="/:env/products"
                    component={createEntityBlock({
                        Create: FormProductCreate,
                        Edit: FormProductEdit,
                        List: FilterListProduct,
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

                <Route
                    path="/:env/wizard/product/:id?/:step?"
                    component={ProductWizard}
                />

                <Route component={EntityList} />
            </Switch>
        </main>
    );
}
