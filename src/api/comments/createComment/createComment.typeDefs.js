import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createComment(feedId: String!, payload: String!): MutationResponse!
  }
`;
