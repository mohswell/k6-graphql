import { GraphQLResponse } from '@/src/models';
import { getFieldValue } from '@/src/lib/utils';

export class GraphQLFieldValidator {
    static exists<T>(
        response: GraphQLResponse<T>,
        path: string
    ): boolean {
        return getFieldValue(response.data, path) != null;
    }

    static equals<T>(
        response: GraphQLResponse<T>,
        path: string,
        expected: unknown
    ): boolean {
        return getFieldValue(response.data, path) === expected;
    }

    static hasMinLength<T>(
        response: GraphQLResponse<T>,
        path: string,
        min: number
    ): boolean {
        const value = getFieldValue(response.data, path);
        return Array.isArray(value) && value.length >= min;
    }
}
