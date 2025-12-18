import { GraphQLResponse as GraphQLResponseType } from '@/src/models';
import { httpStatusCodes } from "@/src/constants"

export class GraphQLResponseValidator {
    static hasNoErrors<T>(
        response: GraphQLResponseType<T>,
        responseStatus?: number
    ): boolean | number {
        return !response.errors?.length && responseStatus == httpStatusCodes.ok;
    }

    static isGraphqlSuccessful<T>(
        response: GraphQLResponseType<T>,
        responseStatus?: number
    ): boolean | number {
        return this.hasNoErrors(response, responseStatus) || responseStatus == httpStatusCodes.ok && this.hasData(response);
    }

    static hasData<T>(
        response: GraphQLResponseType<T>
    ): boolean {
        return response.data != null;
    }

    static hasHttpStatus(
        responseStatus?: number
    ): boolean {
        return responseStatus != null;
    }

    static isWithinTimeLimit(
        maxMs: number,
        actualMs: number
    ): boolean {
        return actualMs <= maxMs;
    }
}
