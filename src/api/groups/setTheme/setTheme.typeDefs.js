import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    setTheme(groupId: String!, itemId: String!): MutationResponse!
  }
`