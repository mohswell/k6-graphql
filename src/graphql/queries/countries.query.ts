import { COUNTRY_FIELDS, CONTINENT_FIELDS, LANGUAGE_FIELDS } from "@/src/graphql/fragments";

export const GET_ALL_COUNTRIES_QUERY = {
    query: `
    ${COUNTRY_FIELDS}
    query GetAllCountries {
      countries {
        ...CountryFields
      }
    }
  `,
    operationName: 'GetAllCountries'
} as const;

export const GET_COUNTRY_QUERY = {
    query: `
    ${COUNTRY_FIELDS}
    query GetCountry($code: ID!) {
      country(code: $code) {
        ...CountryFields
      }
    }
  `,
    operationName: 'GetCountry'
} as const;

//! Heavy query: Get country with all relations
export const GET_COUNTRY_FULL_QUERY = {
    query: `
    query GetCountryFull($code: ID!) {
      country(code: $code) {
        code
        name
        native
        phone
        capital
        currency
        emoji
        emojiU
        continent {
            code
            name
        }
        languages {
            code
            name
            native
        }
      }
    }
  `,
    operationName: 'GetCountryFull'
} as const;

export const GET_COUNTRIES_BY_CONTINENT_QUERY = {
    query: `
    ${COUNTRY_FIELDS}
    query GetCountriesByContinent($continentCode: String!) {
      countries(filter: { continent: $continentCode }) {
        ...CountryFields
      }
    }
  `,
    operationName: 'GetCountriesByContinent'
} as const;

export const GET_COUNTRIES_BY_CURRENCY_QUERY = {
    query: `
    ${COUNTRY_FIELDS}
    query GetCountriesByCurrency($currency: String!) {
        countries(filter: { currency: $currency }) {
            ...CountryFields
        }
    }
    `,
    operationName: 'GetCountriesByCurrency'
} as const;

export const GET_ALL_CONTINENTS_QUERY = {
    query: `
    ${CONTINENT_FIELDS}
    query GetAllContinents {
        continents {
            ...ContinentFields
        }
    }`,
    operationName: 'GetAllContinents'
} as const;

export const GET_CONTINENT_BY_CODE_QUERY = {
    query: `
    ${CONTINENT_FIELDS}
    query GetContinentByCode($code: String!) {
      continents(filter: { continent: $code }) {
        ...ContinentFields
      }
    }
  `,
    operationName: 'GetContinentByCode'

} as const;

export const GET_CONTINENT_WITH_COUNTRIES_QUERY = {
    query: `
    query GetContinentWithCountries($code: ID!) {
        continent(code: $code) {
            code
            name
            countries {
                code
                name
                capital
                emoji
                currency
            }
        }
    }
    `,
    operationName: 'GetContinentWithCountries',
} as const;


export const GET_LANGUAGES_QUERY = {
    query: `
    ${LANGUAGE_FIELDS}
    query GetLanguages {
      languages {
        ...LanguageFields
      }
    }
    `,
    operationName: 'GetLanguages'

} as const;

export const GET_LANGUAGE_BY_CODE_QUERY = {
    query: `
    ${LANGUAGE_FIELDS}
    query GetLanguageByCode($code: String!) {
        language(code: $code) {
            ...LanguageFields
        }
    }
    `,
    operationName: 'GetLanguageByCode'
} as const;
