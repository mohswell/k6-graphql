import { GraphQLClient, createGraphQLClient } from '@/src/clients/api';
import { GraphQLChecks } from '@/src/resources/checks';
import { GraphQLError } from '@/src/resources/errors';
import { ClientConfig } from '@/src/models';

let globalClient: GraphQLClient;
export const getGraphQLClient = (config?: ClientConfig): GraphQLClient => {
    if (!globalClient) {
        globalClient = createGraphQLClient({
            ...config,
        });
    }
    return globalClient;
};

// Run a single GraphQL query with global client
export const runQuery = <T>(
    request: any,
    operationName: string,
) => {
    const graphqlClient = getGraphQLClient();
    const response = graphqlClient.query<T>(request);
    const ok = GraphQLChecks.isSuccessful(response);

    if (!ok) {
        GraphQLError.log(response, operationName);
    }

    return { response, ok } as const;
};