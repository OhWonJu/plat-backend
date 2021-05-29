import { gql } from "apollo-server-core";

export default gql`
  type seeItemResult {
    itemId: String
    count: Int!
    itmeInfo: ItemInfo
  }
  
  type Query {
    seeItem(id: String!): seeItemResult
  }
`;
