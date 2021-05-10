import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createItemInfo(
      name: String!
      cost: Int!
      info: String
      # 테스트를 위해 String
      file: Upload
      typeId: String!
    ): MutationResponse!
  }
`;
