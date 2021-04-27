import { gql } from "apollo-server-core";

export default gql`
  type Query {
    # pagination 필요?
    seeRooms: [Room]
  }
`;
