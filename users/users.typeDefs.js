import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    # password: String! grqphql에서는 password를 묻지 않을 것임.A
    bio: String
    createdAt: String!
    updatedAt: String!
  }
`;
