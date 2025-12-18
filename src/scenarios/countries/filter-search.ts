import { sleep } from 'k6';
import {
    createRequest,
    GET_CONTINENT_WITH_COUNTRIES_QUERY,
    GET_COUNTRIES_BY_CURRENCY_QUERY,
    GET_COUNTRY_FULL_QUERY,
} from '@/src/graphql';
import { runQuery } from '@/src/clients/common';
import { CountriesDataGenerator } from '@/src/generators';

export function filterSearch() {
    const action = Math.random();

    if (action < 0.5) {
        filterByContinent();
    } else if (action < 0.8) {
        filterByCurrency();
    } else {
        compareCountries();
    }

    sleep(1);
}

function filterByContinent() {
    const continentCode = CountriesDataGenerator.randomContinentCode();
    const request = createRequest(GET_CONTINENT_WITH_COUNTRIES_QUERY, { code: continentCode });
    runQuery(request, 'GetContinentWithCountries');
}

function filterByCurrency() {
    const currency = CountriesDataGenerator.randomCurrency();
    const request = createRequest(GET_COUNTRIES_BY_CURRENCY_QUERY, { currency });
    runQuery(request, 'GetCountriesByCurrency');
}

function compareCountries() {
    const codes = CountriesDataGenerator.randomCountryCodes(2);

    codes.forEach((code, index) => {
        const request = createRequest(GET_COUNTRY_FULL_QUERY, { code });
        runQuery(request, `CompareCountries${index + 1}`);
        if (index === 0) sleep(0.5);
    });
}