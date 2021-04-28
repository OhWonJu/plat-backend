import client from "../../../client";

export default {
  Query: {
    seeItemInfo: (_, { id }) =>
      client.itemInfo.findUnique({
        where: { id },
      }),
  },
};
