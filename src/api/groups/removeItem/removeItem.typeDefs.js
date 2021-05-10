import { gql } from "apollo-server-core";

export default gql`
  type Mutation{
    removeItem(groupId: String!, posId: Int!): MutationResponse!
  }
`;
