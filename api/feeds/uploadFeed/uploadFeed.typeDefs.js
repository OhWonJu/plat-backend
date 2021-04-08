import { gql } from "apollo-server-core";

export default gql`
  type UploadFeedResult {
    ok: Boolean!
    error: String
    feed: Feed
  }
  type Mutation {
    # 테스트를 위해 Upload가 아닌 String으로 실행
    uploadFeed(
      file: String
      title: String!
      caption: String
      groupId: String!
    ): UploadFeedResult!
  }
`;
