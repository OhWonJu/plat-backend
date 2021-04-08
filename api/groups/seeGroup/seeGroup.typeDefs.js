import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeGroup(id: String!): Group
  }
`;
