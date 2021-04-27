import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeRoom(id: String!): Room 
  }
`;