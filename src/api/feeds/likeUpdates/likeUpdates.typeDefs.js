import { gql } from "apollo-server-core";

export default gql`
  type Subscription {
    likeUpdates(userId: String!): Like
  }
`;
