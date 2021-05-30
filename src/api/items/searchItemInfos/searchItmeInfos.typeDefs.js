import { gql } from "apollo-server-core";

export default gql`
  type Query {
    #searchItemInfos(keyword: String!, lastId: String): [ItemInfo!]
    searchItemInfos(keyword: String!): [ItemInfo!]
  }
`