export const COUNTRY_FIELDS = `
  fragment CountryFields on Country {
    code
    name
    native
    phone
    continent {
      code
      name
    }
    capital
    currency
    languages {
      code
      name
    }
  }
`;

export const CONTINENT_FIELDS = `
  fragment ContinentFields on Continent {
    code
    name
    countries {
      code
      name
      phone
    }
  }
`;

export const LANGUAGE_FIELDS = `
  fragment LanguageFields on Language {
    code
    name
    native
    rtl
  }
`;
