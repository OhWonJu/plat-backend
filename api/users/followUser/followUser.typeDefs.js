import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    followUser(userName: String!): MutationResponse!
  }
`;
