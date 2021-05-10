import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editGroup(
      id: String!
      title: String
      bio: String
      groupPhoto: Upload
      open: Boolean
    ): MutationResponse!
  }
`;
