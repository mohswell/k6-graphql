import { httpStatusCodes } from '@/src/constants';
import { GraphQLResponse as GraphQLResponseType } from '@/src/models';

export class GraphQLError {
    static log<T>(
        response: GraphQLResponseType<T>,
        context?: string
    ) {
        response.errors?.forEach((err, i) => {
            console.error(
                `[${context ?? 'GraphQL'}] ${i + 1}. ${err.message}`
            );
        });
    }

    static logHttpError(
        response: GraphQLResponseType<any>,
        context?: string,
        status?: number,
    ) {
        console.error(
            `[${context ?? 'HTTP'}] ${status ?? httpStatusCodes.internalServerError} ${response.errors?.[0]?.message || 'Unknown HTTP error'}`
        );
    }
}
