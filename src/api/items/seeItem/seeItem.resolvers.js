import client from "../../../client";

export default {
  Query: {
    seeItem: async (_, { id }) => {
      const item = await client.item.findFirst({
        where: {
          id,
        },
        select: {
          id: true,
          count: true,
          itemInfoId: true,
        },
      });
      const itemInfo = await client.itemInfo.findUnique({
        where: {
          id: item.itemInfoId,
        },
      });
      return {
        itemId: item.id,
        count: item.count,
        itemInfo,
      };
    },
  },
};
