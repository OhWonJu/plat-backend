import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteFeed(id: String!): MutationResponse!
  }
`;