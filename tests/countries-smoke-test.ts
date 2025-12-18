import { browseCountries } from '@/src/scenarios/countries';
import { scenarios } from '@/src/config/scenarios';
// @ts-ignore
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
// @ts-ignore
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.1.0/index.js';

const REPORT_PATH = 'blob-report/smoke.html';

export const options = scenarios.smoke;

export default function () {
  browseCountries();
}

export function handleSummary(data: any) {
  return {
    [REPORT_PATH]: htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
