import { browseCountries } from '@/src/scenarios/countries/browse';
import { detailedLookup } from '@/src/scenarios/countries/detailed-lookup';
import { filterSearch } from '@/src/scenarios/countries/filter-search';
import { batchQuery } from '@/src/scenarios/countries/batch-query';
import { createLogger } from '@/src/logger';
import { scenarios } from '@/src/config/scenarios';
// @ts-ignore
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
// @ts-ignore
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.1.0/index.js';
// @ts-ignore
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const logger = createLogger('CountriesLoadTest');
const REPORT_PATH = 'blob-report/load.html';

export function setup() {
    logger.info('Countries API Load Test started');
}

export const options = scenarios.load

export default function () {
    const scenario = randomIntBetween(1, 100);
    
    if (scenario <= 40) {
        browseCountries();
    } else if (scenario <= 65) {
        detailedLookup();
    } else if (scenario <= 85) {
        filterSearch();
    } else {
        batchQuery();
    }
}

export function teardown() {
    logger.info('Countries Load Test completed. Check metrics for performance analysis');
}

export function handleSummary(data: any) {
  return {
        [REPORT_PATH]: htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
