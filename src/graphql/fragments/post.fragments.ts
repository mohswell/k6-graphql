export const POST_FIELDS = `
  fragment PostBaseFields on Post {
    id
    title
    content
    authorId
    createdAt
    updatedAt
  }
`;

export const COMMENT_FIELDS = `
  fragment CommentBaseFields on Comment {
    id
    content
    postId
    authorId
    createdAt
  }
`;
