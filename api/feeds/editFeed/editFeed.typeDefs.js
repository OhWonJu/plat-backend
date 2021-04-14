import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editFeed(id: String!, caption: String!): MutationResponse!
  }
`;
