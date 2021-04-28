import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    buyItem(itemId: String!): MutationResponse!
  }
`;
