import { gql } from "apollo-server-core";

export default gql`
  type Subscription {
    groupObjectUpdates(groupId: String!): ObjectPosition
  }
`;
