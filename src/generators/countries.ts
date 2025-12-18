import { continentCodes, countryCodes, currencies, languages } from "@/src/data";
import { randomItem } from "@/src/lib/utils";

/**
 * Countries Data Generator
 */

export class CountriesDataGenerator {
    static randomCountryCode(): string {
        return randomItem(countryCodes);
    }

    static randomContinentCode(): string {
        return randomItem(continentCodes);
    }

    static randomCurrency(): string {
        return randomItem(currencies);
    }

    static randomLanguage(): string {
        return randomItem(languages).name;
    }

    static randomLanguageCode(): string {
        return randomItem(languages).code;
    }

    static randomCountryCodes(count: number): string[] {
        const result = new Set<string>();

        while (result.size < Math.min(count, countryCodes.length)) {
            result.add(this.randomCountryCode());
        }

        return [...result];
    }

    static allCountryCodes(): string[] {
        return [...countryCodes];
    }

    static allContinentCodes(): string[] {
        return [...continentCodes];
    }
}

/**
 * Scenario Data Generator for Countries API
 */
export class CountriesScenarioGenerator {
    static countryQuery() {
        return { countryCode: CountriesDataGenerator.randomCountryCode() };
    }

    static continentQuery() {
        return { continentCode: CountriesDataGenerator.randomContinentCode() };
    }

    static currencyQuery() {
        return { currency: CountriesDataGenerator.randomCurrency() };
    }

    static languageQuery() {
        return { language: CountriesDataGenerator.randomLanguage() };
    }

    static batchCountryCodes(count = 5) {
        return CountriesDataGenerator.randomCountryCodes(count);
    }
}
