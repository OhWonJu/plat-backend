import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    detectFeedsLife(feedId: String!)
  }
`;
