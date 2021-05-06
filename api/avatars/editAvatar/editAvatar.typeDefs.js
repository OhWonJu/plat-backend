import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editAvatar(
      color: String
      skinId: String
      headId: String
      faceId: String
      bodyId: String
    ): MutationResponse!
  }
`;
