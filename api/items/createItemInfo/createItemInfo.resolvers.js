import client from "../../../client";

export default {
  Mutation: {
    createItemInfo: async (_, { name, cost, info, file, typeId }) => {
      const existType = await client.type.findUnique({
        where: { type: typeId },
        select: { type: true },
      });
      if (!existType) {
        return {
          ok: false,
          error: "Type not exist.",
        };
      }
      const existItemInfo = await client.itemInfo.findUnique({
        where: { itemName: name },
        select: { id: true },
      });
      if (existItemInfo) {
        return {
          ok: true,
          error: "Item name is alreay used.",
        };
      }
      const newItemInfo = await client.itemInfo.create({
        data: {
          itemName: name,
          cost,
          info,
          file,
          typeId,
        },
      });
      if (newItemInfo) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: "Can't create ItemInfo.",
        };
      }
    },
  },
};
