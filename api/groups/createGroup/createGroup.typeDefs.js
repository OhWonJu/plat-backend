import { gql } from "apollo-server-express";

export default gql`
  type CreateGroupResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    createGroup(
      title: String
      bio: String
      open: Boolean!
    ): CreateGroupResult!
  }
`;
