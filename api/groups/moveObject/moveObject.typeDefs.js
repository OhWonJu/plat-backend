import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    moveObject(groupId: String!, objId: Int!, xPos: Int!, yPos: Int!): MutationResponse!
  }
`;