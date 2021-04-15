import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    enterGroup(groupId: String!, code: String): MutationResponse!
  }
`