import { gql } from "apollo-server-core";

export default gql`
  type Feed {
    id: String!
    user: User!
    group: Group!
    file: String
    title: String!
    caption: String
    createdAt: String!
    updatedAt: String!
    # disappearTime: String!
  }
`;
