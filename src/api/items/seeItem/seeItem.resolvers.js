import client from "../../../client";

export default {
  Query: {
    seeItemInfo: async (_, { id }) => {
      const item = await client.item.findFirst({
        where: {
          id,
        },
        select: {
          id: true,
          itemInfoId: true,
        },
      });
      return client.itemInfo.findUnique({
        where: {
          id: item.itemInfoId,
        },
      });
    },
  },
};
