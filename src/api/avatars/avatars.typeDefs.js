import { gql } from "apollo-server-core";

export default gql`
  type Avatar {
    userId: String!
    color: String!
    skinUrl: String
    skinId: String
    headUrl: String
    headId: String
    faceUrl: String
    faceId: String
    bodyUrl: String
    bodyId: String
    skinInfo: ItemInfo
    headInfo: ItemInfo
    faceInfo: ItemInfo
    bodyInfo: ItemInfo
    createdAt: String!
    updatedAt: String!
  }
`;
