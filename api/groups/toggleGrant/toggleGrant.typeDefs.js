import { gql } from "apollo-server-core";

export default gql`
  type toggleGrantResult {
    ok: Boolean!
    grant: String
    error: String
  }
  type Mutation {
    toggleGrant(groupId: String!, userId: String!): toggleGrantResult!
  }
`;
