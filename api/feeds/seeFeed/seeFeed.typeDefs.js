import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeFeed(id: String!): Feed
  }
`;
