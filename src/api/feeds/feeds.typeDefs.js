import { gql } from "apollo-server-core";

export default gql`
  type Feed {
    id: String!
    user: User!
    group: Group
    file: String
    title: String!
    caption: String
    likesCount: Int!
    commentsCount: Int!
    isMine: Boolean!
    isLiked: Boolean!
    createdAt: String!
    updatedAt: String!
    disappearTime: String!
  }
  type Like {
    id: Int!
    feed: Feed!
    createdAt: String!
    updatedAt: String!
  }
`;
