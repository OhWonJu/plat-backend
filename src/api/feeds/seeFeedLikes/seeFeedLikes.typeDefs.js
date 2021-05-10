import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeFeedLikes(id: String!): [User!]
  }
`