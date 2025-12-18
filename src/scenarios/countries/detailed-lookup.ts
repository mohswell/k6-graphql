import { sleep } from 'k6';
import { createRequest, GET_COUNTRY_FULL_QUERY } from '@/src/graphql';
import { CountriesDataGenerator } from '@/src/generators';
import { createLogger } from '@/src/logger';
import { runQuery } from '@/src/clients/common';

const logger = createLogger('CountriesDetailedLookup');

export function detailedLookup() {
    const code = CountriesDataGenerator.randomCountryCode();
    const request = createRequest(GET_COUNTRY_FULL_QUERY, { code });

    const { ok } = runQuery(request, 'GetCountryFull');

    if (ok) {
        logger.info(`Country lookup: ${code}`);
    }

    sleep(2);
}