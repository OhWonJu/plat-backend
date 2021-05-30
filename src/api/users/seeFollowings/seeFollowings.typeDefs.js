import { gql } from "apollo-server-core";

export default gql`
  type SeeFollowingsResult {
    ok: Boolean!
    error: String
    followings: [User!]
  }

  type Query {
    # 첫 page의 경우 cursor가 없을 수도 있으니 Not required
    #seeFollowings(userName: String!, lastId: String): SeeFollowingsResult!
    seeFollowings(userName: String!, lastId: String): SeeFollowingsResult!
  }
`;
