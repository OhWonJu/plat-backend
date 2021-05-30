import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editAvatar(
      headId: String
      bodyId: String
      legId: String
    ): MutationResponse!
  }
`;
