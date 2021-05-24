import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    moveObject(groupId: String!, objId: Int!, grid: Int!): MutationResponse!
  }
`;