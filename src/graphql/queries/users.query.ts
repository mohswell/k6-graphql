import { USER_FIELDS } from "@/src/graphql/fragments";

export const GET_ALL_USERS = {
    query: `
    ${USER_FIELDS}
    query GetAllUsers($limit: Int, $offset: Int) {
      users(limit: $limit, offset: $offset) {
        ...UserBaseFields
      }
    }
  `,
    operationName: 'GetAllUsers'
} as const;

export const GET_USER_BY_ID = {
    query: `
    ${USER_FIELDS}
    query GetUserById($id: ID!) {
      user(id: $id) {
        ...UserBaseFields
        posts {
          id
          title
        }
      }
    }
  `,
    operationName: 'GetUserById'
} as const;

// Add more ...
