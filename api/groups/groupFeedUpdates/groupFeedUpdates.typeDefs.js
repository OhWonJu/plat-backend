import { gql } from "apollo-server-core";

export default gql`
  type Subscription {
    groupFeedUpdates(groupId: String!): Feed
  }
`;
