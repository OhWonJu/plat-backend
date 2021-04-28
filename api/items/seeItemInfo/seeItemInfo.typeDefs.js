import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeItemInfo(id: String!): ItemInfo
  }
`;
