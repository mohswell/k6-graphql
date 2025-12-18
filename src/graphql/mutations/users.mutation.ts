import { USER_FIELDS } from "@/src/graphql/fragments";

export const CREATE_USER = {
  query: `
    ${USER_FIELDS}
    mutation CreateUser($input: CreateUserInput!) {
      createUser(input: $input) {
        ...UserBaseFields
      }
    }
  `,
  operationName: 'CreateUser'
} as const;

export const UPDATE_USER = {
  query: `
    ${USER_FIELDS}
    mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
      updateUser(id: $id, input: $input) {
        ...UserBaseFields
      }
    }
  `,
  operationName: 'UpdateUser'
} as const;

export const DELETE_USER = {
  query: `
    mutation DeleteUser($id: ID!) {
      deleteUser(id: $id) {
        success
        message
      }
    }
  `,
  operationName: 'DeleteUser'
} as const;

