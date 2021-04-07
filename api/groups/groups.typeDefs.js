import { gql } from "apollo-server-core";

export default gql`
  type Group {
    id: String!
    adminIn: String!
    managerId: [String!]
    title: String!
    bio: String
    groupPhoto: String
    open: Boolean!
    code: [String!]
    hashtag: [Hashtag!]
    users: [User!]
    #feeds: [Feed!]
    createdAt: String!
    updatedAt: String!
  }
  type Hashtag {
    id: String!
    hashtag: String!
    groups: [Group!]
    createdAt: String!
    updatedAt: String!
  }
`;
