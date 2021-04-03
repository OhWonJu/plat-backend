import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: String!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    # password: String! grqphql에서는 password를 묻지 않을 것임.
    loginSecret: String
    bio: String
    profilePhoto: String
    followers: [User!]
    followings: [User!]
    point: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
