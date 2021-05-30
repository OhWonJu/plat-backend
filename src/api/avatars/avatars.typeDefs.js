import { gql } from "apollo-server-core";

export default gql`
  type Avatar {
    userId: String!
    headUrl: String
    headId: String
    bodyUrl: String
    bodyId: String
    legUrl: String
    legId: String
    headInfo: ItemInfo
    bodyInfo: ItemInfo
    legInfo: ItemInfo
    createdAt: String!
    updatedAt: String!
  }
`;
