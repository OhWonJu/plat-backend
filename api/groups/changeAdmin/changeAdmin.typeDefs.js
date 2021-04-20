import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    changeAdmin(groupId: String!, userId: String!): MutationResponse!
  }
`