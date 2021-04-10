import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeGroupFeeds(groupId: String!): [Feed!]
  }
`;
