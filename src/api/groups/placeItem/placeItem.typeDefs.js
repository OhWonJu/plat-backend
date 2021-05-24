import { gql } from "apollo-server-core";

export default gql`
  type Mutation{
    placeItem(groupId: String!, itemId: String!, gird: Int!): MutationResponse!
  }
`;
