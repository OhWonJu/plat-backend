import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    createGroup(
      title: String!
      bio: String
      open: Boolean!
    ): MutationResponse!
  }
`;
