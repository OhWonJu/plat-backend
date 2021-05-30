import { gql } from "apollo-server-core";

export default gql`
  type SeeFollowersResult {
    ok: Boolean!
    error: String
    followers: [User!]
    #totalPages: Int
  }

  # type Query {
  #   seeFollowers(userName: String!, page: Int!): SeeFollowersResult!
  # }
  type Query {
    #seeFollowers(userName: String!, lastId: String): SeeFollowersResult!\
    seeFollowers(userName: String!): SeeFollowersResult!
  }
`