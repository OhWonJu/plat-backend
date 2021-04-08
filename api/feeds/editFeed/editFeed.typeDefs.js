import { gql } from "apollo-server-core";

export default gql`
  type EditFeedResult {
    ok: Boolean!,
    error: String
  }

  type Mutation {
    editFeed(id: String!, caption: String!): EditFeedResult!
  }
`;
