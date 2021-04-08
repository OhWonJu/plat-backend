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
    code: [String!]
    hashtags: [Hashtag!]
    users: [User!]
    feeds: [Feed!]
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
`;
