export interface GraphQLOperation<V = Record<string, any>> {
  query: string;
  operationName: string;
}

export const createRequest = <V = Record<string, any>>(
  operation: GraphQLOperation<V>,
  variables?: V
) => ({
  query: operation.query,
  operationName: operation.operationName,
  variables,
});

