import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    buyItem(itemInfoId: String!): MutationResponse!
  }
`;
