import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    likeFeed(id: String!): MutationResponse!
  }
`;
