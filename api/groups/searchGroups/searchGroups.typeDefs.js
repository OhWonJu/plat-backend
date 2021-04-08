import { gql } from "apollo-server-core";

export default gql`
  type Query {
    searchGroups(keyword: String!, lastId: String): [Group!]
  }
`