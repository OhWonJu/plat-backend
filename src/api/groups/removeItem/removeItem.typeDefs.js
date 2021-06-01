import { gql } from "apollo-server-core";

export default gql`
  type Mutation{
    removeItem(groupId: String!, grid: Int!): MutationResponse!
  }
`;
