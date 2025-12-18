import {
  browseCountries,
  detailedLookup,
  filterSearch,
  batchQuery,
} from '@/src/scenarios/countries';
import { scenarios } from '@/src/config/scenarios';
// @ts-ignore
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
// @ts-ignore
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.1.0/index.js';
// @ts-ignore
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const REPORT_PATH = 'blob-report/stress.html';

export const options = scenarios.stress;

export default function () {
  const scenario = randomIntBetween(1, 100);

  if (scenario <= 40) {
    browseCountries();
  } else if (scenario <= 70) {
    detailedLookup();
  } else if (scenario <= 90) {
    filterSearch();
  } else {
    batchQuery();
  }
}

export function handleSummary(data: any) {
  return {
    [REPORT_PATH]: htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
