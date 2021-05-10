import { gql } from "apollo-server-core";

export default gql`
  type Query {
    searchFeeds(keyword: String!, lastId: String): [Feed!]
  }
`