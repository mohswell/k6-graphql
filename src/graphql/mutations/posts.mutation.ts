import { COMMENT_FIELDS, POST_FIELDS } from "@/src/graphql/fragments";

export const CREATE_POST = {
  query: `
    ${POST_FIELDS}
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        ...PostBaseFields
      }
    }
  `,
  operationName: 'CreatePost'
} as const;

export const UPDATE_POST = {
  query: `
    ${POST_FIELDS}
    mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
      updatePost(id: $id, input: $input) {
        ...PostBaseFields
      }
    }
  `,
  operationName: 'UpdatePost'
} as const;

export const DELETE_POST = {
  query: `
    mutation DeletePost($id: ID!) {
      deletePost(id: $id) {
        success
        message
      }
    }
  `,
  operationName: 'DeletePost'
} as const;

export const CREATE_COMMENT = {
  query: `
    ${COMMENT_FIELDS}
    mutation CreateComment($input: CreateCommentInput!) {
      createComment(input: $input) {
        ...CommentBaseFields
      }
    }
  `,
  operationName: 'CreateComment'
} as const;

// Post interactions
export const TOGGLE_LIKE = {
  query: `
    mutation ToggleLike($postId: ID!) {
      toggleLike(postId: $postId) {
        success
        likesCount
      }
    }
  `,
  operationName: 'ToggleLike'
} as const;