import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (_, { itemId }, { loggedInUser }) => {
  const existItem = await client.itemInfo.findUnique({
    where: { id: itemId },
    select: { id: true, cost: true },
  });
  if (!existItem) {
    return {
      ok: false,
      error: "Item is not exist.",
    };
  }
  if (loggedInUser.point - existItem.cost < 0) {
    return {
      ok: false,
      error: "Not enough points.",
    };
  }
  const itemWhere = {
    userId_itemId: {
      userId: loggedInUser.id,
      itemId,
    },
  };
  const userHave = await client.item.findUnique({
    where: itemWhere,
    select: {
      count: true,
    },
  });
  if (userHave) {
    const itemUpdate = await client.item.update({
      where: itemWhere,
      data: {
        count: userHave.count + 1,
      },
    });
    const userUpdate = await client.user.update({
      where: { id: loggedInUser.id },
      data: {
        point: loggedInUser.point - existItem.cost,
      },
    });
    if (itemUpdate && userUpdate) {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        error: "failed.",
      };
    }
  } else {
    await client.item.create({
      data: {
        itemId,
        user: {
          connect: {
            id: loggedInUser.id,
          },
        },
      },
    });
    return {
      ok: true,
    };
  }
};

export default {
  Mutation: {
    buyItem: portectedResolver(resolver),
  },
};
