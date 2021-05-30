import { gql } from "apollo-server-core";

export default gql`
  type Query {
    #seeFeedComments(feedId: String!, lastId: Int): [Comment!]
    seeFeedComments(feedId: String!, lastId: Int): [Comment!]
  }
`;
