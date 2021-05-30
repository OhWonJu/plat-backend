import { gql } from "apollo-server-core";

export default gql`
  type ItemInfo {
    id: String!
    itemName: String!
    cost: Int!
    info: String
    file: String!
    typeId: String!
    createdAt: String!
    updatedAt: String!
  }
  type Kategorie {
    kategorie: String!
    types: [Type!]
    createdAt: String!
    updatedAt: String!
  }
  type Type {
    type: String!
    kategorieId: String!
    # itemInfos(lastId: String): [ItemInfo!]
    itemInfos: [ItemInfo!]
    itemInfosCount: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Item {
    id: String!
    itemInfoId: String!
    userId: String!
    count: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
