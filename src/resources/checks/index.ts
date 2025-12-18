import { check } from 'k6';
import { GraphQLResponse as GraphQLResponseType } from '@/src/models';
import { GraphQLResponseValidator } from '@/src/resources/validators';
import { httpStatusCodes } from '@/src/constants';

const OPERATION_NAME = 'GraphQL';

export class GraphQLChecks {
    static isSuccessful<T>(
        response: GraphQLResponseType<T>,
    ): boolean {
        return check(response, {
            [`${OPERATION_NAME}: status 200`]: () =>
                GraphQLResponseValidator.hasHttpStatus(httpStatusCodes.ok),

            [`${OPERATION_NAME}: no GraphQL errors`]: (r) =>
                !!GraphQLResponseValidator.hasNoErrors(r, r.status),

            [`${OPERATION_NAME}: has data`]: (r) =>
                GraphQLResponseValidator.hasData(r),

            [`${OPERATION_NAME}: is successful`]: (r) =>
                !!GraphQLResponseValidator.isGraphqlSuccessful(r, r.status),
        });
    }
}
