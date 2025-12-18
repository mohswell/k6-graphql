import { sleep } from 'k6';
import { createRequest, GET_ALL_COUNTRIES_QUERY } from '@/src/graphql';
import { runQuery } from '@/src/clients/common';

export function browseCountries() {
    runQuery(createRequest(GET_ALL_COUNTRIES_QUERY), 'GetAllCountries');
    sleep(1);
}
