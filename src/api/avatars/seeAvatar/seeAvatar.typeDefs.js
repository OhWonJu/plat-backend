import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeAvatar(userId: String!): Avatar
  }
`;
