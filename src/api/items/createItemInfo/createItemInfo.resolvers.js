import client from "../../../client";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
  Mutation: {
    createItemInfo: async (_, { name, cost, info, file, typeId }) => {
      const existType = await client.type.findUnique({
        where: {
          type: typeId,
        },
        select: {
          type: true,
          kategorieId: true,
        },
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
      let fileUrl = null;
      if (file) {
        fileUrl = await uploadToS3(
          file,
          typeId,
          `items/${existItemInfo.kategorieId}/${typeId}`
        );
      }
      const newItemInfo = await client.itemInfo.create({
        data: {
          itemName: name,
          cost,
          info,
          ...(fileUrl && { file: fileUrl }),
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
