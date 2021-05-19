import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (_, { itemInfoId }, { loggedInUser }) => {
  const existItem = await client.itemInfo.findUnique({
    where: { id: itemInfoId },
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
  const userHave = await client.item.findFirst({
    where: {
      userId: loggedInUser.id,
      itemInfoId,
    },
    select: {
      id: true,
      count: true,
    },
  });
  if (userHave) {
    // const itemUpdate = await client.item.update({
    //   where: userHave.id,
    //   data: {
    //     count: userHave.count + 1,
    //   },
    // });
    const updateUser = await client.user.update({
      where: {
        id: loggedInUser.id,
      },
      data: {
        point: {
          decrement: existItem.cost,
        },
        items: {
          update: {
            where: {
              id: userHave.id,
            },
            data: {
              //count: userHave.count + 1,
              count: {
                increment: 1,
              },
            },
          },
        },
      },
    });
    if (updateUser) {
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
        itemInfoId,
        count: 1,
        user: {
          connect: {
            id: loggedInUser.id,
          },
        },
      },
    });
    await client.user.update({
      where: {
        id: loggedInUser.id,
      },
      data: {
        point: {
          decrement: existItem.cost,
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
