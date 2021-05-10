import { gql } from "apollo-server-core";

export default gql`
  type Group {
    id: String!
    adminId: String!
    managerId: [String!]
    title: String!
    bio: String
    groupPhoto: String
    open: Boolean!
    codes: [Code!]
    hashtags: [Hashtag!]
    users: [User!]
    feeds: [Feed!]
    items: [Item!]
    objectPositions: [ObjectPosition!]
    createdAt: String!
    updatedAt: String!
  }
  type Hashtag {
    id: String!
    hashtag: String!
    # 페이지네이션을 위한 args를 전달할 수 있도록?
    groups(page: Int!): [Group!]
    groupsCount: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Code {
    id: Int!
    group: Group!
    userId: String!
    code: String!
    createdAt: String!
    updatedAt: String!
  }
  type ObjectPosition {
    id: Int!
    # group: Group!
    gorupId: String!
    objectId: String!
    owner: String!
    type: String!
    x: Int!
    y: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
