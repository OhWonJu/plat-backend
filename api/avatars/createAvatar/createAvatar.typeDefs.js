import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createAvatar(color: String!): MutationResponse!
  }
`