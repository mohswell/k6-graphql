import { sleep } from 'k6';
import { createRequest, GET_COUNTRY_QUERY } from '@/src/graphql';
import { CountriesDataGenerator } from '@/src/generators';
import { GraphQLChecks } from '@/src/resources/checks';
import { GraphQLError } from '@/src/resources/errors';
import { getGraphQLClient } from '@/src/clients/common';

export function batchQuery() {
    const client = getGraphQLClient();
    const codes = CountriesDataGenerator.randomCountryCodes(5);
    const requests = codes.map((code) => createRequest(GET_COUNTRY_QUERY, { code }));

    const responses = client.batch(requests);

    let success = 0;
    responses.forEach((response, index) => {
        if (GraphQLChecks.isSuccessful(response)) {
            success++;
        } else {
            GraphQLError.log(response, `BatchCountry${index}`);
        }
    });

    sleep(1);
}