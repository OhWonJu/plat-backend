import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    inviteUser(groupId: String!, userName: String!): MutationResponse!
  }
`;
