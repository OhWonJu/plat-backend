import client from "../../../client";

export default {
  Query: {
    searchItemInfos: async (_, { keyword }) => {
      if (keyword === "") {
        return;
      }
      const itemInfos = await client.itemInfo.findMany({
        where: {
          itemName: {
            contains: keyword.toLowerCase(),
          },
        },
      });
      return itemInfos;
    },
  },
};
