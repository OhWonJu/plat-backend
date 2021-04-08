import { gql } from "apollo-server-core";

export default gql`
  type EditGroupResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    editGroup(
      id: String!
      title: String
      bio: String
      groupPhoto: String
      open: Boolean
    ): EditGroupResult!
  }
`;
