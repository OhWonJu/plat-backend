import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    requestSecret(email: String): MutationResponse!
  }
`;