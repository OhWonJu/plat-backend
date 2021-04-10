import { gql } from "apollo-server-core";

export default gql`
  type ToggleLikeResult {
    ok: Boolean!
    liked: String
    error: String
  }

  type Mutation {
    toggleLike(id: String!): ToggleLikeResult!
  }
`;
