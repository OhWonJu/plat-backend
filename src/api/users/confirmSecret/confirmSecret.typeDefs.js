import { gql } from "apollo-server-core";

export default gql`
  type ConfirmSecretResult {
    ok: Boolean!
    token: String
    error: String
  }

  type Mutation {
    confirmSecret(email: String!, secret: String!): ConfirmSecretResult!
  }
`;
